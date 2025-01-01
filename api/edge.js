import { put } from '@vercel/blob';

// Vercel Edge Function Configuration
export const config = {
  runtime: 'edge', // Specify that this is an Edge function
}

export default async function handler(req) {
  try {
    const url = new URL(req.url);
    const shortURL = url.searchParams.get('shortURL'); // Extract 'shortURL' query parameter

    // Fetching data from Terabox API
    const getInfoUrl = `https://www.terabox.app/api/shorturlinfo?shorturl=${shortURL}&root=1`;
    const response = await fetch(getInfoUrl, {
      method: 'GET',
      referrerPolicy: 'no-referrer',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${getInfoUrl}`);
    }

    const infoData = await response.json();
    console.log(infoData);

    // Extract required values from the JSON.
    const { shareid, uk } = infoData;
    const { fs_id } = infoData.list[0];

    // Constructing URL for fetching .m3u8 file
    const m3u8Url = `https://www.terabox1024.com/share/extstreaming.m3u8?uk=${uk}&shareid=${shareid}&type=M3U8_AUTO_360&fid=${fs_id}&sign=1&timestamp=1&clienttype=1&channel=1`;

    const m3u8Response = await fetch(m3u8Url, {
      method: 'GET',
      referrerPolicy: 'no-referrer',
    });

    if (!m3u8Response.ok) {
      throw new Error(`Failed to fetch .m3u8 file from URL: ${m3u8Url}`);
    }

    const m3u8Content = await m3u8Response.text();

    // Save .m3u8 file to Vercel Blob storage (Note: You need to define the `put` function properly)
    const blobFileName = `M3U8-HTML/${shortURL}.m3u8`;

    // For the purpose of this example, we will assume the `put` function is correctly defined elsewhere.
    // Assuming `put` uploads the content to Vercel's Blob storage.
    const blob = await put(blobFileName, m3u8Content, {
      access: 'public',
      addRandomSuffix: false,
      ContentType: 'application/vnd.apple.mpegurl', // Media type for .m3u8 files
    });

    // Set cache control headers and return the blob data as response
    return new Response(JSON.stringify(blob), {
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=172800, stale-while-revalidate=172800',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
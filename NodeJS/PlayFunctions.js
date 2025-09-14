export { GetLink, CheckIfExists, DeleteLink, SaveLink, TgChannels, GetM3U8 };

async function GetLink() {
  try {
    const response = await fetch(`${UPSTASH.url}/LRANGE/TB_Links/0/-1/`, {
      headers: {
        'Authorization': `Bearer ${UPSTASH}`
      }
    });
    response.headers.set('Cache-Control', 'public, max-age=10, stale-while-revalidate=172800');
    response.headers.set('Access-Control-Allow-Origin', 'https://1nrp.github.io');
    return response;
  } catch (error) {
    console.error(error);  // Log the error for debugging
    return new Response('An error occurred while fetching from Upstash.', { status: 500 });
  }
}

async function CheckIfExists(req, res) {
  try {
    const response = await fetch(`${process.env.KV_REST_API_URL}/LPOS/TB_Links/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': `Bearer ${process.env.KV_REST_API_READ_ONLY_TOKEN}`,
      },
      body: req.body
    });
    const data = await response.json();
    res.json(data);
    console.log('LPOS Response: ', data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while checking if exists or not in Upstash.' });
  }
};

async function DeleteLink(req, res) {
  try {
    const response = await fetch(`${process.env.KV_REST_API_URL}/LREM/TB_Links/0/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`, // KV_REST_API_TOKEN}`,
      },
      body: req.body,
      method: 'POST',
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while sending to Upstash.' });
  }
}

async function SaveLink(req, res) {
  try {
    const response = await fetch(`${process.env.KV_REST_API_URL}/LPUSH/TB_Links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`,
      },
      body: req.body
    });
    console.log(typeof req.body);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while sending to Upstash.' });
  }
}

async function TgChannels(req, res) {
  try {
    const response = await fetch(`${process.env.KV_REST_API_URL}/LRANGE/TG_Channels/0/-1/`, {
      headers: {
        'Authorization': `Bearer ${process.env.KV_REST_API_READ_ONLY_TOKEN}`,
      }
    });
    const data = await response.json();
    // Setting Cache-Control header to instruct browsers to cache responses for a period of time
    res.set('Cache-Control', 'public, max-age=600, stale-while-revalidate=604800'); // Cache for 10 minutes (600 seconds). Revalidate after 1 week (6,04,800 seconds).
    res.json(data);
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while fetching from Upstash.' });
  }
};

async function GetM3U8(request, response) {
  const link = new URL('https://1nrp.vercel.app' + request.url); // Express provides only the path in Request.url.
  const shortURL = link.searchParams.get('URL');
  const Cache = link.searchParams.get("CacheOption") === "Yes"; // Convert Cache to boolean.
  const Token = link.searchParams.get("AccessToken");

  if (Token !== "t9EmqwvV1OO4AiMq1bIxv8F9I3sxx7lgONdyPfZmOBMktgAmR2pNNfHmBoVjeQIc7") {
    return new Response("Wrong Access Token Code. Request Is Unauthorized", { status: 401 });
  }
  if (!shortURL) {
    return new Response("URL parameter is required", { status: 403 });
  }

  try {

  //const surl = shortURL.slice(1);
  //const cook = await fetch('https://www.1024tera.com');
  //const cookie = cook.headers.get('Set-Cookie');

  // Not Adding The Cookie Header Only Fetches 30 Seconds Of The Video. Get it by Inspecting the Network Tab of the Terabox Webpage.
  const tbHeaders = new Headers();
  const Cookie = 'csrfToken=d4XE8GgrDLUWGi0VrMhBGhoj; browserid=MplsviPBWAXvHjkmrC50dtNbTtZ-TZoz-SwtrA2TOr1GDCXPUyQNkKiIEg0=; lang=en; TSID=TVXQQOOR4DxS9SWcPPDzjRWcwWUuHZgC; __bid_n=196b99dccf129ec2e74207; g_state={"i_l":0}; ndus=YuAqZKCteHuiYFHuyxk-Lx0nXsIscEwH1afty9gM; ndut_fmt=686106BA8EABE19FE3B1B80A4B2D9A932FEFE4938C490620A3404BE764E6DB76';
  tbHeaders.set('Cookie', Cookie);

  //tbHeaders.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0');
  //tbHeaders.append('Accept', '*/*');
  //tbHeaders.append('Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6');
  //tbHeaders.append('Accept-Encoding', 'gzip, deflate, br');
  //tbHeaders.append('Referer', 'https://www.terabox.app/sharing/link?surl=' + surl);
  //tbHeaders.append('Origin', 'https://www.terabox.app');
  //tbHeaders.append('Host', 'https://www.terabox.app');

  // Fetch short URL info.
  const apiUrl = `https://www.terabox.app/api/shorturlinfo?shorturl=${shortURL}&root=1`;
  const options = Cache ? { headers: tbHeaders, cf: { cacheTtl: 31536000, cacheEverything: true } } : { headers: tbHeaders };
  const infoResponse = await fetch(apiUrl, options);
  
  if (!infoResponse.ok) {
    throw new Error(`Failed to fetch short URL info: ${infoResponse.statusText}`);
  }

  const infoData = await infoResponse.json();
  // console.log('TB Response Data:', infoData);

  // Extract required values.
  const { shareid, uk } = infoData;
  const { fs_id } = infoData.list[0];
  // Fetch the M3U8 text.
  // const m3u8Url = `https://www.terabox.app/share/streaming?uk=${uk}&shareid=${shareid}&type=M3U8_AUTO_360&fid=${fs_id}&sign=1&timestamp=1&clienttype=1&channel=1`;
  const m3u8Url = `https://dm.1024tera.com/share/streaming?uk=${uk}&shareid=${shareid}&type=M3U8_FLV_264_480&fid=${fs_id}&sign=e079e32543e8a8e08d13776fc9e6c3fdaec67489&timestamp=1746887076&jsToken=1F1DA1DCB0EDBEBF4D4026783231FF6C9B4DB9B51B9760AA7BDD646E468831907207153BCE380C6E022CF085CFB889982CF47DC211FCCFBE69AE839F30F263E0CEBA873FED7A8A6AE0102FEF4265151A7491413528A981953B8CCE16C5FD12EE&esl=1&isplayer=1&ehps=1&clienttype=0&app_id=250528&web=1&channel=dubox&short_link=5`;

  const head = {
    'Content-Type': 'application/x-mpegURL',
    'Access-Control-Allow-Origin': 'https://1nrp.github.io',
    'Cache-Control': 'max-age=86400'
  };

  const resp = await fetch( m3u8Url , { headers: tbHeaders } );
  response.set('Content-Type', 'application/x-mpegURL').set('Access-Control-Allow-Origin', 'https://1nrp.github.io').set('Cache-Control', 'max-age=86400');
  response.send( await resp.text() );
    
  } catch (error) { 
    console.error('Error:', error);
    response.status(504).text('An error occurred.');
  }
}
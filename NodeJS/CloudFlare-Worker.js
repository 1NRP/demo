export default {
  async fetch(request) {
    const link = new URL(request.url);
    const shortURL = link.searchParams.get('URL');
    const Cache = link.searchParams.get("CacheOption") === "Yes"; // Convert Cache to boolean.
    const Token = link.searchParams.get("AccessToken");

    if (Token !== "cloudF-code-0088") {
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
    tbHeaders.append('Cookie', Cookie);

    //tbHeaders.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0');
    //tbHeaders.append('Accept', '*/*');
    //tbHeaders.append('Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6');
    //tbHeaders.append('Accept-Encoding', 'gzip, deflate, br');
    //tbHeaders.append('Referer', 'https://www.terabox.app/sharing/link?surl=' + surl);
    //tbHeaders.append('Origin', 'https://www.terabox.app');
    //tbHeaders.append('Host', 'https://www.terabox.app');

    // Fetch short URL info.
    const apiUrl = `https://www.terabox.app/api/shorturlinfo?shorturl=${shortURL}&root=1`;
    const infoResponse = await fetch(apiUrl, Cache ? { cf: { cacheTtl: 31536000, cacheEverything: true } } : {});
    
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
    const m3u8Url = `https://www.1024tera.com/share/streaming?uk=${uk}&shareid=${shareid}&type=M3U8_FLV_264_480&fid=${fs_id}&sign=e079e32543e8a8e08d13776fc9e6c3fdaec67489&timestamp=1746887076&jsToken=1F1DA1DCB0EDBEBF4D4026783231FF6C9B4DB9B51B9760AA7BDD646E468831907207153BCE380C6E022CF085CFB889982CF47DC211FCCFBE69AE839F30F263E0CEBA873FED7A8A6AE0102FEF4265151A7491413528A981953B8CCE16C5FD12EE&esl=1&isplayer=1&ehps=1&clienttype=0&app_id=250528&web=1&channel=dubox&short_link=5`;
    const req = new Request(m3u8Url, {
        method: 'GET',
        headers: tbHeaders
    });

    const resp = await fetch(req);
    const m3u8Text = await resp.text();
    // console.log('TB Response Text:', text);

    const head = new Headers();
    head.append('Content-Type', 'application/x-mpegURL');
    head.append('Access-Control-Allow-Origin', 'https://1nrp.github.io');
    head.append('Cache-Control', 'max-age=259200');
    const response = new Response(m3u8Text /* "m3u8Text" is the Response Body */ , {
      status: 200,
      headers: head
    });

    // console.log('TB Response Body:', text);
    // console.log('TB Response Headers:', response.headers);

    return response;
    } catch (error) { 
      console.error('Error:', error);
      return new Response('An error occurred.', { status: 500 });
    }
  }
}

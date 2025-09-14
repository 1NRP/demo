import { kv } from '@vercel/kv';

// Auth_Code Generation URL: https://api-t1.fyers.in/api/v3/generate-authcode?client_id=SPXXXXE7-100&redirect_uri=https://1nrp.vercel.app/fyersToken&response_type=code&state=NRP-Algo
// THe 'client_id' in the Auth_Code Generation URL is the same as the Fyers 'app_id'.
// Update the Refresh Token every 15 days by visiting the Auth_Code Generation URL.

export async function fyersToken(req, res) {
    try {
      const appHash = process.env.FYERS_APP_HASH; // The 'appID' and 'appSecret' are already Hashed and stored in environment variables.
      const { auth_code, Token } = req.query;
      
    if ( auth_code ) {
      // Save the date of creating the refresh_token to "Miscellaneous" key in "Cloud Notes".
      const timestamp = Date.now() + (15 * 24 * 60 * 60 * 1000);
      const expiryDate = new Date(timestamp).toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' }); // Date() method Automatically accounts for monthly variations of number of days.
      const kvText = `⭐ ⭐ ⭐ Fyers Refresh Token Was Last Saved to KV database at: [ ${ new Date().toLocaleString('en-GB', {timeZone: 'Asia/Kolkata'}) } ]. It Will Expire On: [ ${expiryDate} At 6:00 AM ]. Re-Generate This Token On Or Before Expiry Date By Visiting The Auth_Code Generation URL: [ https://api-t1.fyers.in/api/v3/generate-authcode?client_id=SPXXXXE7-100&redirect_uri=https://1nrp.vercel.app/fyersToken&response_type=code&state=NRP-Algo ]. The "client_id" Is Same As The Fyers "app_id" Which Can Be Found On The Fyers API Dashboard.`;
      await kv.lpush('Miscellaneous', kvText);
      // Generate and save the refresh_token.
      const response = await fetch('https://api-t1.fyers.in/api/v3/validate-authcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          appIdHash: appHash,
          code: auth_code
        })
      });
      const data = await response.json();
      console.log(data);
      const refreshToken = data.refresh_token;

      await fetch(`${process.env.KV_REST_API_URL}/SET/FYERS_REFRESH_TOKEN/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
        },
        body: refreshToken
      });
      res.json({message: 'Refresh Token saved successfully to KV.'});

    } else if ( Token === 'refresh_token' ) {
      const data = await kv.get('FYERS_REFRESH_TOKEN');
      res.json(data);

    } else if ( req.method === 'POST' && Token === 'access_token' ) {
      const data = await kv.set('FYERS_ACCESS_TOKEN', req.body);
      res.json(data);

    } else if ( req.method === 'GET' && Token === 'access_token' ) {
      const data = await kv.get('FYERS_ACCESS_TOKEN');
      res.json(data);

    } else {
      res.json({message: 'Invalid Request. No Token provided in the request parameters.'});
    }
    } catch (error) {
      console.error(error);  // Log the error for debugging.
      res.status(500).json({ error: 'An error occurred.' });
    }
}

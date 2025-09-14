import { put } from '@vercel/blob';
import { kv } from ('@vercel/kv');

export default async (_req, res) => {

  try {
      const today = new Date().toLocaleDateString('en-GB').replaceAll('/', '-');  // Format the date to YYYY-MM-DD instead of MM/DD/YYYY to avoid issues of creating a new folder with the date as the name.
      const date  = `[ Date: ${today} ]`; // Can be used to differentiate names of the saved Blob files in database, as the names will be prefixed with different dates. 
      // For Vercel KV.
      const kvText = `Saved to KV database on: ${today}. "Vercel-KV-Database-Deletion-Prevention". This text is sent to the "Miscellaneous" Key in Vercel KV database every 15 days to ensure the database does not get deleted due to inactivity, as Vercel deletes a database if not used (GET or POST) for more than 1 month. Delete this text from the "Miscellaneous" store if not wanted.This can also work as a reminder to save the "TB Links" in Telegram, at the start of every month.`;
      const saveKV = await kv.lpush('Miscellaneous', kvText);
      // For Vercel BLOB.
      const blobFileName = `Database-Deletion-Prevention/${date} Vercel-Blob-Database-Deletion-Prevention.txt`;
      const textContent = `${date} Vercel-BLOB-Database-Deletion-Prevention. This text is sent to the Vercel Blob database every 15 days to ensure the database does not get deleted due to inactivity, as Vercel deletes a database if not used (GET or POST) for more than 1 month.`;
      //const token = process.env.BLOB_READ_WRITE_TOKEN;  // Uncomment if needed.
      const saveBlob = await put(blobFileName, textContent, {
          access: 'public',
          addRandomSuffix: false,
          ContentType: 'text/plain',  
          //token: token,  // Automatically taken if using Vercel functions.
      });
      console.log("KV Response: ", saveKV);
      console.log("Blob Response: ", saveBlob);
      res.json(saveBlob);
   } catch (error) {
      console.error("An Error Occured While Executing CRON Job: ", error);
      res.status(500).json({ error: 'An error occurred while executing cron job.' });
   }
}

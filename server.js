const { put } = require('@vercel/blob');

// Replace with your Vercel Blob storage details
const blobName = 'your_blob_name.txt';
const blobToken = process.env.BLOB_READ_WRITE_TOKEN; // Access from Vercel environment variables

async function updateBlob(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const textData = await req.text();
    const { url } = await put(blobName, textData, { access: 'public' }); // Set access to 'public' for public read access
    res.json({ message: 'Blob storage updated successfully.', url });
  } catch (error) {
    console.error('Error updating blob:', error);
    res.status(500).json({ message: 'Error updating Blob storage' });
  }
}

export default updateBlob;

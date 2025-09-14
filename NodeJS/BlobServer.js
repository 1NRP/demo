export default async function (req, res) {

  if (req.method === 'POST') {  // The token generation request is a "POST" request.
    const { handleUpload } = await import('@vercel/blob/client');
    const body = req.body;
    try {
      const jsonResponse = await handleUpload({
        body,
        request: req,
        onBeforeGenerateToken: async (pathname, /* clientPayload */) => {
          return {
            allowedContentTypes: [ 'image/*', 'video/*', 'audio/*', 'text/*', 'application/*' ], // Accept all common MIME types.
            addRandomSuffix: false,
            tokenPayload: "NRP's Blob Upload Completed.",
          };
        },
        onUploadCompleted: async (blob, tokenPayload) => {
          return tokenPayload;
        },
      });
      res.json(jsonResponse);
    } catch (error) {
      console.error('Error while handling the upload:', error);
      res.status(400).json({
        error: error.message,
      });
    }

  } else {
    const TASK = req.query.TASK;
    if (TASK === 'List') {
      const { list } = await import('@vercel/blob');
      try {
        const { FOLDER_NAME } = req.query;
        const { blobs } = await list({ prefix: FOLDER_NAME });
        res.json(blobs);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred.' });
      }
    } else if (TASK === 'Delete') {
      const { del } = await import('@vercel/blob');
      try {
        const { URL } = req.query;
        await del(URL);
        res.status(200).json({ message: 'Blob deleted.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred.' });
      }
    } else if (TASK === 'Rename') {  // Vercel Blob SDK does not provide a renaming feature. So this is a workaround.
      const { copy, del } = await import('@vercel/blob');
      try {
        const { FILE_URL, NEW_PATHNAME } = req.query;
        await copy(FILE_URL, NEW_PATHNAME, { access: 'public' });
        await del(FILE_URL);
        res.status(200).json({ message: 'Blob renamed.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred.' });
      }
    } else {
      res.status(400).json({ error: 'Invalid request.' });
    }
  }
};

// Import only the `upload` function from `@vercel/blob/client`.

import { upload } from '@vercel/blob/client';

// Expose the upload function globally to be used in script tags.
window.upload = upload;
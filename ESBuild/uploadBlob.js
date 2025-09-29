// Import only the `upload` function from `@vercel/blob/client`.

import { copy, del, list, put } from 'npm:@vercel/blob'
import { handleUpload as ServerUploadHandler, upload as BrowserUploadHandler } from 'npm:@vercel/blob/client'

// Export the functions.

export const VercelBlobMethods = {
	List: list,
	Copy: copy,
	Delete: del,
	Upload: put,
	ServerUploadHandler,
	BrowserUploadHandler,
}

// Bundle the HTML files into a single file using ESBuild for compatibility with Vercel.

import Login from '../Login.html'
import Index from '../Index.html'
import Blob from '../Blob.html'
import Notes from '../Notes.html'
import VercelUpload from '../VercelUpload.njs'

export { Login, Index, Blob, Notes, VercelUpload }

/*

// Or, you can export the files individually like this:

export { default as LoginPage } from './Login.html'
export { default as IndexPage } from './Index.html'
export { default as BlobPage } from './Blob.html'
export { default as NotesPage } from './Notes.html'
export { default as VercelUpload } from './VercelUpload.js'

*/
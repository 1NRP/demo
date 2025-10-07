// Bundle the HTML files into a single file using ESBuild for compatibility with Vercel.

import Login from './Login.html'
import Index from './Index.html'
import Blob from './Blob.html'
import Notes from './Notes.html'
import Video from './Video.html'
import JS_Notebook from './JS_Notebook.html'
import VercelUpload from './VercelUpload.njs'

export { Blob, Index, JS_Notebook, Login, Notes, VercelUpload, Video }

/*

// Or, you can export the files individually like this:

export { default as LoginPage } from './Login.html'
export { default as IndexPage } from './Index.html'
export { default as BlobPage } from './Blob.html'
export { default as NotesPage } from './Notes.html'
export { default as VercelUpload } from './VercelUpload.js'

*/

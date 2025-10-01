// Vercel only bundles the static files that are in the '/public' folder.
// This folder's files are served directly without invoking functions.
// Hence checking for authentication is not possible before serving the files.
// So we need to export them from the file system to be bundled in the build.

import { Deno } from './NodeCompatibility.js';

export const Login = await Deno.readTextFile('./Login.html');
export const Index = await Deno.readTextFile('./Index.html');
export const Blob = await Deno.readTextFile('./Blob.html');
export const VercelUpload = await Deno.readTextFile('./VercelUpload.js');
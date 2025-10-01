// Vercel only bundles the static files that are in the '/public' folder.
// This folder's files are served directly without invoking functions.
// Hence checking for authentication is not possible before serving the files.
// So we need to export them from the file system to be bundled in the build.

import { Deno } from './NodeCompatibility.js';

// StaticFiles.js
import fs from "fs";

export const Login = await Deno.readTextFile(new URL("./Login.html", import.meta.url));
export const Index = await Deno.readTextFile(new URL("./Index.html", import.meta.url));
export const Blob = await Deno.readTextFile(new URL('./Blob.html'), import.meta.url);
export const VercelUpload = await Deno.readTextFile(new URL('./VercelUpload.js'), import.meta.url);
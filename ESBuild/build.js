// Run "deno run --allow-read --allow-write --allow-env --allow-run ESBuild/build.js" Or, "deno task build" in terminal to run this file and start bundling.
// deno task build

import { build, stop } from 'npm:esbuild@0.25.0'
import { denoPlugins } from 'jsr:@luca/esbuild-deno-loader@^0.11.1'

const result = await build({
	entryPoints: ['ESBuild/uploadBlob.js'], // Or, ["https://deno.land/std@0.185.0/bytes/mod.ts"]. Your entry JavaScript file/URL.
	plugins: [...denoPlugins()], // To Resolve 'HTTPS', 'npm:' or 'jsr:' specified imports.
	bundle: true, // Bundle the files.
	format: 'esm', // Output as ES Module.
	outfile: 'ESBuild/VercelBlobFunctions.js', // Output file.
	minify: false, // Minify the code.
	sourcemap: false, // Do not generate sourcemap.
})

console.log('ESBuild Result: ', result)

stop()

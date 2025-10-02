// Run "deno run --allow-read --allow-write --allow-env --allow-run ESBuild/build.js" Or, "deno task build" in terminal to run this file and start bundling.
// deno task build

import { build, stop } from 'npm:esbuild@0.25.0'
import { denoPlugins } from 'jsr:@luca/esbuild-deno-loader@^0.11.1'

const result = await build({
  entryPoints: ['ESBuild/HtmlBuild.js'], // Or, ["https://deno.land/std@0.185.0/bytes/mod.ts"]. Your entry JavaScript file/URL.
  // plugins: [...denoPlugins()], // To Resolve 'HTTPS', 'npm:' or 'jsr:' specified imports. Throws error for HTML files.
  bundle: true, // Bundle the files.
  format: 'esm', // Output as ES Module.
  outfile: '../StaticFiles.js', // Output file.
  minify: true, // Minify the code.
  sourcemap: false, // Do not generate sourcemap.
  loader: {
    '.html': 'text', // Treat HTML files as text files for bundling.
    '.css': 'text', // Treat CSS files as text files for bundling.
    '.md': 'text', // Treat Markdown files as text files for bundling.
    '.njs': 'text', // Dummy extension for static JavaScript assets ( StaticFiles.js ). Add this extension temporarily to the static javascript (e.g. VercelUpload.js) file to treat it as text for bundling.
    '.js': 'js', // Treat JavaScript files as JavaScript files for bundling.
  }
})

console.log('ESBuild Result: ', result)

stop()

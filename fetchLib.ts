import { getLibFilename } from "./src/ffi";
const filename = getLibFilename();
console.log("Downloading latest libwebview...");
const res = await fetch(`https://github.com/tr1ckydev/webview-bun/releases/latest/download/${filename}`);
await Bun.write(`${import.meta.dir}/build/${filename}`, res);
console.log("Finished.");
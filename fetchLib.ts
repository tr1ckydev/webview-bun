import { suffix } from "bun:ffi";
console.log("Downloading latest libwebview...");
const res = await fetch(`https://github.com/webview/webview_deno/releases/latest/download/libwebview${(process.platform === "linux" ? `.so` : `.${process.arch}.dylib`)}`);
await Bun.write(`${import.meta.dir}/build/libwebview.${suffix}`, res);
console.log("Finished.");
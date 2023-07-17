const filename = `libwebview${(process.platform === "linux" ? `.so` : `.${process.arch}.dylib`)}`;
console.log("Downloading latest libwebview...");
const res = await fetch(`https://github.com/tr1ckydev/webview-bun/releases/latest/download/${filename}`);
await Bun.write(`${import.meta.dir}/build/${filename}`, res);
console.log("Finished.");
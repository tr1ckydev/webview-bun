switch (process.platform) {
    case "win32": await dl("libwebview.dll"); break;
    case "linux": await dl("libwebview.so"); break;
    case "darwin": await dl(`libwebview.${process.arch}.dylib`); break;
    default: throw "unsupported platform: " + process.platform;
}

async function dl(filename: string) {
    await Bun.$`curl -sSLo "${import.meta.dir}/../build/${filename}" "https://github.com/tr1ckydev/webview-bun/releases/latest/download/${filename}"`.nothrow();
    await Bun.$`ln -s ${filename} ${import.meta.dir}/../build/libwebview.bin`.nothrow();
}

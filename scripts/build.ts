import { $ } from "bun";

switch (process.platform) {
    case "linux":
        await $`c++ webview/webview.cc -DWEBVIEW_API=extern -DWEBVIEW_GTK -shared -std=c++11 -Wall -Wextra -pedantic -fpic $(pkg-config --cflags --libs gtk+-3.0 webkit2gtk-4.0) -o build/libwebview.so`;
        await $`strip build/libwebview.so`;
        break;
    case "darwin":
        const architectures = [["x64", "x86_64"], ["arm64", "arm64"]];
        for (const [bunArch, gccArch] of architectures) {
            await $`c++ webview/webview.cc -DWEBVIEW_API=extern -DWEBVIEW_COCOA -dynamiclib -std=c++11 -Wall -Wextra -pedantic -fpic -framework WebKit -arch ${gccArch} -o ${`build/libwebview.${bunArch}.dylib`}`;
            await $`strip ${`build/libwebview.${bunArch}.dylib`}`;
        }
        break;
    default:
        throw "unsupported platform: " + process.platform;
}
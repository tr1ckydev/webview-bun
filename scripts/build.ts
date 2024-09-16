import { $ } from "bun";
$.nothrow();
const platform = `${process.platform}-${process.arch}`;
switch (platform) {
    case "win32-x64":
        await $`mkdir -p Microsoft.Web.WebView2`;
        await $`curl -sSL "https://www.nuget.org/api/v2/package/Microsoft.Web.WebView2" | tar -xf - -C Microsoft.Web.WebView2`;
        await $`./scripts/build.bat`;
        await $`rm webview.obj build/libwebview.exp build/libwebview.lib`;
        break;
    case "linux-x64":
        await $`c++ -Wall -Wextra -pedantic -Iwebview/core/include -std=c++11 -fPIC -fvisibility=hidden -fvisibility-inlines-hidden -DWEBVIEW_BUILD_SHARED -shared -ldl -Ofast $(pkg-config --cflags --libs webkitgtk-6.0 javascriptcoregtk-6.0 gtk4) webview/core/src/webview.cc -o build/libwebview.so`;
        await $`strip build/libwebview.so`;
        break;
    case "darwin-x64":
        for (const [bunArch, gccArch] of [["x64", "x86_64"], ["arm64", "arm64"]]) {
            await $`c++ webview/webview.cc -DWEBVIEW_API=extern -DWEBVIEW_COCOA -dynamiclib -std=c++11 -Wall -Wextra -pedantic -fpic -Ofast -framework WebKit -arch ${gccArch} -o ${`build/libwebview.${bunArch}.dylib`}`;
            await $`strip -x -S ${`build/libwebview.${bunArch}.dylib`}`;
        }
        break;
    default:
        throw `unsupported platform: ${platform}`;
}
import { $ } from "bun";
$.nothrow();
switch (process.platform) {
    case "win32":
        await $`mkdir -p Microsoft.Web.WebView2`;
        await $`curl -sSL "https://www.nuget.org/api/v2/package/Microsoft.Web.WebView2" | tar -xf - -C Microsoft.Web.WebView2`;
        await $`./scripts/build.bat`;
        await $`rm webview.obj`;
        break;
    case "linux":
        await $`c++ webview/webview.cc -DWEBVIEW_API=extern -DWEBVIEW_GTK -shared -std=c++11 -Wall -Wextra -pedantic -fpic $(pkg-config --cflags --libs gtk+-3.0 webkit2gtk-4.0) -o build/libwebview.so`;
        await $`strip build/libwebview.so`;
        break;
    case "darwin":
        for (const [bunArch, gccArch] of [["x64", "x86_64"], ["arm64", "arm64"]])
            await $`c++ webview/webview.cc -DWEBVIEW_API=extern -DWEBVIEW_COCOA -dynamiclib -std=c++11 -Wall -Wextra -pedantic -fpic -framework WebKit -arch ${gccArch} -o ${`build/libwebview.${bunArch}.dylib`}`;
        break;
    default:
        throw "unsupported platform: " + process.platform;
}
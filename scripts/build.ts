import { $ } from "bun";
$.nothrow();
const platform = `${process.platform}-${process.arch}`;
switch (platform) {
    case "win32-x64":
        await $`
        scripts/build.bat
        cp webview/build/core/Release/webview.dll build/libwebview.dll
        `;
        break;
    case "linux-x64":
        await $`
        cd webview
        cmake -G "Ninja Multi-Config" -B build -S . -DWEBVIEW_WEBKITGTK_API=6.0
        cmake --build build --config Release
        cp build/core/Release/libwebview.so ../build/libwebview.so
        strip ../build/libwebview.so
        `;
        break;
    case "darwin-x64":
    case "darwin-arm64":
        await $`
        cd webview
        cmake -G "Ninja Multi-Config" -B build -S . -DCMAKE_TOOLCHAIN_FILE=cmake/toolchains/universal-macos-llvm.cmake
        cmake --build build --config Release
        cp build/core/Release/libwebview.dylib ../build/libwebview.dylib
        strip -x -S ../build/libwebview.dylib
        `;
        break;
    default:
        throw `unsupported platform: ${platform}`;
}
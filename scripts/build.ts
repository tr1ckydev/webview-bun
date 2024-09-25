import { $ } from "bun";
$.nothrow();

const { arch, platform } = process;
const unsupported = () => {
  throw `unsupported platform: ${platform}-${arch}`;
};

switch (platform) {
    case "win32":
        if (arch !== "x64") unsupported();
        await $`
        scripts/build.bat
        cp webview/build/core/Release/webview.dll build/libwebview.dll
        `;
        break;
    case "linux":
        await $`
        cd webview
        cmake -G "Ninja Multi-Config" -B build -S . -DWEBVIEW_WEBKITGTK_API=6.0
        cmake --build build --config Release
        cp build/core/Release/libwebview.so ../build/libwebview-${arch}.so
        strip ../build/libwebview-${arch}.so
        `;
        break;
    case "darwin":
        await $`
        cd webview
        cmake -G "Ninja Multi-Config" -B build -S . -DCMAKE_TOOLCHAIN_FILE=cmake/toolchains/universal-macos-llvm.cmake
        cmake --build build --config Release
        cp build/core/Release/libwebview.dylib ../build/libwebview.dylib
        strip -x -S ../build/libwebview.dylib
        `;
        break;
    default:
        unsuported();
}

import { $ } from "bun";
$.nothrow();

const { arch, platform } = process;

switch (platform) {
  case "win32":
    await $`
        scripts/build.bat
        cp webview/build/core/Release/webview.dll build/libwebview.dll
        `;
    break;
  case "linux":
    await $`
        cd webview
        cmake -G Ninja -B build -S . -D CMAKE_BUILD_TYPE=Release -D WEBVIEW_WEBKITGTK_API=6.0 -D WEBVIEW_BUILD_AMALGAMATION=true -D WEBVIEW_PACKAGE_AMALGAMATION=true
        cmake --build build
        cp build/core/libwebview.so ../build/libwebview-${arch}.so
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
}

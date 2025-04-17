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
        cmake -G "Ninja Multi-Config" -B build -S . \
            -DCMAKE_TOOLCHAIN_FILE=cmake/toolchains/host-llvm.cmake \
            -DWEBVIEW_WEBKITGTK_API=6.0 \
            -DWEBVIEW_ENABLE_CHECKS=false \
            -DWEBVIEW_BUILD_AMALGAMATION=false \
            -DWEBVIEW_BUILD_EXAMPLES=false \
            -DWEBVIEW_BUILD_STATIC_LIBRARY=false \
            -DWEBVIEW_BUILD_TESTS=false
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
}

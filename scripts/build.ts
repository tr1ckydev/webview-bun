import { $ } from "bun";

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
        export PATH=/usr/lib/llvm14/bin/:/usr/lib/llvm-14/bin/:/usr/lib64/llvm15/bin/:$PATH
        cmake -G Ninja -B build -S . -D CMAKE_BUILD_TYPE=Release -D WEBVIEW_WEBKITGTK_API=6.0 -DWEBVIEW_ENABLE_CHECKS=false -DCMAKE_TOOLCHAIN_FILE=cmake/toolchains/host-llvm.cmake
        cmake --build build
        cp build/core/libwebview.so ../build/libwebview-${arch}.so
        strip ../build/libwebview-${arch}.so
        `;
    break;

  case "darwin":
    await $`
        cd webview
        cmake -G "Ninja Multi-Config" -B build -S . \
              -DCMAKE_BUILD_TYPE=Release \
              -DWEBVIEW_BUILD_TESTS=OFF \
              -DWEBVIEW_BUILD_EXAMPLES=OFF \
              -DWEBVIEW_USE_CLANG_TOOLS=OFF \
              -DWEBVIEW_ENABLE_CHECKS=OFF \
              -DWEBVIEW_USE_CLANG_TIDY=OFF \
              -DWEBVIEW_BUILD_DOCS=OFF \
              -DWEBVIEW_USE_CLANG_FORMAT=OFF \
              -DWEBVIEW_CLANG_FORMAT_EXE=${process.env.WEBVIEW_CLANG_FORMAT_EXE}
        cmake --build build --config Release
        cp build/core/Release/libwebview.dylib ../build/libwebview.${arch}.dylib
        strip -x -S ../build/libwebview.${arch}.dylib
        `
    break;
}

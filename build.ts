switch (process.platform) {
    case "linux":
        const getLibs = Bun.spawnSync([
            "pkg-config",
            "--cflags",
            "--libs",
            "gtk+-3.0",
            "webkit2gtk-4.0"
        ]);
        const libs = (await new Response(getLibs.stdout).text()).trim().split(" ");
        Bun.spawnSync([
            "c++",
            "webview/webview.cc",
            "-DWEBVIEW_GTK",
            "-shared",
            "-std=c++11",
            "-Wall",
            "-Wextra",
            "-pedantic",
            "-fpic",
            ...libs,
            "-o",
            "build/libwebview.so"
        ]);
        break;
    case "darwin":
        const architectures = [["x64", "x86_64"], ["arm64", "arm64"]];
        for (const [bunArch, gccArch] of architectures) {
            Bun.spawnSync([
                "c++",
                "webview/webview.cc",
                "-dynamiclib",
                "-fpic",
                "-DWEBVIEW_COCOA",
                "-std=c++11",
                "-Wall",
                "-Wextra",
                "-pedantic",
                "-framework",
                "WebKit",
                "-arch",
                gccArch,
                "-o",
                `build/libwebview.${bunArch}.dylib`
            ]);
        }
        break;
}
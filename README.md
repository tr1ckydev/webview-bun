# webview-bun

[bun](https://bun.sh/) bindings for [webview](https://github.com/webview/webview/)

Webview is a tiny cross-platform library to make **web-based GUIs for desktop applications**.

![](banner.png)

## Installation

<details>
  <summary>Click here for instructions on 🐧 Linux</summary>
  The compiled linux library in this package requires GTK 4 and WebkitGTK 6.

> To use a different version, see Development section below.

- Debian-based systems: `sudo apt install libgtk-4-1 libwebkitgtk-6.0-4`
- Arch-based systems: `sudo pacman -S gtk4 webkitgtk-6.0`
- Fedora-based systems: `sudo dnf install gtk4 webkitgtk6.0`

</details>

<details>
  <summary>Click here for instructions on 🪟 Windows</summary>
  The compiled windows library in this package does not bundle any webview version with itself but rather uses the system installed one.

> To bundle a specific version, see Development section below.

The <a href="https://developer.microsoft.com/en-us/microsoft-edge/webview2/">Microsoft Edge WebView2</a> runtime is required to be installed on the system for any version of Windows before Windows 11.
To manually update or install the latest version, follow the steps <a href="https://github.com/MicrosoftEdge/WebView2Feedback/issues/3371#issuecomment-1500917825">here</a>.

</details>

```bash
bun i webview-bun
```

## Example

```typescript
import { Webview } from "webview-bun";

const html = `
<html>
    <body>
        <h1>Hello from bun v${Bun.version} !</h1>
    </body>
</html>
`;

const webview = new Webview();

webview.setHTML(html);
webview.run();
```

For more examples, browse the `examples` folder of this repository.

## Single-file executable

You can compile a single self-sufficient executable file for your webview app.

For example, let's create a single executable for the above To-Do app. Clone this repository and run,

```bash
bun build --compile --minify --sourcemap ./examples/todoapp/app.ts --outfile todoapp
```

> [!TIP]
> By default, a terminal window will also open in the back when double-click opening the executable in Windows and macOS.
>
> #### 🪟 To hide it in Windows:
>
> Download and run [hidecmd.bat](https://github.com/tr1ckydev/webview-bun/blob/main/scripts/hidecmd.bat) from this repository, provide the exe path when prompted.
>
> #### 🍎 To hide it in macOS:
>
> Add the extension `.app` in the end of the above bun build command.

### Cross-platform compilation

Bun now supports cross-compilation of single executable binaries. To cross compile your webview app for a different platform run,

```bash
bun build --compile --target=bun-windows-x64 --minify --sourcemap ./examples/todoapp/app.ts --outfile todoapp
```

See [full list](https://github.com/oven-sh/bun/blob/main/docs/bundler/executables.md#supported-targets) of supported targets.

### Bun.serve with webview

If you run a web server it will block the main thread, but using workers you can run the webview window on another thread. Clone this repository then,

```bash
cd examples/webserver/
bun build --compile --minify --sourcemap ./index.ts ./worker.ts --outfile webserver
```

### Extras

🪟 On windows, to add an icon to your exe file, checkout [rcedit](https://github.com/electron/rcedit).

🍎 On macOS, to codesign your executable checkout the [bun docs](https://bun.sh/docs/bundler/executables#code-signing-on-macos).

## Documentation

Refer to the comments in the source code for full documentation.

## Development

Please use `bun pretty` to automatically format all files.

### Prerequisites

#### 🪟 On **Windows,** you need C++ Build Tools:

- Go to https://visualstudio.microsoft.com/downloads.
- Scroll down > _All Downloads_ > _Tools for Visual Studio_.
- Download _Build Tools for Visual Studio 2022_ and run.
- Select _Desktop development with C++_ and install.

#### 🐧 On linux, you need following deps:

- Debian-based: `sudo apt install libgtk-4-dev libwebkitgtk-6.0-dev cmake ninja-build clang`
- Fedora-based: `sudo dnf install gtk4-devel webkitgtk6.0-devel cmake ninja-build clang`
- Arch-based: `sudo pacman -S cmake ninja clang`

#### 🍎 On macOS, you need following deps:

```bash
brew install cmake ninja clang
```

### Building

- Clone the repository along with the [webview](https://github.com/webview/webview) submodule.

  ```bash
  git clone --recurse-submodules https://github.com/tr1ckydev/webview-bun
  cd webview-bun
  ```
- Build the library for your platform.

  > Under the hood, it invokes webview's own cmake build system to compile the shared library file.
  >

  ```bash
  bun run build
  ```
- (Optional) Clear build cache and rebuild the library.

  ```bash
  bun clean
  bun run build
  ```

The compiled library file can be found inside the `build` folder.

#### Building for arm64 from x86_64

To create an arm64 shared library from a x86_64 host, checkout [setupARM64.sh](https://github.com/tr1ckydev/webview-bun/blob/main/setupARM64.sh). DO NOT execute the file (the .sh extension has been kept for syntax highlighting), rather read the comments and copy and paste the commands line by line.

### Customization

- 🐧 For linux, if you want to use a different WebkitGTK version, change the cmake `WEBVIEW_WEBKITGTK_API` option in _build.ts_ to one of the [available values](https://github.com/webview/webview?tab=readme-ov-file#linux-specific-options). Be sure to first install the corresponding version libraries.
- 🪟 For windows, if you want to bundle a specific webview version instead of using the system installed one, set the cmake `WEBVIEW_MSWEBVIEW2_VERSION` option to one of the [NuGet version strings](https://www.nuget.org/packages/Microsoft.Web.WebView2/#versions-body-tab).

Check out the [webview build docs](https://github.com/webview/webview?tab=readme-ov-file#customization) for more options.

### Running

> [!TIP]
> To use your own webview library, set the `WEBVIEW_PATH` environment variable with the path to your webview shared library file.

Run the following example to see it in action.

```bash
bun run examples/basic.ts
```

For more examples, browse the `examples` folder of this repository.

## Credits

This repository is a port of [webview_deno](https://github.com/webview/webview_deno) with various changes to work with the bun runtime.

## License

This repository uses MIT license. See [LICENSE](https://github.com/tr1ckydev/webview-bun/blob/main/LICENSE) for full license text.

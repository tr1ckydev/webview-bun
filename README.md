# webview-bun

[bun](https://bun.sh/) bindings for [webview](https://github.com/webview/webview/)

Webview is a tiny cross-platform library to make **web-based GUIs for desktop applications**.

![](banner.png)

## Installation

> Platforms supported:
>
> - `windows-x64`
> - `linux-x64`
> - `macos-x64`
> - `macos-arm64`

<details>
  <summary>Click here for instructions on linux</summary>
  Install the <a href="https://webkitgtk.org/">webkit</a> dependency.

  ### Debian-based systems:
  * Development: `apt install libgtk-3-dev libwebkit2gtk-4.0-dev`
  * Production: `apt install libgtk-3-0 libwebkit2gtk-4.0-37`

  ### Fedora-based systems:
  * Development: `dnf install gtk3-devel webkit2gtk4.0-devel`
  * Production: `dnf install gtk3 webkit2gtk4.0`

  ### Arch-based systems:
  `yay -S webkit2gtk`
</details>

<details>
  <summary>Click here for instructions on windows</summary>
  Must have the <a href="https://developer.microsoft.com/en-us/microsoft-edge/webview2/">WebView2 runtime</a> installed on the system for any version of Windows before Windows 11.
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

For example, let's create a single executable for the above Todo App. Clone this repository and run,

```bash
bun build --compile --minify --sourcemap ./examples/todoapp/app.ts --outfile todoapp
```
> [!TIP]  
> By default, a terminal window will also open in the back when double-click opening the executable in Windows and macOS.
>
> #### To hide it in Windows:
> Download [hidecmd.bat](https://github.com/tr1ckydev/webview-bun/blob/main/scripts/hidecmd.bat) from this repository and save in the same folder as the binary. Open the terminal there and execute,
> ```bash
> .\hidecmd.bat todoapp.exe
> ```
>
> #### To hide it in macOS:
> Add the extension `.app` in the end of the above bun build command.


### Cross-platform compilation

Bun now supports cross-compilation of single executable binaries. To cross compile your webview app for a different platform run,

```bash
bun build --compile --target=bun-windows-x64 --minify --sourcemap ./examples/todoapp/app.ts --outfile todoapp
```

Supported targets are: `bun-linux-x64`, `bun-windows-x64`, `bun-darwin-x64`, `bun-darwin-arm64`.



## Documentation

Refer to the comments in the source code for full documentation.



## Development

> [!IMPORTANT]  
> If you are on **Windows,** you need C++ Build Tools.
>
> - Go to https://visualstudio.microsoft.com/downloads.
> - Scroll down > *All Downloads* > *Tools for Visual Studio*.
> - Download *Build Tools for Visual Studio 2022* and run.
> - Select *Desktop development with C++* and install.

### Building

- Clone the repository along with the [webview](https://github.com/webview/webview) submodule.

  ```bash
  git clone --recurse-submodules --remote-submodules https://github.com/tr1ckydev/webview-bun.git
  cd webview-bun
  bun i
  ```

- Build the library for your platform.
  
  ```bash
  bun run build
  ```

The compiled library file(s) can be found inside the build folder.

### Running

> [!TIP]
> To use your own webview library, set the `WEBVIEW_PATH` environment variable with the path to your webview shared library file.

Run the following example to see it in action.

```bash
bun run examples/basic.ts
```

For more examples, browse the `examples` folder of this repository.



## Important note for Windows users

The `libwebview.dll` is sometimes detected as a potential malware by the Windows Defender which is a **false positive** and is **safe** to restore.

If this concerns you, feel free to compile the library yourself from source using the instructions provided above.



## Credits

This repository is a port of [webview_deno](https://github.com/webview/webview_deno) with various changes to work with the bun runtime and new windows build script to compile the latest webview.



## License

This repository uses MIT license. See [LICENSE](https://github.com/tr1ckydev/webview-bun/blob/main/LICENSE) for full license text.

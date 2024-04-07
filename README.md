# webview-bun

[bun](https://bun.sh/) bindings for [webview](https://github.com/webview/webview/)

Webview is a tiny cross-platform library to make **web-based GUIs for desktop applications**.

![](banner.png)



## Installation

> Platforms supported: `win64`, `linux`, `macos-x64`, `macos-arm64`

- Install [webkit2gtk](https://webkitgtk.org/) dependency for linux.

  Ubuntu: `sudo apt-get install libwebkit2gtk-4.0-dev`

  Arch Linux: `yay -S webkit2gtk`

- Install `webview-bun` with trust flag to run postinstall to automatically fetch pre-built library from latest release.

  ```bash
  bun i --trust webview-bun
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



## Documentation

Refer to the comments in the source code for full documentation.



## Development

### Building

- Clone the repository along with the [webview](https://github.com/webview/webview) submodule.

  ```bash
  git clone --recurse-submodules --remote-submodules https://github.com/tr1ckydev/webview-bun.git
  cd webview-bun
  bun i
  ```

- Build the library for your platform.

  > [!IMPORTANT]  
  > If you are on **Windows,** you need to have `c++` compiler in your PATH. If not already, follow the steps [here](https://code.visualstudio.com/docs/cpp/config-mingw#_installing-the-mingww64-toolchain) to install.
  
  ```bash
  bun run build
  ```
  

### Running

> [!TIP]
> To use your own webview library, set the `WEBVIEW_PATH` environment variable with the path to your webview shared library file.

Run the following example to see it in action.

```bash
bun run examples/basic.ts
```

For more examples, browse the `examples` folder of this repository.



## Credits

This repository is a port of [webview_deno](https://github.com/webview/webview_deno) with various changes to work with the bun runtime and new windows build script to compile the latest webview.



## License

This repository uses MIT license. See [LICENSE](https://github.com/tr1ckydev/webview-bun/blob/main/LICENSE) for full license text.

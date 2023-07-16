# webview-bun

[bun](https://bun.sh/) bindings for [webview](https://github.com/webview/webview/)

Webview is a tiny cross-platform library to make **web-based GUIs for desktop applications**.



## Installation

> Platforms supported: `linux`, `macos-x64`, `macos-arm64`

- Install [webkit2gtk](https://webkitgtk.org/) dependency for linux.

  Ubuntu: `sudo apt-get install libwebkit2gtk-4.0-dev`

  Arch Linux: `yay -S webkit2gtk`

- Install `webview-bun` and the latest compiled webview library from the releases of this repository.

  ```bash
  bun i webview-bun && bun node_modules/webview-bun/fetchLib.ts
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

- Clone the repository along with the webview submodule.

  ```bash
  git clone --recurse-submodules --remote-submodules https://github.com/tr1ckydev/webview-bun.git
  ```

- Build the library for your platform

  ```bash
  bun run build
  ```
  
  or, fetch the latest compiled library from the releases of this repository.
  
  ```bash
  bun run postinstall
  ```

### Running

> To use your own built webview library, set the `WEBVIEW_PATH` environment variable with the path to your webview shared library file.

Run the following example to see it in action.

```bash
bun run examples/basic.ts
```



## License

This repository uses MIT license. See [LICENSE](https://github.com/tr1ckydev/webview-bun/blob/main/LICENSE) for full license text.

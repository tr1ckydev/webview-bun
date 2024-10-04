import { SizeHint, Webview } from "../src";

const html = `
<html>
    <body>
        <h1>Hello from bun v${Bun.version} !</h1>
    </body>
</html>
`;

const webview = new Webview(false, { hint: SizeHint.FULLSCREEN });
// webview.decorated = false;
// webview.fullscreen();
webview.title = "Bun App";
webview.setHTML(html);
webview.run();

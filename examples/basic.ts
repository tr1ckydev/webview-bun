import { Webview } from "../src";

const html = `
<html>
    <body>
        <h1>Hello from bun v${Bun.version} !</h1>
    </body>
</html>
`;

const webview = new Webview();
webview.title = "Bun App";
webview.setHTML(html);
webview.run();
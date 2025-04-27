import { Webview } from "../../src";

const worker = new Worker(Bun.resolveSync("./worker.ts", import.meta.dir));

const webview = new Webview();
webview.navigate("http://localhost:3000/");
webview.run();

worker.addEventListener("close", () => webview.destroy());

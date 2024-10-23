import { Webview } from "../../src";

const webview = new Webview();
webview.navigate("http://localhost:3000/");
webview.run();

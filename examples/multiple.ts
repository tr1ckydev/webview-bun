import { Webview } from "../src";

const webview1 = new Webview();
webview1.title = "Bun";
webview1.navigate("https://bun.sh/");

const webview2 = new Webview();
webview2.title = "Wikipedia";
webview2.navigate("https://www.wikipedia.org/");

webview1.run();
webview2.run();

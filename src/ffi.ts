import { dlopen, FFIType, ptr } from "bun:ffi";
import { Webview } from "./webview";

export function encodeCString(value: string) {
    return ptr(new TextEncoder().encode(value + "\0"));
}

export const instances: Webview[] = [];

/**
 * Unload the library and destroy all webview instances. Should only be run
 * once all windows are closed.
 */
export function unload() {
    for (const instance of instances) instance.destroy();
    lib.close();
}

const lib_file = (await getLibFile()).default;

/**
 * It determines the appropriate lib file for the given platform and environment.
 *
 * A `string` file location is the technically requirement, however to
 * trigger bun to bundle the lib files as external resources, `import` is
 * called here, which also returns the `default` string property for the path.
 *
 * If `process.env.WEBVIEW_PATH` is preferred, listing the default lib (absolute)
 * file paths in `Bun.build({ external: []}` will exclude them. Be sure to
 * manually include your custom lib file in your distribution bundle.
 */
function getLibFile(): Promise<{ default: string }> {
	if (!!process.env.WEBVIEW_PATH) {
		return Promise.resolve().then(() => ({
			default: process.env.WEBVIEW_PATH!,
		}));
	}

	const { platform, arch } = process;

	if (platform === "win32") {
		//@ts-expect-error
		return import("../build/libwebview.dll");
	}
	if (platform === "linux" && arch === "x64") {
		//@ts-expect-error
		return import("../build/libwebview.so");
	}
	if (platform === "darwin" && (arch === "x64" || arch === "arm64")) {
		switch (arch) {
			case "x64":
				//@ts-expect-error
				return import("../build/libwebview.x64.dylib");
			case "arm64":
				//@ts-expect-error
				return import("../build/libwebview.arm64.dylib");
		}
	}
	throw `unsupported platform: ${process.platform}-${process.arch}`;
}

export const lib = dlopen(lib_file, {
    webview_create: {
        args: [FFIType.i32, FFIType.ptr],
        returns: FFIType.ptr
    },
    webview_destroy: {
        args: [FFIType.ptr],
        returns: FFIType.void
    },
    webview_run: {
        args: [FFIType.ptr],
        returns: FFIType.void
    },
    webview_terminate: {
        args: [FFIType.ptr],
        returns: FFIType.void
    },
    webview_get_window: {
        args: [FFIType.ptr],
        returns: FFIType.ptr
    },
    webview_set_title: {
        args: [FFIType.ptr, FFIType.ptr],
        returns: FFIType.void
    },
    webview_set_size: {
        args: [FFIType.ptr, FFIType.i32, FFIType.i32, FFIType.i32],
        returns: FFIType.void
    },
    webview_navigate: {
        args: [FFIType.ptr, FFIType.ptr],
        returns: FFIType.void
    },
    webview_set_html: {
        args: [FFIType.ptr, FFIType.ptr],
        returns: FFIType.void
    },
    webview_init: {
        args: [FFIType.ptr, FFIType.ptr],
        returns: FFIType.void
    },
    webview_eval: {
        args: [FFIType.ptr, FFIType.ptr],
        returns: FFIType.void
    },
    webview_bind: {
        args: [FFIType.ptr, FFIType.ptr, FFIType.function, FFIType.ptr],
        returns: FFIType.void
    },
    webview_unbind: {
        args: [FFIType.ptr, FFIType.ptr],
        returns: FFIType.void
    },
    webview_return: {
        args: [FFIType.ptr, FFIType.ptr, FFIType.i32, FFIType.ptr],
        returns: FFIType.void
    }
});


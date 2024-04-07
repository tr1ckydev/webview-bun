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

let lib_path = `${import.meta.dir}/../build/`;

switch (process.platform) {
    case "win32": lib_path += "libwebview.dll"; break;
    case "linux": lib_path += "libwebview.so"; break;
    case "darwin": lib_path += `libwebview.${process.arch}.dylib`; break;
    default: throw "unsupported platform: " + process.platform;
}

export const lib = dlopen(process.env.WEBVIEW_PATH ?? lib_path, {
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
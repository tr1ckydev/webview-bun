import { dlopen, FFIType, ptr } from "bun:ffi";
import { Webview } from "./webview";

export function getLibFilename() {
    return `libwebview${(process.platform === "linux" ? `.so` : `.${process.arch}.dylib`)}`;
}

/**
 * Encodes a string to a null terminated string.
 *
 * @param value The input string
 * @returns A `Pointer` to the null terminated `Uint8Array` of the input string
 */
export function encodeCString(value: string) {
    return ptr(new TextEncoder().encode(value + "\0"));
}

/**
 * All active webview instances. This is internally used for automatically
 * destroying all instances once {@link unload} is called.
 */
export const instances: Webview[] = [];

/**
 * Unload the library and destroy all webview instances. Should only be run
 * once all windows are closed. If `preload` was called in the main thread,
 * this will automatically be called during the `window.onunload` event;
 * otherwise, you may have to call this manually.
 */
export function unload() {
    for (const instance of instances) {
        instance.destroy();
    }
    lib.close();
}

export const lib = dlopen(process.env.WEBVIEW_PATH ?? `${import.meta.dir}/../build/${getLibFilename()}`, {
    webview_create: {
        args: [FFIType.i32, FFIType.pointer],
        returns: FFIType.pointer
    },
    webview_destroy: {
        args: [FFIType.pointer],
        returns: FFIType.void
    },
    webview_run: {
        args: [FFIType.pointer],
        returns: FFIType.void
    },
    webview_terminate: {
        args: [FFIType.pointer],
        returns: FFIType.void
    },
    // webview_dispatch: {
    //     args: [FFIType.pointer, FFIType.function, FFIType.pointer],
    //     returns: FFIType.void
    // },
    webview_get_window: {
        args: [FFIType.pointer],
        returns: FFIType.pointer
    },
    webview_set_title: {
        args: [FFIType.pointer, FFIType.pointer],
        returns: FFIType.void
    },
    webview_set_size: {
        args: [FFIType.pointer, FFIType.i32, FFIType.i32, FFIType.i32],
        returns: FFIType.void
    },
    webview_navigate: {
        args: [FFIType.pointer, FFIType.pointer],
        returns: FFIType.void
    },
    webview_set_html: {
        args: [FFIType.pointer, FFIType.pointer],
        returns: FFIType.void
    },
    webview_init: {
        args: [FFIType.pointer, FFIType.pointer],
        returns: FFIType.void
    },
    webview_eval: {
        args: [FFIType.pointer, FFIType.pointer],
        returns: FFIType.void
    },
    webview_bind: {
        args: [FFIType.pointer, FFIType.pointer, FFIType.function, FFIType.pointer],
        returns: FFIType.void
    },
    webview_unbind: {
        args: [FFIType.pointer, FFIType.pointer],
        returns: FFIType.void
    },
    webview_return: {
        args: [FFIType.pointer, FFIType.pointer, FFIType.i32, FFIType.pointer],
        returns: FFIType.void
    }
});
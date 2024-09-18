const server = Bun.serve({
    fetch() {
        return Response.json({ success: true });
    }
});

const worker = new Worker("./worker.ts");
worker.addEventListener("close", () => server.stop(true));
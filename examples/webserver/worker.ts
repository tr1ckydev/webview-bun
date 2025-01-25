const server = Bun.serve({
    fetch() {
      return Response.json({ success: true });
    },
});
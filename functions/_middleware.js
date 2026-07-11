export function onRequest() {
  return new Response(
    `<!DOCTYPE html>
<html>
<head><title>404 Not Found</title></head>
<body>
<center><h1>404 Not Found</h1></center>
<hr><center>cloudflare</center>
</body>
</html>`,
    {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8" },
    }
  );
}

import { createServer, Server, IncomingMessage,  ServerResponse } from "http";

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
  // console.log("Request: ", req)
  // console.log("Response: ", res)
  const url = req.url;
  const method = req.method;

  if(url === "/" && method === "GET"){
    // console.log("This is root route.")

    // res.writeHead(200, {"Content-Type": "text/plain"});
    // res.end("This is root route.");

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message: "This is root route."}));

  }else if(url?.startsWith("/products")){
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message: "This is products route."}));
  } else{
    // console.log("Route is not defined.")

    // res.writeHead(404, {"Content-Type": "text/plain"});
    // res.end("Route is not defined.");

    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message: "Route is not defined."}));
  }

})

server.listen(5000, () => {
  console.log("Server is running on the port 5000")
})
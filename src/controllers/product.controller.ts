import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../services/product.service";


const productController = (req: IncomingMessage, res: ServerResponse) => {
  

  const url = req.url;
  const method = req.method;

  if(url === "/products" && method === "GET"){
      productService();
      res.writeHead(200, {"Content-Type": "application/json"});
       res.end(JSON.stringify({message: "Products retrieved successfully."}));
  }

}

export default productController;
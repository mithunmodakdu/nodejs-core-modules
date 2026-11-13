import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../services/product.service";
import type { IProduct } from "../types/product.types";

const productController = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  const urlParams = url?.split("/");
  const id = urlParams &&  urlParams[1] === "products" ? Number(urlParams[2]) : null;
  // console.log(urlParams)
  // console.log(id)

  if (url === "/products" && method === "GET") {
    const products = productService();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products retrieved successfully.",
        data: products,
      }),
    );
  }else if(method === "GET" && id !== null){
    const products = productService();
    const product = products.find((p: IProduct) => p.id === id)
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product retrieved successfully.",
        data: product,
      }),
    );
  }
};

export default productController;

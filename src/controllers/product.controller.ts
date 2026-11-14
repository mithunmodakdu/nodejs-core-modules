import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../services/product.service";
import type { IProduct } from "../types/product.types";
import { bodyParser } from "../utils/bodyParser";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  const urlParams = url?.split("/");
  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;
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
  } else if (method === "GET" && id !== null) {
    const products = productService();
    const product = products.find((p: IProduct) => p.id === id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found",
        }),
      );
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product retrieved successfully.",
          data: product,
        }),
      );
    }
  } else if (method === "POST" && url === "/products") {
    const body = await bodyParser(req);
    const newProduct = {
      id: Date.now(),
      ...body,
    };

    const products = productService();
    products.push(newProduct);
    createProduct(products);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product created successfully.",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const products: IProduct[] = productService();
    const body = await bodyParser(req);
    const index = products.findIndex((p: IProduct) => p.id === id);

    if (index < 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found",
        }),
      );
    }

    products[index] = {
      id: products[index]?.id,
      ...body,
    };

    createProduct(products);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product updated successfully.",
        data: products[index],
      }),
    );
  } else if (method === "DELETE" && id !== null) {
    const products = productService();
    const index = products.findIndex((p: IProduct) => p.id === id);

    if (index < 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found",
        }),
      );
    }

    // const arr = ["a", "b", "c"]
    // console.log(arr.splice(2, 1))
    // console.log(arr)

    products.splice(index, 1);
    createProduct(products);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product deleted successfully.",
      }),
    );
  }
};

export default productController;

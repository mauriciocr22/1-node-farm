const fs = require("fs");
const http = require("http");
const url = require("url");

///////////////////////
// Files

// Synchronous way

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File has been written!");

// Asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR! 💀");

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written 😊");
//       });
//     });
//   });
// });
// console.log("Will read file!");

///////////////////////
// SERVER

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((request, response) => {
  const { query, pathname } = url.parse(request.url, true);

  if (pathname === "/" || pathname === "/overview") {
    response.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObject
      .map((element) => replaceTemplate(tempCard, element))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    response.end(output);
    return;
  } else if (pathname === "/product") {
    response.writeHead(200, { "Content-type": "text/html" });
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProduct, product);
    response.end(output);
    return;
  } else if (pathname === "/api") {
    response.writeHead(200, { "Content-type": "application/json" });
    response.end(data);

    return;
  } else {
    response.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    response.end("<h1>Page not found!</h1>");

    return;
  }
});

server.listen(8000, "localhost", () => {
  console.log("Server is running on port 8000");
});

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

const server = http.createServer((request, response) => {
  console.log(request.url);
  const pathName = request.url;

  if (pathName === "/" || pathName === "/overview") {
    response.end("This is the OVERVIEW");
    return;
  } else if (pathName === "/product") {
    response.end("This is the PRODUCT");
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

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const mockData = require("./data/index");

// file-server mock
const { jumpSuccessResFormat } = require("./data/_utils");
const path = require("path");
const app = express();

const uploadDir = path.join(__dirname, "uploads");

const upload = multer({ dest: uploadDir });
app.use("/uploads", express.static(uploadDir));
// app.use(express.static(path.join(__dirname, "uploads")));

// create application/x-www.form-urlencoded parse
const urlEncodeParser = bodyParser.urlencoded({ extended: false });

// create application/json parser
// const jsonParser = bodyParser.json();

const generateMockApi = (method, url, mock) => {
  app[method](url, urlEncodeParser, (req, res) => {
    if (typeof mock === "function") {
      mock(req, res);
    } else {
      res.send(mock);
    }
  });
};

for (const [k, v] of Object.entries(mockData)) {
  const reg = /[\w|/]+/g;
  const keys = k.match(reg);
  let method = "get";
  let url = "";
  if (keys.length === 1) {
    // default get
    url = keys[0];
  } else if (keys.length === 2) {
    method = keys[0];
    url = keys[1];
  } else {
    throw new Error(`${k}配置异常`);
  }

  method = method.toLocaleLowerCase();
  generateMockApi(method, url, v);
}

// file-server
app.post("/api/file/uploads", upload.array("fileList"), function (req, res) {
  const file = req.files[0];
  const { filename, originalname } = file;
  const item = {
    uid: uuidv4(),
    fileCode: file,
    name: originalname,
    status: "done",
    url: `/uploads/${filename}`,
  };
  res.json(jumpSuccessResFormat(item));
});
app.post("/api/file/upload", upload.single("file"), function (req, res) {
  res.json(jumpSuccessResFormat({ status: "ok" }));
  // next();
});

// PROXY
app.use("/api", createProxyMiddleware({ target: "http://localhost:4001/", changeOrigin: true }));

app.listen(9001, "localhost", function (err) {
  err && console.log(err);
});

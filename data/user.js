const { jumpSuccessResFormat, jumpFailResFormat, ERROR_CODES } = require("./_utils");

let users = [
  {
    userCode: "gxz1",
    userName: "阿甘1",
    pwd: "gxz1",
    role: ["user"],
  },
  {
    userCode: "admin",
    userName: "阿甘2",
    pwd: "admin",
    role: ["admin"],
  },
  {
    userCode: "guest",
    userName: "阿甘2",
    pwd: "guest",
    role: ["guest"],
  },
];
module.exports = {
  "POST /api/user/insert": (req, res) => {
    const { REQ_MESSAGE } = req.body;
    const data = JSON.parse(REQ_MESSAGE);
    const { REQ_BODY } = data;
    const index = users.findIndex(({ userCode }) => userCode === REQ_BODY.userCode);
    console.log(REQ_BODY, index);
    if (index >= 0) {
      res.json(jumpFailResFormat(REQ_BODY, ERROR_CODES.FOMSUC0001, "其他信息"));
      return;
    }
    users.push(REQ_BODY);
    res.json(jumpSuccessResFormat(REQ_BODY));
  },
  "POST /api/user/update": (req, res) => {
    const { REQ_MESSAGE } = req.body;
    const data = JSON.parse(REQ_MESSAGE);
    const { REQ_BODY } = data;
    res.json(jumpSuccessResFormat(REQ_BODY));
  },
  "GET /api/user/deleteById": jumpSuccessResFormat({
    userCode: "gxz1",
    userName: "阿甘1",
  }),
  "GET /api/user/queryAll": (req, res) => {
    res.json(jumpSuccessResFormat(users));
  },
  "GET /api/user": jumpSuccessResFormat({
    userCode: "gxz",
    userName: "阿甘",
    role: "admin",
  }),
  "POST /api/user": jumpSuccessResFormat({
    userCode: "gxz1",
    userName: "阿甘1",
    role: "admin",
  }),
  "POST /api/user/login": (req, res) => {
    const { REQ_MESSAGE } = req.body;
    const data = JSON.parse(REQ_MESSAGE);
    const { REQ_BODY } = data;
    const { userCode, pwd } = REQ_BODY;
    const user = users.findIndex((item) => item.userCode === userCode && item.pwd === pwd);
    if (user) {
      res.send(jumpSuccessResFormat(user));
    } else {
      res.send(jumpFailResFormat({}, ERROR_CODES.FOMSUC0002, "用户密码错误!"));
    }
  },
  "GET /api/xxxx": (req, res) => {
    res.send(jumpSuccessResFormat({ userCode: "gxzxxxxxxxxxxxx" }));
  },
};

const { jumpSuccessResFormat, getReqBody } = require("./_utils");
const { v4: uuidv4 } = require("uuid");

let demos = [];
module.exports = {
  "POST /api/user/demo/insertDemo": (req, res) => {
    const reqBody = getReqBody(req);
    const demoId = uuidv4();
    demos.push({ ...reqBody, demoId });
    res.json(jumpSuccessResFormat(reqBody));
  },
  "POST /api/user/demo/deleteDemoById": (req, res) => {
    const reqBody = getReqBody(req);
    const { demoId } = reqBody;
    const newDemos = demos.filter((demo) => demo.demoId !== demoId);
    demos = newDemos;
    res.json(jumpSuccessResFormat(demos));
  },
  "POST /api/user/demo/queryDemoAll": (req, res) => {
    res.json(jumpSuccessResFormat(demos));
  },
};

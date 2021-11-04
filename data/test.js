const { jumpSuccessResFormat, getReqBody } = require("./_utils");
const { v4: uuidv4 } = require("uuid");

/**
 * 1. 输入框、输入域
 2. 下拉框
 3. 日期选择
 4. 日期区间    no
 5. 数字
 6. 级联选择    no
 7. Switch
 8. Radio
 9. Checkbox
 10. upload   no
 */

/**
 * select 00-item0；01-item1；02-item2
 * swtich: 00-否；01-是
 * raido 00-radio00; 01-radio01
 * checkbox 00-ck00; 01-ck01;02-ck03
 */
// upload 必须要有uid字段
const defaultFileList = [
  {
    uid: "x1",
    fileCode: "f1",
    name: "xxx.png",
    status: "done",
    url: "http://www.baidu.com/xxx.png",
  },
  {
    uid: "x2",
    fileCode: "f22",
    name: "yyy.png",
    status: "done",
    url: "http://www.baidu.com/yyy.png",
  },
];

let tests = [
  {
    testId: "xxxxxx-id",
    txt: "输入框",
    area: "输入域",
    select: "00",
    date: "2021-01-01",
    num: 1,
    swtich: "01",
    radio: "00",
    checkbox: ["00", "01"],
    upload: "",
    attachments: defaultFileList,
  },
];
module.exports = {
  "POST /api/user/test/insertTest": (req, res) => {
    const reqBody = getReqBody(req);
    const testId = uuidv4();
    tests.push({ ...reqBody, testId });
    res.json(jumpSuccessResFormat(reqBody));
  },
  "POST /api/user/test/deleteTestById": (req, res) => {
    const reqBody = getReqBody(req);
    const { testId } = reqBody;
    const newTests = tests.filter((test) => test.testId !== testId);
    tests = newTests;
    res.json(jumpSuccessResFormat(tests));
  },
  "POST /api/user/test/queryTestAll": (req, res) => {
    res.json(jumpSuccessResFormat(tests));
  },
  "POST /api/user/test/queryTestByTestId": (req, res) => {
    const reqBody = getReqBody(req);
    const { testId } = reqBody;
    const item = tests.find((item) => item.testId === testId);
    res.json(jumpSuccessResFormat(item));
  },
  "POST /api/user/test/updateTestByTestId": (req, res) => {
    const reqBody = getReqBody(req);
    const { testId } = reqBody;
    const newTests = [];
    tests.forEach((item) => {
      if (item.testId === testId) {
        newTests.push(reqBody);
      } else {
        newTests.push(item);
      }
    });
    tests = newTests; // 重置
    res.json(jumpSuccessResFormat(newTests));
  },
};

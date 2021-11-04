const user = require("./user");
const demo = require("./demo");
const test = require("./test");
const { jumpSuccessResFormat, delay, ERROR_CODES_DESC } = require("./_utils");

module.exports = {
  ...user,
  ...demo,
  ...test,
  "GET /api/delay": delay((req, res) => {
    res.send(jumpSuccessResFormat({ delay: "3000" }));
  }, 3000),
  "GET /api/querySystemParams": (req, res) => {
    res.json(
      jumpSuccessResFormat({
        errorCodesDesc: ERROR_CODES_DESC,
      })
    );
  },
  "POST /api/menus": (req, res) => {
    res.json(
      jumpSuccessResFormat({
        menus: [
          { id: "business", label: "业务中心", pId: "-1", order: 1, url: "/business" },
          { id: "task", label: "任务中心", pId: "-1", order: 2, url: "/task" },
          { id: "message", label: "消息中心", pId: "-1", order: 3, url: "/message" },
          { id: "product", label: "产品中心", pId: "-1", order: 4, url: "/product" },
          { id: "project", label: "项目中心", pId: "-1", order: 5, url: "/project" },
          { id: "finance", label: "财务中心", pId: "-1", order: 6, url: "/finance" },
          { id: "hr", label: "人事中心", pId: "-1", order: 7, url: "/hr" },
          // Business Center
          { id: "busi1", label: "首页", pId: "business", url: "/business/main" },
          { id: "busi2", label: "示例", pId: "business" },
          { id: "busi3", label: "计算器", pId: "busi2", url: "/business/example/counter" },
          { id: "busi4", label: "Demo", pId: "busi2", url: "/business/example/demo" },
          { id: "busi5", label: "FormDemo", pId: "busi2", url: "/business/example/form-demo" },
          { id: "busi6", label: "Test", pId: "busi2", url: "/business/example/test" },
          // Task Center
          { id: "task1", label: "首页", pId: "task", url: "/task/main" },
          // Message Center
          { id: "message1", label: "首页", pId: "message", url: "/message/main" },
          // Finance Center
          { id: "finance1", label: "首页", pId: "finance", url: "/finance/main" },
          // HR Center
          { id: "hr1", label: "首页", pId: "hr", url: "/hr/main" },
          // Product Center
          { id: "product1", label: "首页", pId: "product", url: "/product/main" },
          // Task Center
          { id: "project1", label: "首页", pId: "project", url: "/project/main" },
          // User Center
          { id: "user1", label: "首页", pId: "user", url: "/user/main" },
        ],
      })
    );
  },
};

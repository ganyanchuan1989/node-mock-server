const ERROR_CODES = {
  FOMSUC0001: "FOMSUC0001", // 用户新增失败
  FOMSUC0002: "FOMSUC0002", // 登录失败
};

const ERROR_CODES_DESC = {
  [ERROR_CODES.FOMSUC0001]: "用户新增失败",
  [ERROR_CODES.FOMSUC0002]: "登录失败",
};

module.exports = {
  ERROR_CODES,
  ERROR_CODES_DESC,
  jumpSuccessResFormat: (data) => {
    return {
      RSP_HEAD: {
        TRAN_SUCCESS: "1",
      },
      RSP_BODY: data,
    };
  },
  jumpFailResFormat: (data, errorCode, errorMessage) => {
    return {
      RSP_HEAD: {
        TRAN_SUCCESS: "0",
        ERROR_CODE: errorCode,
        ERROR_MESSAGE: errorMessage,
      },
      RSP_BODY: data,
    };
  },
  delay: (mock, timeout = 3000) => {
    return (req, res) => {
      const sId = setTimeout(() => {
        if (typeof mock === "function") {
          console.log(">>>>>delay", mock);
          mock(req, res);
        } else {
          res.send(mock);
        }
        clearTimeout(sId);
      }, timeout);
    };
  },
  getReqBody: (req) => {
    const { REQ_MESSAGE } = req.body;
    const data = JSON.parse(REQ_MESSAGE);
    const { REQ_BODY } = data;
    return REQ_BODY;
  },
};

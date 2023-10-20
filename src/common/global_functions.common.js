function resSuccess(code, data) {
  return (res = {
    status: "success",
    code: code,
    data: data,
    message: "Request was successful.",
  });
}

function resFailure(code, errMsg) {
  return (res = {
    status: "error",
    code: code,
    error: {
      message: errMsg,
    },
  });
}

module.exports = { resSuccess, resFailure };

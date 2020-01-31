module.exports = {
    sendResponse: (res, statusCode, message) => {
      let response = {};
      response.message = message;
      response.code = statusCode;
      res.status(statusCode).send(response);
    }
  };
    
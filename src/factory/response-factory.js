exports.ResponseFactory = class ResponseFactory {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
  
  createResponseObj() {
    return {
      status: this.status,
      message: this.message,
      data: this.data
    };
  }
  
};
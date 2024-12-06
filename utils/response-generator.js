export const ResponseGenerator = ({
  data, isSuccess, message = "Success", code = 200
}, res) => {
  if (!isSuccess) {
    code = code && code != 200 ? code : 402;
    if (!message) {
      message = "Internal Server Error"
    }
  }
  return res.status(code).json({
    data,
    message,
    code,
    error: isSuccess
  });
}
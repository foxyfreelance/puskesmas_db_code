export const ResponseGenerator = ({
  data, isSuccess, message = "Success", code = 200
}, res) => {
  if (!isSuccess) {
    code = code && code != 200 ? code : 402;
    if (!message) {
      message = "Internal Server Error"
    }
  }
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Expires', '0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Surrogate-Control', 'no-store');

  return res.status(code).json({
    data,
    message,
    code,
    error: isSuccess
  });
}
import { ResponseGenerator } from "./response-generator";

export const createHeader = (req, res, method = "POST") => {
  // Set the CORS headers for all requests
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Headers', '*'); // Allow all headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin (use specific origin for better security)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // Allow necessary methods


  // If method is not allowed, return 405
  if (req.method !== method) {
    res.setHeader('Allow', method); // Specify allowed method
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return {
      isValid: false,
      res,
      message: ResponseGenerator({ data: null, isSuccess: false, message: `Method ${req.method} Not Allowed`, code: 405 }, res)
    };
  }

  return {
    isValid: true,
    res
  };
};

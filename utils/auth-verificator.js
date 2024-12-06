import { sign, verify } from "jsonwebtoken";
import { ResponseGenerator } from "./response-generator";

const privateKey = "itssomeprivatekey123!@#$okey?"

export const AuthVerificator = async (req, res) => {
  const { token } = req.query;
  const decoded = await verify(token, privateKey);
  const succesStatus = decoded ? true : false

  const result = {
    isValid: succesStatus,
    data: decoded,
    message: null
  }
  if (!succesStatus) {
    result.message = ResponseGenerator({ data: null, isSuccess: succesStatus, message: "You have No Access", code: 401 }, res)
  }
  return result
}

export const GenerateAuthToken = async (objectTarget) => {
  const token = await sign(objectTarget, privateKey);
  return token
}
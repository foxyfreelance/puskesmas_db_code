import { createHeader } from "@/utils/header-set";
import { GenerateAuthToken } from "@/utils/auth-verificator";
import { AuthBody } from "../schema";
import { GetStorage } from "@/utils/get-storage";
import { ResponseGenerator } from "@/utils/response-generator";
import { Accounts } from "../utils";

export default async function handler(req, res) {
  try {
    const header = createHeader(req, res, "POST")
    if (!header.isValid) {
      return header.message
    }
    res = header.res;

    const body = AuthBody(req);

    const construction = await GetStorage();
    const data = await Accounts.GetData(construction, { email: body.email, isUsePassword: true });
    console.log(data);

    if (!data) {
      return ResponseGenerator({ data: null, isSuccess: false, message: "Email Belum Terdaftar" }, res)
    }

    // if (data?.password !== body.password) {
    //   return ResponseGenerator({ data: null, isSuccess: false, message: "Email dan Password tidak terdaftar" }, res)
    // }

    delete data.password
    const token = await GenerateAuthToken({ ...data })
    return ResponseGenerator({ data: { ...data, token: token }, isSuccess: true }, res)

  } catch (error) {
    // Log and send error response
    console.error('Error while handling the request:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
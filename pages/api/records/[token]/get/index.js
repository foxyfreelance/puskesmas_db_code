import { createHeader } from "@/utils/header-set";
import { AuthVerificator } from "@/utils/auth-verificator";
import { GetStorage } from "@/utils/get-storage";
import { MODEL_KEY_NAME, GetParams } from "../../schema";
import { Records } from "../../utils";
import { ResponseGenerator } from "@/utils/response-generator";

export default async function handler(req, res) {
  try {
    const header = createHeader(req, res, "GET")
    if (!header.isValid) {
      return header.message
    }
    res = header.res;
    const accessToken = await AuthVerificator(req, res)
    if (!accessToken.isValid) return accessToken.message

    const params = GetParams(req);

    const construction = await GetStorage();
    let data = await Records.GetData(construction, params);

    if (!data) {
      return ResponseGenerator({ data: data, isSuccess: false, message: `Data Tidak Ditemukan` }, res);
    }
    data = await Records.GenerateScheduleWithUser(data, construction)

    return ResponseGenerator({ data: data, isSuccess: true, message: `Get ${MODEL_KEY_NAME} success` }, res);
  } catch (error) {
    // Log and send error response
    console.error('Error while handling the request:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

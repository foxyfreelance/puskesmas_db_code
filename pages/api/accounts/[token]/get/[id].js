import { createHeader } from "@/utils/header-set";
import { MODEL_KEY_NAME, AccountsParams } from "../../schema";
import { AuthVerificator } from "@/utils/auth-verificator";
import { GetStorage } from "@/utils/get-storage";
import { ResponseGenerator } from "@/utils/response-generator";
import { Accounts } from "../../utils";

export default async function handler(req, res) {
  try {
    const header = createHeader(req, res, "GET")
    if (!header.isValid) {
      return header.message
    }
    res = header.res;
    const accessToken = await AuthVerificator(req, res)
    if (!accessToken.isValid) {
      return accessToken.message
    }

    const params = AccountsParams(req);

    const construction = await GetStorage();
    const data = await Accounts.GetData(construction, { id: params.id });

    if (!data) {
      return ResponseGenerator({ data: null, isSuccess: false, message: "Data tidak ditemukan" }, res);
    }
    return ResponseGenerator({ data: data, isSuccess: true, message: `Get ${MODEL_KEY_NAME} success` }, res);
  } catch (error) {
    // Log and send error response
    console.error('Error while handling the request:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

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
    if (!accessToken.isValid) return accessToken.message

    const params = AccountsParams(req);

    const construction = await GetStorage();
    const data = await Accounts.GetData(construction, params);
    if (!data) {
      return ResponseGenerator({ data: null, isSuccess: false, message: `Data Tidak ditemukan` }, res);
    }
    let result = await Accounts.GetDataUnionRecords(construction, data);
    result = result.sort((a, b) => new Date(b.Records?.[0]?.dateJoin || b.dateCreate) - new Date(a.Records?.[0]?.dateJoin || a.dateCreate))
    return ResponseGenerator({ data: result, isSuccess: true, message: `Get ${MODEL_KEY_NAME} success` }, res);
  } catch (error) {
    // Log and send error response
    console.error('Error while handling the request:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

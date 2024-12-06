import { createHeader } from "@/utils/header-set";
import { AuthVerificator } from "@/utils/auth-verificator";
import { GetStorage } from "@/utils/get-storage";
import { ResponseGenerator } from "@/utils/response-generator";
import { MODEL_KEY_NAME, GetBody } from "../../schema";
import { Accounts } from "@/pages/api/accounts/utils";

export default async function handler(req, res) {
  try {
    const header = createHeader(req, res, "POST")
    if (!header.isValid) {
      return header.message
    }
    res = header.res;
    const accessToken = await AuthVerificator(req, res)
    if (!accessToken.isValid) return accessToken.message

    const body = GetBody(req);

    const construction = await GetStorage();

    //experimental
    // await construction.setJSON(MODEL_KEY_NAME, []);
    //end experimental

    let objectData = await construction.get(MODEL_KEY_NAME)
    if (objectData) {
      objectData = JSON.parse(objectData)
    }
    let data = objectData || [];
    data.push(JSON.parse(JSON.stringify(body)));
    await construction.setJSON(MODEL_KEY_NAME, data);
    const userData = await Accounts.GetData(construction, { id: body.userId })
    const resultData = await Accounts.GetDataUnionRecords(construction, [userData]);

    return ResponseGenerator({ data: resultData, isSuccess: true, message: `Create ${MODEL_KEY_NAME} success` }, res);
  } catch (error) {
    // Log and send error response
    console.error('Error while handling the request:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
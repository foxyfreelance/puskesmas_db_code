import { createHeader } from "@/utils/header-set";
import { MODEL_KEY_NAME, GetBody, GetParams } from "../../schema";
import { AuthVerificator } from "@/utils/auth-verificator";
import { ResponseGenerator } from "@/utils/response-generator";
import { GetStorage } from "@/utils/get-storage";
import { Accounts } from "@/pages/api/accounts/utils";

export default async function handler(req, res) {
  // Allow only POST requests
  try {
    const header = createHeader(req, res, "POST")
    if (!header.isValid) return header.message
    res = header.res;
    const accessToken = await AuthVerificator(req, res)
    if (!accessToken.isValid) return accessToken.message

    const params = GetParams(req);

    const construction = await GetStorage();
    let objectData = await construction.get(MODEL_KEY_NAME)
    if (objectData) {
      objectData = JSON.parse(objectData)
    }
    let data = objectData || [];

    let result = {}
    for (let i = 0; i < data.length; i++) {
      const itemData = data[i];
      if (itemData.id == params.id) {
        const body = GetBody(req, itemData);
        data[i] = body;
        result = body
        break;
      }
    }

    await construction.setJSON(MODEL_KEY_NAME, data);
    const userData = await Accounts.GetData(construction, { id: result.userId })
    const resultData = await Accounts.GetDataUnionRecords(construction, [userData]);

    return ResponseGenerator({ data: resultData, isSuccess: true }, res)

  } catch (error) {
    // Log and send error response
    console.error('Error while handling the request:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
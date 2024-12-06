import { createHeader } from "@/utils/header-set";
import { AuthVerificator } from "@/utils/auth-verificator";
import { GetStorage } from "@/utils/get-storage";
import { ResponseGenerator } from "@/utils/response-generator";
import { MODEL_KEY_NAME, GetParams } from "../../schema";
import { Accounts } from "@/pages/api/accounts/utils";

export default async function handler(req, res) {
  // Allow only POST requests
  try {
    const header = createHeader(req, res, "DELETE")
    if (!header.isValid) {
      return header.message
    }
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
    let tempData = null

    for (let i = 0; i < data.length; i++) {
      const itemData = data[i];
      if (itemData.id == params.id) {
        tempData = JSON.parse(JSON.stringify(itemData))
        data.splice(i, 1)
        break;
      }
    }

    await construction.setJSON(MODEL_KEY_NAME, data);
    const userData = await Accounts.GetData(construction, { id: tempData?.userId })
    const resultData = await Accounts.GetDataUnionRecords(construction, [userData]);

    return ResponseGenerator({ data: resultData, isSuccess: true, message: `Delete ${MODEL_KEY_NAME} success` }, res);

  } catch (error) {
    // Log and send error response
    console.error('Error while handling the request:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
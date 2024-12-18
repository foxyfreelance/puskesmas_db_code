import { createHeader } from "@/utils/header-set";
import { MODEL_KEY_NAME, GetBody, AccountsParams } from "../../schema";
import { AuthVerificator } from "@/utils/auth-verificator";
import { GetStorage } from "@/utils/get-storage";
import { ResponseGenerator } from "@/utils/response-generator";
import { Accounts } from "../../utils";

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
    const params = AccountsParams(req);

    const construction = await GetStorage();
    const dataAll = await Accounts.GetData(construction, {});

    for (let i = 0; i < dataAll.length; i++) {
      const itemData = dataAll[i];
      if (itemData.id == params.id) {
        dataAll.splice(i, 1)
        break;
      }
    }

    await construction.setJSON(MODEL_KEY_NAME, dataAll);

    return ResponseGenerator({ data: null, isSuccess: true, message: `Delete ${MODEL_KEY_NAME} success` }, res);

  } catch (error) {
    // Log and send error response
    console.error('Error while handling the request:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
import { createHeader } from "@/utils/header-set";
import { MODEL_KEY_NAME, GetBody } from "../../schema";
import { GetStorage } from "@/utils/get-storage";
import { ResponseGenerator } from "@/utils/response-generator";
import { Accounts } from "../../utils";
import { GetBody as GetBodyRecords } from "../../../records/schema";
import { Records } from "@/pages/api/records/utils";
import { AuthVerificator } from "@/utils/auth-verificator";

export default async function handler(req, res) {
  try {
    const header = await createHeader(req, res, "POST")
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
    const dataCheck = await Accounts.GetData(construction, { email: body.email });
    const dataAll = await Accounts.GetData(construction, { isUsePassword: true });

    if (!dataCheck) {
      dataAll.push(JSON.parse(JSON.stringify(body)))
      await construction.setJSON(MODEL_KEY_NAME, dataAll);
    } else {
      return ResponseGenerator({ data: null, isSuccess: false, message: "Email sudah digunakan" }, res);
    }
    const bodyAccount = GetBodyRecords(req);

    if (bodyAccount.dateJoin) {
      await Records.CreateData(construction, { ...bodyAccount, userId: body.id })
    }
    return ResponseGenerator({ data: null, isSuccess: true, message: `Create ${MODEL_KEY_NAME} success` }, res);
  } catch (error) {
    // Log and send error response
    console.error('Error while handling the request:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
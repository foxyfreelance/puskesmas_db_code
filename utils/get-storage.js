import { getStore } from "@netlify/blobs"
import { ENV_FILE } from "./constant"

export const GetStorage = async () => {
  return await getStore({
    name: ENV_FILE.dbName,
    // token: ENV_FILE.token,
    // siteID: ENV_FILE.siteID,
  })
}
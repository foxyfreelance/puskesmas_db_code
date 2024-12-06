import { uuidv4 } from "@/utils/uuidv4";

export const GetBody = (req, bodyCompare = {}) => {
  const body = req.body || {}
  return {
    records: body.records || bodyCompare.records || { pkOne: false, pkTwo: false, pkThree: false, pkFour: false, pkFive: false },
    dateJoin: body.dateJoin || bodyCompare.dateJoin || new Date().toISOString(),
    dateCreate: new Date().toISOString(),
    userId: body.userId || bodyCompare.userId || uuidv4(),
    id: bodyCompare.id || uuidv4(),
  }
}

export const GetParams = (req) => {
  const params = req.query
  return {
    page: params.page,
    query: params.query,
    role: params.role,
    id: params.id
  }
}

export const MODEL_KEY_NAME = "records"

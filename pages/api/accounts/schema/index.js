import { uuidv4 } from "@/utils/uuidv4";

export const GetBody = (req, bodyCompare = {}) => {
  const body = req.body;
  return {
    email: body.email || bodyCompare.email,
    name: body.name || bodyCompare.name,
    password: body.password || bodyCompare.password || new Date().getTime() + "_users",
    phone: body.phone || bodyCompare.phone,
    role: body.role || bodyCompare.role || "user" || "admin" || "bidan",
    address: body.address || bodyCompare.address || "kesesi",
    dateCreate: new Date().toISOString(),
    id: bodyCompare.id || uuidv4(),
  }
}

export const AuthBody = (req) => {
  const body = req.body;
  return {
    email: body.email || "test@loombi.com",
    password: body.password,
  }
}


export const AccountsParams = (req) => {
  const params = req.query
  return {
    page: params.page,
    query: params.query,
    id: params.id,
    role: params.role
  }
}

export const MODEL_KEY_NAME = "accounts"

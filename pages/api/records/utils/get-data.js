import JsonQuery from "json-query";
import { Pagination } from "@/utils/paginations";
import { GetBody, MODEL_KEY_NAME } from "../schema";

export const GetData = async (construction, params) => {
  try {
    let objectData = await construction.get(MODEL_KEY_NAME)

    if (objectData) {
      objectData = JSON.parse(objectData)
    }
    let data = objectData || [];
    data = await SearchData(data, params);

    return data

  } catch (error) {
    return null
  }
}

export const CreateData = async (construction, params) => {
  try {
    let objectData = await construction.get(MODEL_KEY_NAME)

    if (objectData) {
      objectData = JSON.parse(objectData)
    }
    let data = objectData || [];

    const body = params;
    data.push(JSON.parse(JSON.stringify(body)));
    await construction.setJSON(MODEL_KEY_NAME, data);
    return data

  } catch (error) {
    return null
  }
}

export const SearchData = async (data, params) => {
  try {

    let querySql = `${MODEL_KEY_NAME}[**]`
    if (params.query) {
      querySql = `${MODEL_KEY_NAME}[*dateJoin~/${params.query}/i]`
    }
    if (params.id) {
      querySql = `${MODEL_KEY_NAME}[id=${params.id}]`
    }

    if (params.userId) {
      querySql = `${MODEL_KEY_NAME}[*userId~/${params.userId}/i]`
    }

    const query = await JsonQuery((querySql), {
      data: {
        [MODEL_KEY_NAME]: data
      },
      allowRegexp: true,
    })

    let results = [];
    if (query.value) {
      if (Array.isArray(query.value)) {
        const sortedData = query.value.sort((a, b) => new Date(b.dateJoin) - new Date(a.dateJoin))
        results = sortedData
        if (!params.skipPagination) {
          results = Pagination(sortedData, params.page);
        }
      } else {
        results = query.value
      }
    }
    return results

  } catch (error) {
    return null
  }
}

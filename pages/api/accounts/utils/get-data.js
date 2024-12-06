import JsonQuery from "json-query";
import { Pagination } from "@/utils/paginations";
import { MODEL_KEY_NAME } from "../schema";

export const GetData = async (construction, params) => {
  try {
    let objectData = await construction.get(MODEL_KEY_NAME)

    if (objectData) {
      objectData = JSON.parse(objectData)
    }
    let data = objectData || [];
    data = await SearchData(data, params)
    return data

  } catch (error) {
    return null
  }
}


const filteringByMultipleParams = (data, params) => {
  if (params.length > 0) {
    return data.filter((dataItem) => {
      let isValid = true
      params.forEach((item) => {
        const reg = new RegExp(item.reg, "gi")
        const testing = (dataItem[item.key]).match(reg);
        if (!testing) {
          isValid = false;
        }
      });
      return isValid
    })
  }
  return data
}

export const SearchData = async (data, params) => {
  try {
    const arrQuery = [];

    if (params.query) {
      arrQuery.push({
        key: 'name',
        reg: `${params.query}`
      })
    }
    if (params.role) {
      arrQuery.push({
        key: 'role',
        reg: `${params.role}`
      })
    }
    let querySql = `${MODEL_KEY_NAME}[*]`
    if (params.email) {
      querySql = `${MODEL_KEY_NAME}[email=${params.email}]`
    }
    if (params.id) {
      querySql = `${MODEL_KEY_NAME}[id=${params.id}]`
    }

    const query = await JsonQuery((querySql), {
      data: {
        [MODEL_KEY_NAME]: data
      },
      allowRegexp: true,
    })

    let results = null;
    if (query.value) {
      if (Array.isArray(query.value)) {
        const unsortedData = await filteringByMultipleParams(query.value, arrQuery)
        const sortedData = await unsortedData.sort((a, b) => new Date(b.dateCreate) - new Date(a.dateCreate))
        if (!params.skipPagination) {
          results = Pagination(sortedData, params.page);
        }
        results = results.map((itemRes) => {
          if (!params.isUsePassword) {
            delete itemRes.password
          }
          return itemRes
        })
      } else {
        if (!params.isUsePassword) {
          delete query.value.password
        }
        results = query.value
      }
    }
    return results

  } catch (error) {

    return null
  }
}


import { Records } from "../../records/utils";

const getRemainingText = (joinDate, today) => {
  // Convert the dates to timestamps
  const time1 = new Date(joinDate).getTime();
  const time2 = new Date(today).getTime();

  // Calculate the absolute difference in milliseconds
  const resGap = time1 - time2
  const diffInMs = Math.abs(resGap > 0 ? resGap : 0);

  // Convert milliseconds to days
  const gapInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); // Round up to ensure full days

  // return gapInDays;
  if (gapInDays < 2 && gapInDays > 0) {
    return ({
      class: 'warning',
      text: `kurang dari ${gapInDays} hari`
    })
  }
  if (gapInDays > 1) {
    return ({
      class: 'active',
      text: `${gapInDays} hari lagi`
    })
  }
  return ({
    class: 'expired',
    text: `selesai`
  })
}

const generateRecordsDate = (date) => {
  const result = [];
  const schedules = [1, 3, 8, 28]
  for (let i = 0; i < schedules.length; i++) {
    const joinDate = new Date(date);
    const day = schedules[i] * 24;
    const today = new Date();
    joinDate.setHours(day)
    result.push({
      date: new Date(joinDate).toISOString(),
      today: today,
      isLate: joinDate - today < 0 ? true : false,
      remaining: getRemainingText(joinDate, today)
    })
  }

  return result
}

const getExpired = (date) => {
  const joinDate = new Date(date);
  const day = 28 * 24;
  const today = new Date();
  joinDate.setHours(day)
  return joinDate - today < 0 ? true : false
}

const getRecords = (data) => {
  return data.map((dataItem) => ({
    ...dataItem,
    isExpired: getExpired(dataItem.dateJoin),
    schedules: generateRecordsDate(dataItem.dateJoin),
  }))
}

export const GetDataUnionRecords = async (construction, data) => {
  const RecordsData = await Records.GetData(construction, { skipPagination: true })
  const result = await Promise.all(
    data.map(async (dataItem) => {

      const RecordsItem = await Records.SearchData(RecordsData, { userId: dataItem.id })
      return {
        ...dataItem,
        Records: getRecords(RecordsItem),
      };
    })
  );

  return result;
};

import { Accounts } from "../../accounts/utils";

export const GenerateSchedule = async (data) => {
  const result = await Promise.all(
    data.map(async (dataItem) => {
      return {
        ...dataItem
      };
    })
  );

  return result;
};

export const GenerateScheduleWithUser = async (data, construction) => {
  const users = await Accounts.GetData(construction, { skipPagination: true });
  const result = await Promise.all(
    data.map(async (dataItem) => {
      const user = await Accounts.SearchData(users, { id: dataItem.userId })
      return {
        ...dataItem,
        user,
      };
    })
  );

  return result;
};

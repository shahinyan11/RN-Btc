import {formatTimeDistance} from '@utils';

interface GroupedItem {
  title: string;
  data: any[];
}

type Params = {
  list: Record<string, any>[];
  keyOfDate: string;
};

const groupByDate = ({list, keyOfDate}: Params) => {
  const groupedData: GroupedItem[] = [];

  list?.forEach(item => {
    const title = formatTimeDistance(new Date(item[keyOfDate] * 1000));
    if (groupedData.length) {
      const existItemIndex = groupedData.findIndex(el => el.title === title);

      if (existItemIndex >= 0) {
        groupedData[existItemIndex] = {
          title,
          data: groupedData[existItemIndex].data.concat(item),
        };
      } else {
        groupedData.push({title, data: [item]});
      }
    } else {
      groupedData.push({title, data: [item]});
    }
  });

  return groupedData;
};

export default groupByDate;

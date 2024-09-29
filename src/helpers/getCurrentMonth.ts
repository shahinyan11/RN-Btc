import moment from 'moment/moment';
import i18next from 'i18next';

const getCurrentMonth = () => {
  const numOfMonth = moment().month() + 1;

  return i18next.t(`content.month_${numOfMonth}`);
};

export default getCurrentMonth;

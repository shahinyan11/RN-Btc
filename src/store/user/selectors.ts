import {IStore} from '@store/types';
import {createSelector} from 'reselect';
import {IUserStore} from './types';

import {formatTimeDistance} from '@utils';
import groupByDate from '../../helpers/grupByDate';

interface IGrouped {
  title: string;
  data: any[];
}

const getUserStore = (state: IStore): IUserStore => state.user;

export const selectContacts = createSelector(
  [getUserStore],
  userState => userState.contacts,
);

export const selectGroupedContacts = createSelector(
  [getUserStore],
  userState => {
    const contacts = userState.contacts;

    const gContacts = [] as IGrouped[];
    contacts.forEach(c => {
      const title = c.name ? c.name[0].toUpperCase() : 'U';

      if (gContacts.length) {
        const existItemIndex = gContacts.findIndex(el => el.title === title);

        if (existItemIndex >= 0) {
          gContacts[existItemIndex] = {
            title,
            data: gContacts[existItemIndex].data.concat(c),
          };
        } else {
          gContacts.push({title, data: [c]});
        }
      } else {
        gContacts.push({title, data: [c]});
      }
    });

    const gSContacts = gContacts.sort((a, b) => a.title.localeCompare(b.title));
    gSContacts.forEach(gSC => {
      gSC.data = gSC.data.sort((a, b) =>
        a.name ? a.name.localeCompare(b.name) : 0,
      );
    });

    return gSContacts;
  },
);

export const selectHistory = createSelector(
  [getUserStore],
  userState => userState.history.data,
);

export const selectGroupedHistory = createSelector([selectHistory], history => {
  return groupByDate({
    list: history,
    keyOfDate: 'utc_timestamp',
  });
});

export const selectNotifications = createSelector(
  [getUserStore],
  userState => userState.notifications.data,
);

export const selectGroupedNotifications = createSelector(
  [selectNotifications],
  notifications => {
    const gNotifications = [] as IGrouped[];

    notifications.forEach(n => {
      const title = formatTimeDistance(new Date(n.utc_timestamp * 1000));
      if (gNotifications.length) {
        const existItemIndex = gNotifications.findIndex(
          el => el.title === title,
        );

        if (existItemIndex >= 0) {
          gNotifications[existItemIndex] = {
            title,
            data: gNotifications[existItemIndex].data.concat(n),
          };
        } else {
          gNotifications.push({title, data: [n]});
        }
      } else {
        gNotifications.push({title, data: [n]});
      }
    });

    return gNotifications;
  },
);

export const selectDashboard = createSelector(
  [getUserStore],
  userState => userState.dashboard,
);

export const selectLastNotification = createSelector(
  [getUserStore],
  userState => userState.dashboard.lastNotification,
);

export const selectUnreadNotifications = createSelector(
  [getUserStore],
  userState => userState.dashboard.countUnreadNotifications,
);

export const selectLoading = createSelector(
  [getUserStore],
  userState => userState.loading,
);

export const selectTypedHistory = createSelector([selectHistory], history => {
  const typedData = history.reduce((acc, obj) => {
    if (!acc[obj.type]) {
      acc[obj.type] = [];
    }

    acc[obj.type].push(obj);

    return acc;
  }, {});

  for (const key in typedData) {
    typedData[key] = groupByDate(typedData[key], 'utc_timestamp');
  }

  return typedData;
});

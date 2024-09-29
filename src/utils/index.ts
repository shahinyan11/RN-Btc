import {INotificationData} from '@store/user/types';
import EStyleSheet from 'react-native-extended-stylesheet';
import {PermissionsAndroid, Platform} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';

export const deleteAllAfterSymbol = (string, symbol) => {
  new RegExp();
  string.replace(/\?.*/, '');
};

export const generateArray = (length: number) => {
  return [...Array(length)].map((_, index) => index);
};

export const getSlicedText = (text: string, maxLength = 30) => {
  if (text && text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }

  return text;
};

export const getSlicedAddress = (address: string) => {
  if (address.length === 34) {
    const firstPart = address.slice(0, 10);
    const secondPart = address.slice(address.length - 10, address.length);
    return `${firstPart}...${secondPart}`;
  }

  return address;
};

export interface IItemNotificationOptions {
  iconName: string;
  iconColor: string;
  iconBackgroundColor: string;
  // title: { text: string; param?: object };
  // message: { text: string; param?: object };
}

export const getNotificationUserData = (
  notificationType: string,
  data: INotificationData,
) => {
  switch (notificationType) {
    case 'reward':
    case 'decline':
    case 'receive':
    case 'invitePersonRegistered':
    case 'receiveByRequest': {
      return {
        avatar: data.from?.avatar,
        name: data.from?.name,
        username: data.from?.username,
        user_id: data.from?.user_id,
      };
    }

    case 'send':
    case 'sendRequestToReceive': {
      return {
        avatar: data.to?.avatar,
        name: data.to?.name,
        username: data.to?.username,
        user_id: data.to?.user_id,
      };
    }

    case 'requestToReceive': {
      return {
        avatar: data.initiator?.avatar,
        name: data.initiator?.name,
        username: data.initiator?.username,
        user_id: data.initiator?.user_id,
      };
    }

    default: {
      return {
        avatar: data.initiator?.avatar,
        name: data.initiator?.name,
        username: data.initiator?.username,
        user_id: data.initiator?.user_id,
      };
    }
  }
};

export function getNotificationOptions(
  data: INotificationData,
): IItemNotificationOptions {
  const {
    type,
    transactionStatus,
    from,
    to,
    initiator,
    btc,
    amount_btc,
    actions,
    status,
  } = data;
  const alert = EStyleSheet.value('$alert');
  const alertBG = EStyleSheet.value('$alertBG');
  const error = EStyleSheet.value('$error');
  const errorBG = EStyleSheet.value('$errorBG');
  const success = EStyleSheet.value('$success');
  const successBG = EStyleSheet.value('$successBG');

  if (
    type === 'decline' ||
    (type === 'requestToReceive' && status === 'declined') ||
    transactionStatus === 'conflicted'
  ) {
    const name = from?.name ?? 'Unknown';
    return {
      iconName: 'exchange-arrow',
      iconColor: error,
      iconBackgroundColor: errorBG,
      // title: { text: 'declineTransfer', param: { name } },
      // message: { text: 'declineTransferMessage', param: { name } },
    };
  } else if (
    type === 'invitePersonRegistered' ||
    type === 'receive' ||
    type === 'receiveByRequest' ||
    (type === 'send' && transactionStatus === 'ok') ||
    (type === 'requestToReceive' && status === 'confirmed')
  ) {
    const name =
      type === 'send' ? to?.name ?? 'Unknown' : from?.name ?? 'Unknown';

    return {
      iconName:
        type === 'invitePersonRegistered' ? 'profile-plus' : 'exchange-arrow',
      iconColor: success,
      iconBackgroundColor: successBG,
      // title:
      //   type !== 'invitePersonRegistered'
      //     ? { text: 'successTransfer' }
      //     : { text: 'welcomeUserInvite', param: { name } },
      // message:
      //   type !== 'invitePersonRegistered'
      //     ? type === 'send'
      //       ? { text: 'successTransferMessageSend', param: { name } }
      //       : { text: 'successTransferMessageReceive', param: { name } }
      //     : { text: 'welcomeUserInviteMessage', param: { name } },
    };
  } else {
    const name =
      type === 'send' || type === 'sendRequestToReceive'
        ? to?.name ?? 'Unknown'
        : initiator?.name ?? 'Unknown';

    const amount = type === 'send' ? Math.abs(+amount_btc).toFixed(8) : btc;

    return {
      iconName: 'exchange-arrow',
      iconColor: alert,
      iconBackgroundColor: alertBG,
      // title:
      //   type === 'send'
      //     ? { text: 'moneyTransfer' }
      //     : type === 'requestToReceive'
      //     ? { text: 'requestMoneyFromYou', param: { name, amount } }
      //     : { text: 'requestMoneyFromUser', param: { name, amount } },
      // message:
      //   type === 'send'
      //     ? { text: 'moneyTransferMessage', param: { name, amount } }
      //     : type === 'requestToReceive'
      //     ? { text: 'requestMoneyFromUserMessage' }
      //     : { text: 'requestSend' },
    };
  }
}

export interface IGrouped<T> {
  title: string;
  data: T[];
}

export const getGroupedPhoneContacts = (
  onSuccess: (data: IGrouped<Contact>[]) => void,
) => {
  try {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "We need access to you contact's",
        message:
          'If you want send invite to your friend, you need give us access to your contacts',

        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }).then(permission => {
        if (permission === 'granted') {
          Contacts.getAll().then((contacts: Contact[]) => {
            const gContacts = [] as IGrouped<Contact>[];

            contacts.forEach(c => {
              if (c.phoneNumbers.length) {
                let title = 'U';

                //55356
                if (c.givenName && c.givenName.charCodeAt(0) !== 55356) {
                  title = c.givenName[0].toUpperCase();
                }

                if (gContacts.length) {
                  const existItemIndex = gContacts.findIndex(
                    el => el.title === title,
                  );

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
              }
            });

            const gSContacts = gContacts.sort((a, b) =>
              a.title.localeCompare(b.title),
            );
            gSContacts.forEach(gSC => {
              gSC.data = gSC.data.sort((a, b) =>
                a.givenName ? a.givenName.localeCompare(b.givenName) : 0,
              );
            });

            onSuccess(gSContacts);
          });
        }
      });
    } else {
      Contacts.checkPermission().then(currentPermission => {
        if (currentPermission === 'undefined') {
          Contacts.requestPermission().then(permission => {
            if (permission === 'authorized') {
              Contacts.getAll().then((contacts: Contact[]) => {
                const gContacts = [] as IGrouped<Contact>[];
                contacts.forEach(c => {
                  if (c.phoneNumbers.length) {
                    let title = 'U';

                    //55356
                    if (c.givenName && c.givenName.charCodeAt(0) !== 55356) {
                      title = c.givenName[0].toUpperCase();
                    }

                    if (gContacts.length) {
                      const existItemIndex = gContacts.findIndex(
                        el => el.title === title,
                      );

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
                  }
                });

                const gSContacts = gContacts.sort((a, b) =>
                  a.title.localeCompare(b.title),
                );
                gSContacts.forEach(gSC => {
                  gSC.data = gSC.data.sort((a, b) =>
                    a.givenName ? a.givenName.localeCompare(b.givenName) : 0,
                  );
                });

                onSuccess(gSContacts);
              });
            }
          });
        } else if (currentPermission === 'authorized') {
          Contacts.getAll().then((contacts: Contact[]) => {
            const gContacts = [] as IGrouped<Contact>[];
            contacts.forEach(c => {
              if (c.phoneNumbers.length) {
                let title = 'U';

                //55356
                if (c.givenName && c.givenName.charCodeAt(0) !== 55356) {
                  title = c.givenName[0].toUpperCase();
                }

                if (gContacts.length) {
                  const existItemIndex = gContacts.findIndex(
                    el => el.title === title,
                  );

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
              }
            });

            const gSContacts = gContacts.sort((a, b) =>
              a.title.localeCompare(b.title),
            );
            gSContacts.forEach(gSC => {
              gSC.data = gSC.data.sort((a, b) =>
                a.givenName ? a.givenName.localeCompare(b.givenName) : 0,
              );
            });

            onSuccess(gSContacts);
          });
        }
      });
    }
  } catch (e) {
    console.log('Get contacts error');
  }
};

export * from './scaledSize';
export * from './validations';
export * from './asyncStorage';
export * from './fns';
export * from './calendar';

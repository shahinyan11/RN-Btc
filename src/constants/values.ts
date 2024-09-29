export const MAX_CONFIRMATIONS = 6;

export const SOCKETS_EVENTS = {
  TRANSACTIONS_UPDATE: '.transactionsUpdated',
  DASHBOARD_UPDATED: '.dashboardUpdated',
  TRANSACTION_UPDATE: 'transactionUpdated',
};

type ChannelType = 'dashboard' | 'transaction' | 'transactions';

interface SocketsChannelOptions {
  id: number;
  key?: ChannelType;
}

export const getSocketsChannel = (options: SocketsChannelOptions) => {
  switch (options.key) {
    case 'dashboard': {
      return `private-dashboardUser.${options.id}`;
    }
    case 'transactions': {
      return `private-transactionsUser.${options.id}`;
    }
    case 'transaction': {
      return `private-transactionUser.${options.id}`;
    }

    default:
      throw new Error('Invalid key');
  }
};

import {IAppStore} from './app/types';
import {IAuthStore} from './auth/types';
import {IModalStore} from './modal/types';
import {IUserStore} from './user/types';

export interface IAction {
  type: string;
  payload: IActionData;
}

export interface IActionData {
  field: string;
  data: any;
}

export interface IStore {
  app: IAppStore;
  auth: IAuthStore;
  user: IUserStore;
  modal: IModalStore;
}

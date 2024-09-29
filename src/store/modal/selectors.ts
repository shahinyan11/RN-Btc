import {IStore} from '@store/types';
import {IModalStore} from './types';

export const selectModalStore = (state: IStore): IModalStore => state.modal;

import {FC} from 'react';
import Calendar from '@components/modals/Calendar';
import DeleteAccount from '@components/modals/DeleteAccount';

export type ModalComponents = {[key: string]: FC};

const MODAL_COMPONENTS: ModalComponents = {
  CALENDAR: Calendar,
  DELETE_ACCOUNT: DeleteAccount,
};

export default MODAL_COMPONENTS;

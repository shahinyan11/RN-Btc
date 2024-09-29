export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export type Action = {
  type: string;
  payload: any;
};

export type IModalStore = {
  modalType: string | null;
  modalProps: {[key: string]: any};
};

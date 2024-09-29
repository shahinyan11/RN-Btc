import {HIDE_MODAL, SHOW_MODAL} from './types';

export const showModal = ({modalType, modalProps}: any) => ({
  type: SHOW_MODAL,
  payload: {
    modalType,
    modalProps,
  },
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});

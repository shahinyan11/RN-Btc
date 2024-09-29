import React from 'react';
import {useSelector} from 'react-redux';
import RNModal from 'react-native-modal';
import MODAL_COMPONENTS from './components';
import {selectModalStore} from '@store/modal/selectors';

export default function ModalRoot() {
  const {modalType} = useSelector(selectModalStore);
  const CurrentModal = MODAL_COMPONENTS[modalType];

  return (
    <RNModal
      style={{margin: 0}}
      isVisible={!!modalType}
      backdropOpacity={1}
      useNativeDriver={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropColor={'rgba(41, 40, 57, 0.78)'}>
      {modalType && <CurrentModal />}
    </RNModal>
  );
}

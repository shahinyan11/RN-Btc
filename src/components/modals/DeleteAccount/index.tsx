import React from 'react';
import {useDispatch} from 'react-redux';
import {Text, TouchableOpacity, View} from 'react-native';

import {IconClose} from '@assets/icons';
import {hideModal} from '@store/modal/actions';
import st from './styles';
import Button from '@components/buttons/Button';
import {useTranslation} from 'react-i18next';
import {deactivateAccount} from '@store/user';

export default function DeleteAccount() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideModal());
  };

  const handleDeactivate = () => {
    dispatch(deactivateAccount());
    handleClose();
  };

  return (
    <View style={st.content}>
      <TouchableOpacity style={st.icon} onPress={handleClose}>
        <IconClose size={16} />
      </TouchableOpacity>
      <Text style={st.text}>{t('content.delete_account_text')}</Text>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Button
          title={t('cancel')}
          onPress={handleClose}
          containerStyle={{marginRight: 15}}
        />
        <Button
          title={t('delete')}
          onPress={handleDeactivate}
          buttonContainerStyle={{backgroundColor: 'red'}}
        />
      </View>
    </View>
  );
}

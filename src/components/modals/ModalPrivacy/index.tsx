import React from 'react';
import {View} from 'react-native';

import Text from '@components/texts/Text';
import CModal from '../CModal';
import Loader from '@components/Loader';

import useFetch from '../../../hooks/useFetch';

import styles from './styles';

interface IPrivacy {
  title: string;
  sub_title_1: string;
  sub_title_2: string;
  text: string;
}

const PrivacyModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const {loading, error, data: response} = useFetch<{data: IPrivacy}>(
    JSON.stringify({method: 'GET', url: '/pp'}),
  );

  const {title, sub_title_1, sub_title_2, text} = response?.data || {};

  return (
    <CModal isVisible={isVisible} onClose={onClose}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text type="h1" style={styles.titleStyle}>
            {title}
          </Text>
          <Text type="description" style={styles.subtitleStyle}>
            {sub_title_1}
          </Text>
          <View style={styles.headerInfoStyle}>
            <Text type="h3">{sub_title_2}</Text>
          </View>
          <Text type="caption" style={styles.textStyle}>
            {text}
          </Text>
        </>
      )}
    </CModal>
  );
};

export default PrivacyModal;

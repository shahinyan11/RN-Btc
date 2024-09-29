import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';

import Row from '@components/containers/Row';
import Text from '@components/texts/Text';

import {MAX_CONFIRMATIONS} from '@constants/values';
import {generateArray, scaledSize} from '@utils';

interface ItemConfirmationInterface {
  confirmations: number | undefined;
}

const ItemConfirmation = ({confirmations}: ItemConfirmationInterface) => {
  const {t} = useTranslation();
  return (
    <Row justifyContent="space-between" style={styles.containerStyle}>
      <Text type="caption" style={styles.confirmationTextStye}>
        {t('confirmation')} {confirmations}/{MAX_CONFIRMATIONS}
      </Text>

      {generateArray(MAX_CONFIRMATIONS).map(el => {
        const isActive = confirmations > el;
        return (
          <View
            key={el}
            style={[
              styles.confirmationItemStyle,
              isActive && styles.confirmationActiveItemStyle,
            ]}
          />
        );
      })}
    </Row>
  );
};

const styles = EStyleSheet.create({
  containerStyle: {
    marginTop: scaledSize(3),
  },
  confirmationTextStye: {
    marginTop: scaledSize(3),
    marginRight: scaledSize(4),
    color: '$goldText',
  },
  confirmationItemStyle: {
    flex: 1,
    marginLeft: scaledSize(5),
    height: scaledSize(10),
    borderWidth: 1,
    borderColor: '#0e2b5c',
  },
  confirmationActiveItemStyle: {
    borderColor: '#027D42',
    backgroundColor: '#027D42',
  },
});

export default ItemConfirmation;

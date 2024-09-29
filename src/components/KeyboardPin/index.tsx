import React, {memo, useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import ButtonRound from '@components/buttons/ButtonRound';
import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';
import Text from '@components/texts/Text';

import styles from './styles';
import {scaledSize} from '@utils';
import {setAlertMessage} from '@store/app';

interface IKeyboardPinProps {
  value: string;
  onChangeText: (value: string) => void;
  disabled?: boolean;
  withBiometric?: boolean;
  onSuccess?: () => void;
}

interface IButtonNumber {
  disabled: boolean;
  title: string;
  onPress: (value: string) => void;
  value: string;
}

const ButtonNumber = ({disabled, title, value, onPress}: IButtonNumber) => (
  <ButtonRound
    value={value}
    disabled={disabled}
    containerStyle={styles.buttonContainerStyle}
    onPress={onPress}>
    <Text style={styles.titleNumberButtonStyle}>{title}</Text>
  </ButtonRound>
);

const ButtonBiometric = ({disabled, onPress}: any) => (
  <ButtonRound
    value={'face'}
    disabled={disabled}
    containerStyle={styles.buttonContainerStyle}
    onPress={onPress}>
    <Icon name="fingerprint" size={scaledSize(40)} />
  </ButtonRound>
);

const KeyboardPin = ({
  value,
  disabled = false,
  onChangeText,
  withBiometric = false,
  onSuccess,
}: IKeyboardPinProps) => {
  const [isBiometricSupports, setBiometricsSupport] = useState(false);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const error_8 = 'Biometry is locked out';
  const onPressNumber = (number: string) => {
    try {
      onChangeText(value + number);
    } catch {
      console.log('Insert pin number error');
    }
  };

  const onPressDelete = () => {
    try {
      if (value.length) {
        const newValue = value.slice(0, value.length - 1);
        onChangeText(newValue);
      }
    } catch {
      console.log('Delete pin number');
    }
  };

  useEffect(() => {
    ReactNativeBiometrics.isSensorAvailable()
      .then(resultObject => {
        const {available, biometryType} = resultObject;

        if (available && biometryType === ReactNativeBiometrics.TouchID) {
          setBiometricsSupport(true);
        } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
          setBiometricsSupport(true);
        } else if (
          available &&
          biometryType === ReactNativeBiometrics.Biometrics
        ) {
          setBiometricsSupport(true);
        }
      })
      .catch(err => {
        if (err.message.includes(error_8)) {
          dispatch(setAlertMessage(t('content.error_8')));
        } else {
          dispatch(setAlertMessage(t('content.errorTitle')));
        }
      });
  }, []);

  const onPressBiometrics = () => {
    ReactNativeBiometrics.simplePrompt({
      promptMessage: t('content.confirmYourAccess'),
      cancelButtonText: t('content.cancel'),
    })
      .then(({success, error}) => {
        if (success && onSuccess) {
          onSuccess();
        }
      })
      .catch(e => {
        if (e.message.includes(error_8)) {
          dispatch(setAlertMessage(t('content.error_8')));
        } else {
          dispatch(setAlertMessage(t('content.errorTitle')));
        }
      });
  };

  return (
    <SafeAreaView>
      <Row style={styles.rowContainer}>
        <ButtonNumber
          value="1"
          title="1"
          disabled={disabled}
          onPress={onPressNumber}
        />
        <ButtonNumber
          value="2"
          title="2"
          disabled={disabled}
          onPress={onPressNumber}
        />
        <ButtonNumber
          value="3"
          title="3"
          disabled={disabled}
          onPress={onPressNumber}
        />
      </Row>
      <Row style={styles.rowContainer}>
        <ButtonNumber
          value="4"
          title="4"
          disabled={disabled}
          onPress={onPressNumber}
        />
        <ButtonNumber
          value="5"
          title="5"
          disabled={disabled}
          onPress={onPressNumber}
        />
        <ButtonNumber
          value="6"
          title="6"
          disabled={disabled}
          onPress={onPressNumber}
        />
      </Row>
      <Row style={styles.rowContainer}>
        <ButtonNumber
          value="7"
          title="7"
          disabled={disabled}
          onPress={onPressNumber}
        />
        <ButtonNumber
          value="8"
          title="8"
          disabled={disabled}
          onPress={onPressNumber}
        />
        <ButtonNumber
          value="9"
          title="9"
          disabled={disabled}
          onPress={onPressNumber}
        />
      </Row>
      <Row style={styles.rowContainer}>
        {withBiometric && isBiometricSupports ? (
          <ButtonBiometric onPress={onPressBiometrics} />
        ) : (
          <View style={styles.emptyBlock} />
        )}
        <ButtonNumber
          value="0"
          title="0"
          disabled={disabled}
          onPress={onPressNumber}
        />
        <Icon
          disabled={false}
          name="delete"
          color="white"
          size={50}
          containerStyle={styles.deleteContainerStyle}
          onPress={onPressDelete}
        />
      </Row>
    </SafeAreaView>
  );
};

export default memo(KeyboardPin);

import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import Row from '@components/containers/Row';
import SafeContainer from '@components/containers/SafeContainer';
import KeyboardPin from '@components/KeyboardPin';
import Button from '@components/buttons/Button';
import Text from '@components/texts/Text';
import ButtonBack from '@navigation/components/ButtonBack';
import ButtonClose from '@navigation/components/ButtonClose';

import styles from './styles';

import {selectPin, setAppValue} from '@store/app';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';

interface IEnterPinProps {
  pin: string;
  setPin: (value: string) => void;
  isValid: boolean;
  onSubmit: () => void;
  title: string;
  buttonTitle: string;
}

const EnterPin = ({
  pin,
  setPin,
  isValid,
  onSubmit,
  title,
  buttonTitle,
}: IEnterPinProps) => {
  const lightGreen = EStyleSheet.value('$lightGreen');
  const blueGradientStart = EStyleSheet.value('$blueGradientStart');
  return (
    <SafeContainer containerStyle={styles.safeContainerStyle}>
      <Text type="h4" style={styles.titleStyle}>
        {title}
      </Text>

      <Row style={styles.pinContainerStyle}>
        {Array(6)
          .fill('')
          .map((item, index) => {
            if (index < pin.length) {
              return (
                <LinearGradient
                  key={index}
                  colors={[lightGreen, blueGradientStart]}
                  style={styles.activeDotStyle}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                />
              );
            }
            return (
              <LinearGradient
                key={index}
                colors={[lightGreen, blueGradientStart]}
                style={styles.dotStyle}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 1}}>
                <View style={styles.innerDot} />
              </LinearGradient>
            );
          })}
      </Row>

      <KeyboardPin
        disabled={pin.length >= 6}
        value={pin}
        onChangeText={setPin}
      />
      <Button
        disabled={!isValid}
        title={buttonTitle}
        onPress={onSubmit}
        containerStyle={styles.btnContainerStyle}
      />
    </SafeContainer>
  );
};

export default function SetPin({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const [isValid, setValid] = useState(false);
  const [isConfirmValid, setConfirmValid] = useState(false);
  const [renderSubmit, setRenderSubmit] = useState(false);

  const pinCode = useSelector(selectPin);

  const dispatch = useDispatch();

  const onSave = () => {
    setRenderSubmit(true);
  };

  const onConfirm = () => {
    dispatch(setAppValue({field: 'pin', data: pin}));

    navigation.goBack();
  };

  const onPressCross = () => {
    if (!pinCode) {
      dispatch(setAppValue({field: 'pinEnable', data: false}));
    }
  };

  const ButtonRight = () => <ButtonClose onPress={onPressCross} />;
  const ButtonLeft = () => (
    <ButtonBack
      canGoBack={true}
      onPress={() => {
        dispatch(setAppValue({field: 'pinEnable', data: false}));
        navigation.goBack();
      }}
    />
  );
  console.log(pinCode);

  useEffect(() => {
    setValid(pin.length === 6);
    setConfirmValid(pin === confirmPin);
  }, [pin, confirmPin]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderSubmit ? ButtonLeft : null,
      headerRight: ButtonRight,
    });
  }, [renderSubmit, navigation]);

  if (renderSubmit) {
    return (
      <EnterPin
        pin={confirmPin}
        setPin={setConfirmPin}
        isValid={isConfirmValid}
        onSubmit={onConfirm}
        title={t('content.repeatNewPin')}
        buttonTitle={t('savePin')}
      />
    );
  }

  return (
    <EnterPin
      pin={pin}
      setPin={setPin}
      isValid={isValid}
      onSubmit={onSave}
      title={t('createNewPin')}
      buttonTitle={t('create')}
    />
  );
}

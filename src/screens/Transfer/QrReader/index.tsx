import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import Text from '@components/texts/Text';
import SafeContainer from '@components/containers/SafeContainer';

import styles from './styles';
import {globalStyles} from '@constants/styles';

import {setAlertMessage} from '@store/app';
import {selectProfile} from '@store/auth';
import Icon from '@components/icons/Icon';

export default function QrReader({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const cameraRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = React.useState(false);

  const onBarCodeDetected = (event: BarCodeReadEvent) => {
    const {data} = event;
    const walletRegex = new RegExp(/btca:(.{34})|(.{34})/);
    let walletAddress = '';

    if (walletRegex.test(data)) {
      if (data.length > 34) {
        walletAddress = data
          .replace(/\?.*/, '')
          .replace(/^[^:]+/, '')
          .replace(':', '');
      } else {
        walletAddress = data;
      }

      if (walletAddress !== profile.address) {
        navigation.navigate('TransferSend', {
          isAnonymWallet: true,
          contact: {
            address: walletAddress,
          },
        });
      }
    } else {
      dispatch(setAlertMessage(t('wrongWalletAddress')));
    }
  };

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      setIsCameraActive(true);
    });
    return focusListener;
  }, [navigation]);

  useEffect(() => {
    const blurListener = navigation.addListener('blur', () => {
      setIsCameraActive(false);
    });

    return blurListener;
  });

  return (
    <SafeContainer loading={!isCameraActive}>
      <RNCamera
        ref={cameraRef}
        style={globalStyles.fullScale}
        captureAudio={false}
        detectedImageInEvent={true}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={onBarCodeDetected}
      />

      <View style={styles.screenContainerStyle}>
        <View style={styles.topContainerStyle}>
          <Text type="caption" style={styles.qrHintStyle}>
            {t('qrHint')}
          </Text>
        </View>
        <View style={styles.centerContainerStyle}>
          <Icon
            name="topLeftFrame"
            size={44}
            containerStyle={styles.topLeftFrame}
          />
          <Icon
            name="topRightFrame"
            size={54}
            containerStyle={styles.topRightFrame}
          />
          <Icon
            name="bottomLeftFrame"
            size={54}
            containerStyle={styles.bottomLeftFrame}
          />
          <Icon
            name="bottomRightFrame"
            size={54}
            containerStyle={styles.bottomRightFrame}
          />
        </View>
        <View style={styles.bottomContainerStyle} />
      </View>
    </SafeContainer>
  );
}

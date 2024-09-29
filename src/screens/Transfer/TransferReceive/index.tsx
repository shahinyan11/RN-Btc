import React, {useEffect, useRef} from 'react';
import {Clipboard, Platform, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

import Text from '@components/texts/Text';
import SafeContainer from '@components/containers/SafeContainer';
import Row from '@components/containers/Row';
import ButtonDark from '@components/buttons/ButtonDark';

import styles from './styles';

import {selectProfile} from '@store/auth';
import {scaledSize} from '@utils';

export default function TransferReceive() {
  const {address} = useSelector(selectProfile);
  const {t} = useTranslation();
  const [isCopied, setIsCopy] = React.useState(false);

  useEffect(() => {
    Clipboard.getString().then((text: string) => {
      setIsCopy(text === address);
    });
  }, [isCopied, address]);

  const onPressCopy = () => {
    setIsCopy(true);
    Clipboard.setString(address);
  };

  const onPressShare = () => {
    try {
      let FILE_PATH = `${RNFS.DocumentDirectoryPath}/wallet.png`;
      qrImage.current.toDataURL(async (dataURL: string) => {
        if (Platform.OS === 'android') {
          FILE_PATH = `data:image/png;base64, ${dataURL}`;
        } else {
          await RNFS.writeFile(FILE_PATH, dataURL, 'base64');
        }

        const shareImageBase64 = {
          title: 'BTC Addition wallet',
          url: FILE_PATH,
          subject: 'BTC Addition wallet',
          failOnCancel: false,
        };

        Share.open(shareImageBase64);
      });
    } catch (e) {
      console.log('Share image error', e);
    }
  };

  const qrImage = useRef();

  const mediumGreen = EStyleSheet.value('$mediumGreen');

  return (
    <SafeContainer>
      <Text type="h1" style={styles.titleTextStyle}>
        {t('content.scanQr')}
      </Text>
      <View style={styles.centerContainerStyle}>
        <QRCode
          getRef={qrImage}
          value={address}
          quietZone={30}
          size={scaledSize(280)}
        />
        <View style={[styles.topLeftBlock]} />
        <View style={[styles.topRightBlock]} />
        <View style={[styles.bottomLeftBlock]} />
        <View style={[styles.bottomRightBlock]} />
      </View>

      <Text type="description" style={styles.addressStyle}>
        {address}
      </Text>

      <Row justifyContent="space-around">
        <ButtonDark
          icon={{
            name: 'copy',
            fill: isCopied ? 'goldMain' : mediumGreen,
            size: 20,
          }}
          title={isCopied ? t('content.copied') : t('content.copy')}
          onPress={onPressCopy}
          buttonContainerStyle={[
            styles.btnContainerStyle,
            isCopied && styles.isCopiedStyle,
          ]}
        />
        <ButtonDark
          icon={{name: 'share', size: 20}}
          title={t('content.share')}
          onPress={onPressShare}
          buttonContainerStyle={styles.btnContainerStyle}
        />
      </Row>
    </SafeContainer>
  );
}

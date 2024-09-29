import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/texts/Text';
import Link from '@components/buttons/Link';

const styles = EStyleSheet.create({
  containerStyle: {
    alignItems: 'center',
  },
});

interface IButtonResendProps {
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ButtonResend = ({onPress, containerStyle}: IButtonResendProps) => {
  const {t} = useTranslation();
  const [isSend, setIsSend] = useState(true);

  useEffect(() => {
    let timer: any;
    if (isSend) {
      timer = setTimeout(() => {
        setIsSend(false);
      }, 60000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isSend]);

  const onSubmit = () => {
    onPress();

    setIsSend(true);
  };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {isSend ? (
        <>
          <ActivityIndicator
            size="large"
            color={EStyleSheet.value('$lightGreen')}
          />
          <Text type="description">{t('resendHint')}</Text>
        </>
      ) : (
        <Link
          icon={{name: 'reload'}}
          title={t('resendCode')}
          titleColor="white"
          onPress={onSubmit}
        />
      )}
    </View>
  );
};

export default ButtonResend;

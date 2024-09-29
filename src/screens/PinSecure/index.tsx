import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/texts/Text';
import Row from '@components/containers/Row';
import KeyboardPin from '@components/KeyboardPin';

import styles from './styles';
import {selectPin} from '@store/app';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils';

export default function PinSecure({
  onEnterSuccess,
}: {
  onEnterSuccess: () => void;
}) {
  const {t} = useTranslation();
  const [pin, setPin] = useState('');
  const pinApp = useSelector(selectPin);

  const darkGradientStart = EStyleSheet.value('$darkGradientStart');
  const darkGradientEnd = EStyleSheet.value('$darkGradientEnd');

  const animValue = useRef(new Animated.Value(1)).current;

  const animatePinView = Animated.spring(animValue, {
    toValue: 1.5,
    friction: 1,
    useNativeDriver: true,
  });

  useEffect(() => {
    if (pin.length === 6) {
      if (pin === pinApp) {
        onEnterSuccess();
      } else {
        animatePinView.start(({finished}) => {
          if (finished) {
            animValue.setValue(1);
            setPin('');
          }
        });
      }
    }
  }, [pin, onEnterSuccess, pinApp]);

  return (
    <SafeContainer containerStyle={styles.safeContainerStyle}>
      <LinearGradient
        colors={[darkGradientStart, darkGradientEnd]}
        style={styles.gradientContainer}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <Image
          source={require('../../assets/images/lock.png')}
          width={scaledSize(30)}
          height={scaledSize(30)}
        />
      </LinearGradient>

      <View>
        <Animated.View style={{transform: [{scale: animValue}]}}>
          <Text type="h4" style={styles.titleStyle}>
            {t('enterPin')}
          </Text>

          <Row style={styles.pinContainerStyle}>
            {Array(6)
              .fill('')
              .map((item, index) => {
                if (index < pin.length) {
                  return (
                    <LinearGradient
                      key={index}
                      colors={['#05DB93', '#3876DC']}
                      style={styles.activeDotStyle}
                      start={{x: 0, y: 1}}
                      end={{x: 1, y: 0}}
                    />
                  );
                }
                return (
                  <LinearGradient
                    key={index}
                    colors={['#05DB93', '#3876DC']}
                    style={styles.dotStyle}
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 1}}>
                    <View style={styles.dot} />
                  </LinearGradient>
                );
              })}
          </Row>
        </Animated.View>

        <KeyboardPin
          withBiometric={true}
          disabled={pin.length >= 6}
          value={pin}
          onChangeText={setPin}
          onSuccess={onEnterSuccess}
        />
      </View>
    </SafeContainer>
  );
}

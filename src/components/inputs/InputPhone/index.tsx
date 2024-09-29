import React, {useEffect, useState, memo} from 'react';

import {
  View,
  TextInput,
  TextInputProps,
  Text,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Row from '@components/containers/Row';

import styles from './styles';

import countries from './config/countries.json';
import {getFlag} from './config';

interface IInputPhoneProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  errorMessage?: string;
}

interface ICountry {
  name: string;
  iso2: string;
  dialCode: string;
  priority: number;
  areaCodes: string[];
}

const InputPhone = ({
  placeholder,
  value = '',
  onChangeText,
  errorMessage,
  containerStyle,
}: IInputPhoneProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(false);
  const [flag, setFlat] = useState(null);

  const onFocus = () => setIsFocused(true);

  const onBlur = () => setIsFocused(false);

  const primaryColor = EStyleSheet.value('$lightGreen');
  const placeholderColor = EStyleSheet.value('$darkGray');

  const renderFlag = () => {
    if (isFocused || value) {
      return (
        <Row style={styles.countryFlagContainer}>
          <View style={styles.flagContainerStyle}>
            <Image
              source={flag}
              style={styles.flagStyle}
              resizeMode="stretch"
            />
          </View>
          <Text style={styles.plusStyle}>+</Text>
        </Row>
      );
    }
  };

  useEffect(() => {
    try {
      const countryCode = value?.slice(0, 3);

      const countryIso = countries.find(
        (country: ICountry) => country.dialCode === countryCode,
      );

      setFlat(getFlag(countryIso?.iso2));
    } catch {
      console.log('Error with getting flags');
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      if (/\d+/.test(value)) {
        setIsError(false);
      } else if (value.length === 0) {
        setIsError(false);
      } else {
        setIsError(true);
      }
    }
  }, [isFocused, value]);

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <View
        style={
          isFocused
            ? styles.inputFocusedContainerStyle
            : styles.inputContainerStyle
        }>
        {renderFlag()}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          numberOfLines={1}
          maxLength={15}
          placeholderTextColor={placeholderColor}
          onFocus={onFocus}
          onBlur={onBlur}
          selectionColor={primaryColor}
          style={styles.inputStyle}
          keyboardType="numeric"
          keyboardAppearance="dark"
        />
      </View>
      {isError && (
        <View style={styles.errorContainerStyle}>
          <Text style={styles.errorTitleStyle}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default memo(InputPhone);

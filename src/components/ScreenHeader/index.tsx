import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import st from './styles';
import Icon from '@components/icons/Icon';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {navigationRef} from '@navigation/config/RootNavigation';

type Props = {
  hideBackButton?: boolean;
  headerLeft?: () => void;
  headerRight?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

const ScreenHeader = ({
  hideBackButton = false,
  containerStyle,
  headerLeft,
  headerRight,
}: Props) => {
  const route = useRoute();

  const goBack = () => {
    navigationRef.current?.goBack();
  };

  return (
    <View style={[st.container, containerStyle]}>
      <View style={st.cornerContainer}>
        {!hideBackButton && (
          <TouchableOpacity onPress={goBack}>
            <Icon name={'arrow-left'} size={18} />
          </TouchableOpacity>
        )}
        {headerLeft?.()}
      </View>
      <Text style={st.title}>{route.name}</Text>
      <View style={st.cornerContainer}>{headerRight?.()}</View>
    </View>
  );
};

export default ScreenHeader;

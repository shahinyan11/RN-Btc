import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import Counter from '@components/containers/Counter';

import styles from './styles';

interface IBottomTabBarProps extends BottomTabBarProps {
  notificationCounter: number;
}

const BottomTabBar = ({
  state,
  descriptors,
  navigation,
  notificationCounter,
}: IBottomTabBarProps) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.containerStyle}>
      <View style={styles.mainContainerStyle}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.iconContainer}>
              <View>
                {options?.tabBarIcon({
                  color: isFocused ? '#3FA7FE' : 'white',
                  size: 28,
                })}
                {index === 3 && (
                  <Counter
                    counter={notificationCounter}
                    containerStyle={styles.counterContainerStyle}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomTabBar;

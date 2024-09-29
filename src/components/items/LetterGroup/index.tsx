import React, {memo, useCallback} from 'react';
import {View} from 'react-native';

import Text from '@components/texts/Text';
import Divider from '@components/Divider';
import styles from './styles';

interface ILetterGroup<T> {
  title: string;
  data: T[];
  onPress: (value: T) => void;
  MainComponent: any;
}

const LetterGroup = <T extends unknown>(
  props: ILetterGroup<T>,
): JSX.Element => {
  const {title, data, onPress, MainComponent} = props;

  const LetterItem = ({
    itemData,
    withDivider,
  }: {
    itemData: T;
    withDivider: boolean;
  }) => {
    const onPressItem = useCallback(() => {
      onPress(itemData);
    }, [itemData]);

    return (
      <View>
        <MainComponent {...itemData} onPress={onPressItem} />
        {withDivider && <Divider lineHeight={8} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text type="h2" style={styles.textStyle}>
        {title}
      </Text>

      {data.map((item, index) => (
        <LetterItem
          itemData={item}
          withDivider={index !== data.length - 1}
          key={item.id.toString()}
        />
      ))}
    </View>
  );
};

export default memo(LetterGroup) as typeof LetterGroup;

import React from 'react';

import InputKeyword from '@components/inputs/InputKeywoard';
import Row from '@components/containers/Row';

import styles from './styles';

interface IRowProps {
  index: number;
  words: string[];
  disabled: boolean;
  setWords: (value: string[]) => void;
  withoutClear?: boolean;
}

const ItemRow = ({
  index,
  words,
  setWords,
  disabled,
  withoutClear = false,
}: IRowProps) => {
  const onChangeFirstText = (value: string) => {
    try {
      const currentIndex = index;
      const tempWords = words.concat();
      tempWords[currentIndex] = value;

      setWords(tempWords);
    } catch (e) {
      console.log('Error enter second value', e);
    }
  };

  const onChangeSecondText = (value: string) => {
    try {
      const currentIndex = index + 6;

      const tempWords = words.concat();
      tempWords[currentIndex] = value;

      setWords(tempWords);
    } catch (e) {
      console.log('Error enter second value', e);
    }
  };

  const onClearFirst = () => onChangeFirstText('');

  const onClearSecond = () => onChangeSecondText('');

  return (
    <Row key={index} style={styles.rowContainerStyle}>
      <InputKeyword
        editable={disabled}
        index={index + 1}
        value={words[index]}
        containerStyle={styles.leftItemContainerStyle}
        onChangeText={onChangeFirstText}
        onClear={onClearFirst}
        withoutClear={withoutClear}
      />
      <InputKeyword
        editable={disabled}
        index={index + 7}
        value={words[index + 6]}
        containerStyle={styles.rightItemContainerStyle}
        onChangeText={onChangeSecondText}
        onClear={onClearSecond}
        withoutClear={withoutClear}
      />
    </Row>
  );
};

export default ItemRow;

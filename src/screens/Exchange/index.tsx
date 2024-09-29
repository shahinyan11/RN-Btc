import React from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/texts/Text';
import Button from '@components/buttons/Button';
import Pagination from '@components/Pagination';
import useFetch from '../../hooks/useFetch';

import styles from './styles';

import {getExchangeLink} from '@store/user';

interface IPage {
  image_url: string;
  title: string;
}

interface IExchange {
  url: string;
  slides: IPage[];
}

const ImageSlider = ({pages}: {pages: IPage[]}) => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.sliderContainerStyle}>
      {pages.map((item, index: number) => (
        <View key={index.toString()} style={styles.pageContainerStyle}>
          <ImageBackground
            key={index}
            source={{uri: item.image_url}}
            style={styles.imageContainerStyle}>
            <Text type="h1" style={styles.textStyle}>
              {item.title}
            </Text>
            <Pagination
              pages={3}
              activePage={index}
              containerStyle={styles.paginationContainerStyle}
            />
          </ImageBackground>
        </View>
      ))}
    </ScrollView>
  );
};

export default function Exchange() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(getExchangeLink());
  };

  const {
    loading,
    error,
    data: response,
  } = useFetch<{data: IExchange}>(
    JSON.stringify({method: 'GET', url: '/exchange'}),
  );

  return (
    <SafeContainer loading={loading} containerStyle={styles.safeContainerStyle}>
      <Text type="h2">{t('content.exchange')}</Text>
      <ImageSlider pages={response?.data.slides} />
      <Button
        icon={{name: 'link', size: 17}}
        title={t('content.openExchange')}
        onPress={onSubmit}
      />
      <Text style={styles.browserHintStyle}>{t('content.browserHint')}</Text>
    </SafeContainer>
  );
}

import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Text from '@components/texts/Text';
import Pagination from '@components/Pagination';
import Button from '@components/buttons/Button';
import Link from '@components/buttons/Link';

import styles from './styles';
import {skipOnboarding} from '@store/app';
import {getOnboarding} from '@store/auth';
import StarFigure from '@components/onboardingFigures/StarFigure';
import CircleFigure from '@components/onboardingFigures/CircleFigure';

export interface IFLParams {
  item: any;
  index: number;
}

export default function Onboarding() {
  const dispatch = useDispatch();
  const [pages, setPages] = useState([] as any[]);

  const {t} = useTranslation();

  const onUpdatePages = (pages: any[]) => {
    setPages(pages);
  };

  useEffect(() => {
    dispatch(getOnboarding(onUpdatePages));
  }, [dispatch]);

  const flatListRef = useRef(null);

  const onPressSkip = () => {
    dispatch(skipOnboarding());
  };

  const onNext = (nextPage: number) => {
    try {
      if (nextPage < pages.length) {
        flatListRef.current.scrollToIndex({
          index: nextPage,
          animated: true,
        });
      } else {
        onPressSkip();
      }
    } catch (e) {
      console.log('Error next page', e);
    }
  };

  const renderPage =
    (onScrollNext: (nextPage: number) => void) =>
    ({item, index}: IFLParams) => {
      const {title, text, image_url} = item;

      const onPressNext = () => {
        onScrollNext(++index);
      };

      return (
        <View style={styles.pageContainer}>
          <View style={styles.imageContainer}>
            {renderFigure(index)}
            <Image
              source={{uri: image_url}}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </View>
          <Pagination
            pages={pages.length}
            activePage={index}
            dotBackgroundColor={EStyleSheet.value('$blueGradientStart')}
            containerStyle={styles.paginationContainerStyle}
          />
          <Text type="h1" style={styles.titleStyle}>
            {title}
          </Text>
          <Text style={styles.subtitleStyle}>{text}</Text>

          <Button
            title={
              index === pages.length - 1
                ? t('content.finish')
                : t('content.next')
            }
            onPress={onPressNext}
            buttonContainerStyle={styles.buttonContainerStyle}
            containerStyle={styles.btnContainer}
          />
        </View>
      );
    };

  const renderFigure = (currentIndex: number) => {
    if (currentIndex === 0) {
      return (
        <>
          <CircleFigure size={7} right={80} />
          <StarFigure size={10} right={50} top={50} />
          <StarFigure size={10} right={0} top={160} />
          <StarFigure size={10} bottom={60} left={50} />
        </>
      );
    }
    if (currentIndex === 1) {
      return (
        <>
          <CircleFigure
            size={5}
            isTransparent={false}
            right={-15}
            bottom={150}
          />
        </>
      );
    }
    if (currentIndex === 2) {
      return (
        <>
          <StarFigure size={5} right={50} />
          <CircleFigure size={5} left={50} top={40} />
          <StarFigure size={5} bottom={50} />
          <CircleFigure size={5} right={0} bottom={90} />
        </>
      );
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.imgBackgroundContainer}>
      <SafeAreaView style={styles.sfContainerStyle}>
        <View style={styles.containerStyle}>
          <Link
            title={t('content.skip')}
            onPress={onPressSkip}
            titleColor="white"
            containerStyle={styles.skipContainerStyle}
          />
          <FlatList
            scrollEnabled={false}
            ref={flatListRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            data={pages}
            renderItem={renderPage(onNext)}
            keyExtractor={(item, index) => `${item.title}:${index}`}
            contentContainerStyle={styles.pageContainerStyle}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

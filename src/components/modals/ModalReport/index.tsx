import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Keyboard, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImageCropPicker, {
  Image as ICPImage,
} from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';

import Divider from '@components/Divider';
import Icon from '@components/icons/Icon';
import InputComment from '@components/inputs/InputComment';
import Text from '@components/texts/Text';
import Link from '@components/buttons/Link';
import Row from '@components/containers/Row';

import CModal from '../CModal';

import styles from './styles';
import { onSendReport } from '@store/user';

const ModalReport = ({
  isVisible,
  onClose,
  userId,
}: {
  isVisible: boolean;
  onClose: () => void;
  userId: number;
}) => {
  const { t } = useTranslation();
  const [commentText, setCommentText] = useState('');
  const [pictures, setPictures] = useState([]);
  const paddingBottom = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    const listenerKeyboardShow = Keyboard.addListener(
      'keyboardDidShow',
      ({ endCoordinates }) => {
        Animated.timing(paddingBottom, {
          toValue: endCoordinates.height - 20,
          duration: 500,
          useNativeDriver: false,
        }).start();
      },
    );

    return () => listenerKeyboardShow.remove();
  }, [paddingBottom]);

  useEffect(() => {
    const listenerKeyboardHide = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(paddingBottom, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });

    return () => listenerKeyboardHide.remove();
  }, [paddingBottom]);

  const onClearData = () => {
    setCommentText('');
    setPictures([]);

    onClose();
  };

  useEffect(() => {
    setValid(Boolean(commentText));
  }, [commentText, pictures]);

  const onReport = () => {
    dispatch(
      onSendReport({ text: commentText, target_id: userId, images: pictures }),
    );

    onClearData();
  };

  const onAddImage = () =>
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image: ICPImage) => {
      const { path, filename: name = 'avatar', mime } = image;

      const tempPictures = pictures.concat({ name, type: mime, uri: path });

      setPictures(tempPictures);
    });

  const onDeletePicture = (index: number) => () => {
    const tempPictures = pictures
      .slice(0, index)
      .concat(pictures.slice(index + 1, pictures.length));

    setPictures(tempPictures);
  };

  const PicturesComponent = () => (
    <Row justifyContent="flex-start">
      {pictures.map((picture, index) => (
        <Pressable
          key={index}
          style={styles.pictureContainerStyle}
          onPress={onDeletePicture(index)}>
          <Icon
            name="cross"
            size={8}
            containerStyle={styles.iconContainerStyle}
          />
          <Image source={{ uri: picture.uri }} style={styles.pictureStyle} />
        </Pressable>
      ))}
    </Row>
  );

  const goldMain = EStyleSheet.value('$goldMain');
  const darkGray = EStyleSheet.value('$darkGray');

  return (
    <CModal
      isVisible={isVisible}
      onClose={onClearData}
      modalWindowStyle={styles.modalReportWindowStyle}>
      <Text type="h4" style={styles.modalTitleStyle}>
        {t('report')}
      </Text>
      <Divider lineHeight={5} />

      <Animated.View style={{ paddingBottom }}>
        <InputComment
          placeholder={t('addReport')}
          value={commentText}
          onChangeText={setCommentText}
          withButtonSend={false}
          maxLength={160}
          containerStyle={styles.commentStyle}
        />
        <Row justifyContent="space-between" style={styles.reportModalRow}>
          <Row justifyContent="flex-start">
            <PicturesComponent />
            {pictures.length < 2 && (
              <View style={styles.pictureContainerStyle}>
                <Icon
                  disabled={false}
                  name="camera"
                  color={pictures.length >= 1 ? darkGray : goldMain}
                  size={20}
                  containerStyle={
                    pictures.length >= 1
                      ? styles.activeCameraIconContainerStyle
                      : styles.cameraIconContainerStyle
                  }
                  onPress={onAddImage}
                />
              </View>
            )}
          </Row>
          {isValid && <Link title={t('submitReport')} onPress={onReport} />}
        </Row>
      </Animated.View>
    </CModal>
  );
};

export default ModalReport;

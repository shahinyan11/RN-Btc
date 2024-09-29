import React, {useEffect, useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImageCropPicker, {
  Image as ICPImage,
} from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';

import Divider from '@components/Divider';
import Icon from '@components/icons/Icon';
import InputComment from '@components/inputs/InputComment';
import Text from '@components/texts/Text';
import Link from '@components/buttons/Link';
import Row from '@components/containers/Row';

import styles from './styles';
import {onSendReport} from '@store/user';
import {StackScreenProps} from '@react-navigation/stack';
import KeyboardListener from '@components/listeners/KeyboardListener';

export default function ContactReport({
  navigation,
  route,
}: StackScreenProps<any>) {
  const {userId} = route.params;
  const {t} = useTranslation();
  const goldMain = EStyleSheet.value('$goldMain');
  const darkGray = EStyleSheet.value('$darkGray');
  const lightGreen = EStyleSheet.value('$lightGreen');
  const [commentText, setCommentText] = useState('');
  const [pictures, setPictures] = useState([]);

  const dispatch = useDispatch();
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    setValid(Boolean(commentText));
  }, [commentText, pictures]);

  const onReport = () => {
    dispatch(
      onSendReport({text: commentText, target_id: userId, images: pictures}),
    );
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onUpdateComment = (text: string) => {
    setCommentText(text);
  };

  const onAddImage = () =>
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image: ICPImage) => {
      const {path, filename: name = 'avatar', mime} = image;

      const tempPictures = pictures.concat({name, type: mime, uri: path});

      setPictures(tempPictures);
    });

  const onDeletePicture = (index: number) => () => {
    try {
      const tempPictures = pictures
        .slice(0, index)
        .concat(pictures.slice(index + 1, pictures.length));

      setPictures(tempPictures);
    } catch (e) {
      console.log('Remove image from report error');
    }
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
          <Image source={{uri: picture.uri}} style={styles.pictureStyle} />
        </Pressable>
      ))}
    </Row>
  );

  return (
    <View style={styles.containerStyle}>
      <Pressable style={styles.flexOne} onPress={onBack} />
      <KeyboardListener
        keyboardOffset={0}
        containerStyle={styles.modalWindowStyle}>
        <View>
          <Text type="h4" style={styles.modalTitleStyle}>
            {t('report')}
          </Text>
          <Divider lineHeight={5} />

          <View>
            <InputComment
              placeholder={t('addReport')}
              value={commentText}
              onChangeText={onUpdateComment}
              withButtonSend={false}
              maxLength={160}
              containerStyle={styles.commentStyle}
            />
            <Row justifyContent="space-between" style={styles.reportModalRow}>
              <View style={styles.rowContainer}>
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
                {isValid && (
                  <Link
                    titleColor={lightGreen}
                    title={t('submitReport')}
                    onPress={onReport}
                  />
                )}
              </View>
            </Row>
          </View>
        </View>
      </KeyboardListener>
    </View>
  );
}

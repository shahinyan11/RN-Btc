import React, {useEffect, useState} from 'react';
import {Clipboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation} from '@react-navigation/native';

import CModal from '@components/modals/CModal';
import Profile from '@components/containers/Profile';
import Row from '@components/containers/Row';
import ButtonRound from '@components/buttons/ButtonRound';
import Divider from '@components/Divider';
import Icon from '@components/icons/Icon';
import Loader from '@components/Loader';
import Link from '@components/buttons/Link';

import ModalReport from '../ModalReport';

import {
  getContactById,
  onAddContactToFriends,
  onRemoveContactFromFriends,
} from '@store/user';
import {IContact} from '@store/user/types';

import styles from './styles';

interface IModalContactProps {
  isVisible: boolean;
  onClose: () => void;
  userId: number;
  isPreview?: boolean;
}

const ButtonActionRound = ({
  title,
  iconName,
  onPress,
  backgroundColor,
}: {
  title: string;
  iconName: string;
  onPress?: () => void;
  backgroundColor?: string;
}) => (
  <ButtonRound
    title={title}
    containerStyle={[styles.actionButtonStyle, {backgroundColor}]}
    onPress={onPress}>
    <Icon name={iconName} />
  </ButtonRound>
);

const ModalMore = ({
  isVisible,
  onClose,
  onCopyUsername,
  onPressReport,
}: {
  isVisible: boolean;
  onClose: () => void;
  onCopyUsername: () => void;
  onPressReport: () => void;
}) => {
  const {t} = useTranslation();
  return (
    <CModal
      isVisible={isVisible}
      onClose={onClose}
      modalWindowStyle={styles.modalMoreWindowStyle}>
      <Link
        title={t('copyUsername')}
        titleColor={EStyleSheet.value('$white')}
        onPress={onCopyUsername}
        containerStyle={styles.moreBtnContainerStyle}
      />
      <Divider lineHeight={0} />
      <Link
        title={t('report')}
        titleColor={EStyleSheet.value('$error')}
        onPress={onPressReport}
        containerStyle={styles.moreBtnContainerStyle}
      />
    </CModal>
  );
};

const ModalContact = ({
  isVisible,
  onClose,
  userId,
  isPreview = false,
}: IModalContactProps) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({} as IContact);
  const [isLoading, setLoading] = useState(true);
  const {t} = useTranslation();

  const [isModalMoreShow, setIsModalMoreShow] = useState(false);
  const [isModalReportShow, setIsModalReportShow] = useState(false);

  const navigation = useNavigation();

  const onCopyUsername = () => {
    Clipboard.setString(user.username);
  };

  const onChangeModalMoreVisible = () => setIsModalMoreShow(!isModalMoreShow);

  const onChangeModalReportVisible = () => {
    setIsModalMoreShow(false);

    setIsModalReportShow(!isModalReportShow);
  };

  const onPressReport = () => {
    onChangeModalReportVisible();
  };

  const onChangeContactFriendStatus = () => {
    if (user.is_friend) {
      dispatch(onRemoveContactFromFriends(user.user_id));
    } else {
      dispatch(onAddContactToFriends({user_id: user.user_id}));
    }

    setUser({...user, is_friend: !user.is_friend});
  };

  const onSend = () => {
    onClose();
    navigation.navigate('TransferSend', {
      isAnonymWallet: false,
      contact: user,
    });
  };

  const onRequest = () => {
    onClose();
    navigation.navigate('TransferRequest', {
      contact: user,
    });
  };

  const onUserFound = (data: IContact) => {
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      dispatch(getContactById({contact: userId, onSuccess: onUserFound}));
    }
  }, [userId, isVisible, dispatch]);

  useEffect(() => {
    if (!isVisible && !isLoading) {
      setLoading(true);
    }
  }, [isVisible, isLoading]);

  if (!isVisible) return null;

  return (
    <CModal
      isVisible={isVisible}
      onClose={onClose}
      modalWindowStyle={styles.modalWindowStyle}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!isPreview && (
            <Icon
              disabled={false}
              name="more"
              color={'white'}
              containerStyle={styles.moreContainerStyle}
              onPress={onChangeModalMoreVisible}
            />
          )}
          <Profile {...user} />
          <Row>
            <ButtonActionRound
              title={t('send')}
              iconName="send-icon"
              onPress={onSend}
            />
            <ButtonActionRound
              title={t('request')}
              iconName="receive"
              onPress={onRequest}
            />
            <ButtonActionRound
              title={user.is_friend ? t('yourFriend') : t('addFriend')}
              iconName={user.is_friend ? 'profile-check' : 'profile-plus'}
              onPress={onChangeContactFriendStatus}
              backgroundColor={
                user.is_friend ? EStyleSheet.value('$goldMain') : 'transparent'
              }
            />
          </Row>
        </>
      )}
      <ModalMore
        isVisible={isModalMoreShow}
        onClose={onChangeModalMoreVisible}
        onCopyUsername={onCopyUsername}
        onPressReport={onPressReport}
      />
      <ModalReport
        userId={userId}
        isVisible={isModalReportShow}
        onClose={onChangeModalReportVisible}
      />
    </CModal>
  );
};

export default ModalContact;

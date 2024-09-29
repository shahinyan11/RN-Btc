import React, {useState} from 'react';
import {Image, Platform, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import Config from 'react-native-config';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import appleAuth from '@invertase/react-native-apple-authentication';
import {StackScreenProps} from '@react-navigation/stack';
import Text from '@components/texts/Text';
import ButtonDark from '@components/buttons/ButtonDark';
import Divider from '@components/Divider';
import Button from '@components/buttons/Button';
import Link from '@components/buttons/Link';
import CModal from '@components/modals/CModal';
import {SwitcherLanguage} from '@components/switchers/SwitcherLanguage';

import styles, {modalStyle} from './styles';

import {onSocialLogin} from '@store/auth';
import {scaledSize} from '@utils';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';

interface IModalAnonymous {
  isVisible: boolean;
  onClose: () => void;
  onSignInAnonymous: () => void;
  onSignUpAnonymous: () => void;
}

const ModalAnonymous = ({
  isVisible,
  onClose,
  onSignInAnonymous,
  onSignUpAnonymous,
}: IModalAnonymous) => {
  const {t} = useTranslation();
  return (
    <CModal isVisible={isVisible} onClose={onClose}>
      <Text type="h3" style={modalStyle.titleStyle}>
        {t('content.content.newUser')}
      </Text>
      <Divider lineHeight={16} />

      <Button title={t('content.notUser')} onPress={onSignUpAnonymous} />
      <Link
        title={t('content.isUser')}
        containerStyle={modalStyle.linkContainerStyle}
        onPress={onSignInAnonymous}
      />
    </CModal>
  );
};

GoogleSignin.configure({
  webClientId: Config.GOOGLE_WEB_CLIENT_ID,
});

export default function Auth({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const dispatch = useDispatch();

  const onPressMember = () => navigation.navigate('SignIn');

  const onPressSignUp = () => navigation.navigate('SignUp');

  const showModalAnonymous = () => {
    setIsAnonymous(!isAnonymous);
  };

  const onSignInAnonymous = () => {
    showModalAnonymous();
    navigation.navigate('SISeed');
  };

  const onSignUpAnonymous = () => {
    showModalAnonymous();
    navigation.navigate('SUSeed');
  };

  const onSignInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();

      const {accessToken} = await GoogleSignin.getTokens();
      dispatch(onSocialLogin({provider: 'google', token: accessToken}));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const onSignInFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(res => {
            dispatch(
              onSocialLogin({provider: 'facebook', token: res?.accessToken}),
            );
          });
        }
      },
      error => {
        console.log(error);
      },
    );
  };

  const onAppleSignIn = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      dispatch(
        onSocialLogin({
          provider: 'apple',
          token: appleAuthRequestResponse.identityToken,
        }),
      );
    }
  };

  return (
    <SafeScrollContainer containerStyle={styles.containerStyle}>
      <View>
        <SwitcherLanguage />
        <Image
          style={styles.logoStyle}
          source={require('../../assets/images/logo.png')}
          width={scaledSize(162)}
          height={scaledSize(180)}
        />
        <Text type="h1" style={styles.titleStyle}>
          {t('content.welcome')}
        </Text>
        <Text type="caption" style={styles.subtitleStyle}>
          {t('content.welcomeDescription')}
        </Text>
      </View>
      <View style={styles.buttonGroupContainer}>
        <ButtonDark
          icon={{name: 'google', size: 24}}
          title={t('content.continueGoogle')}
          onPress={onSignInGoogle}
          containerStyle={styles.btnContainerStyle}
          btnContinue
        />
        <ButtonDark
          icon={{name: 'facebook', size: 24}}
          title={t('content.continueFacebook')}
          onPress={onSignInFacebook}
          containerStyle={styles.btnContainerStyle}
          btnContinue
        />
        {Platform.OS === 'ios' && (
          <ButtonDark
            icon={{name: 'apple', size: 24}}
            title={t('content.continueApple')}
            onPress={onAppleSignIn}
            containerStyle={styles.btnContainerStyle}
            btnContinue
          />
        )}
        <ButtonDark
          icon={{name: 'lock', size: 24}}
          title={t('content.continueAnonymously')}
          onPress={showModalAnonymous}
          containerStyle={styles.btnContainerStyle}
          btnContinue
        />
      </View>
      <Divider text={t('content.or')} textStyle={styles.dividerTextStyle} />

      <Button title={t('content.signUpWithEmail')} onPress={onPressSignUp} />

      <Link
        title={t('content.member')}
        containerStyle={styles.linkContainerStyle}
        onPress={onPressMember}
        titleColor="white"
      />

      <ModalAnonymous
        isVisible={isAnonymous}
        onClose={showModalAnonymous}
        onSignInAnonymous={onSignInAnonymous}
        onSignUpAnonymous={onSignUpAnonymous}
      />
    </SafeScrollContainer>
  );
}

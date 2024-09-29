import React, {useState} from 'react';

import SafeContainer from '@components/containers/SafeContainer';

import styles from './styles';
import WelcomeContainer from '@screens/RestoreAccount/WelcomeContainer';
import RestoreForm from '@screens/RestoreAccount/RestoreForm';

export default function RestoreAccount() {
  const [formVisible, setFormVisible] = useState(false);

  return (
    <SafeContainer containerStyle={styles.containerStyle}>
      {!formVisible && (
        <WelcomeContainer onPress={() => setFormVisible(true)} />
      )}

      {formVisible && <RestoreForm />}
    </SafeContainer>
  );
}

import {useCallback, useEffect, useState} from 'react';
import {AppState} from 'react-native';

const useAppState = () => {
  const [appState, setAppState] = useState('active');
  const _handleAppStateChange = useCallback(nextAppState => {
    setAppState(nextAppState);
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [_handleAppStateChange]);

  return {appState};
};

export default useAppState;

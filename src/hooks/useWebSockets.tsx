import {useCallback, useEffect, useRef} from 'react';
import Config from 'react-native-config';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js/react-native';

import useAppState from '@hooks/useAppState';

global.Pusher = Pusher;

interface HookProps {
  event: string;
  setData: (data: undefined | T) => void;
  token: string;
  channel: string;
}

const useWebSockets = (options: HookProps) => {
  const ref = useRef();

  const {event, setData, token, channel} = options;
  const {appState} = useAppState();

  const disconnect = () => {
    ref.current!.disconnect();
  };

  const connect = useCallback(() => {
    const PusherClient = new Pusher(Config.WS_ID, {
      cluster: 'mt1',
      wsHost: Config.WS_HOST,
      wsPort: 8443,
      wssPort: 8443,
      enabledTransports: ['wss', 'ws'],
      forceTLS: true,
      authEndpoint: Config.WS_AUTH_URL,
      auth: {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
        },
      },
    });

    const echo = new Echo({
      broadcaster: 'pusher',
      client: PusherClient,
    });

    echo.channel(channel).listen(event, ev => {
      setData && setData(ev);
    });

    ref.current = echo;
  }, [channel]);

  useEffect(() => {
    if (appState.match(/inactive|background/)) {
      disconnect();
    } else {
      connect();
    }
  }, [appState, event, channel]);

  return {
    disconnect,
  };
};

export default useWebSockets;

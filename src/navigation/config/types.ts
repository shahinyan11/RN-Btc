import { StackScreenProps } from '@react-navigation/stack';
import { IContact } from '@store/user/types';

type EnterPhoneStackProps = {
  SUEnterPhone: {
    isRegistration: boolean;
  };
  SUEnterCode: {
    phone: number;
  };
};

export type EnterPhoneProps = StackScreenProps<
  EnterPhoneStackProps,
  'SUEnterPhone'
>;

export type EnterCodeProps = StackScreenProps<
  EnterPhoneStackProps,
  'SUEnterCode'
>;

export type TransferSendStackProps = {
  TransferSend: {
    isAnonymWallet: boolean;
    contact: IContact;
  };
  TransferStatus: {
    transactionStatus: boolean;
    currentUSDRate: number;
    btcAmount: string;
    comment: string;
    contact: IContact;
    commission: number;
    isAnonymWallet: boolean;
  };
};

export type TransferCreateProps = StackScreenProps<
  TransferSendStackProps,
  'TransferSend'
>;

export type TransferStatusProps = StackScreenProps<
  TransferSendStackProps,
  'TransferStatus'
>;

type AuthStackProps = {
  SUSeed: {
    words: string[];
  };
  SUSeedSecure: any;
  PRecoveryAwaitCode: {
    email: string;
  };
  PRecoveryEnterCode: {
    email: string;
  };
  PRecoveryResetPassword: {
    code: string;
    email: string;
  };
};

export type PRecoveryAwaitCodeProps = StackScreenProps<
  AuthStackProps,
  'PRecoveryAwaitCode'
>;

export type PRecoveryEnterCodeProps = StackScreenProps<
  AuthStackProps,
  'PRecoveryEnterCode'
>;

export type PRecoveryResetPasswordProps = StackScreenProps<
  AuthStackProps,
  'PRecoveryResetPassword'
>;

export type SUSeedProps = StackScreenProps<AuthStackProps, 'SUSeed'>;

type SettingsStackProps = {
  Settings: any;
  ChangeEmail: any;
};

export type ChangeEmailProps = StackScreenProps<
  SettingsStackProps,
  'ChangeEmail'
>;

// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// import { DrawerNavigationProp } from '@react-navigation/drawer';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
// import { StackScreenProps } from '@react-navigation/stack';

export type RootParams = {
  teste: undefined;
};

export type ForgotPasswordParams = {};

export type LoginStackParams = {
  '/': undefined;
  'user-identification': {email: string} | undefined;
  'register-user-condominiums': undefined;
  'confirmation-code': {email: string};
  'confirmation-code-register': undefined;
  'forgot-password': {email: string} | undefined;
  'create-password': undefined;
  help: undefined;
};

export type LoginParams = {
  login: NavigatorScreenParams<LoginStackParams>;
};

// params

export type RootStackScreenProps<T extends keyof RootParams> =
  BottomTabScreenProps<RootParams, T>;

// export type LoginStackScreenProps<T extends keyof LoginStackParams> =
//   StackScreenProps<LoginStackParams, T>;

// navigation
// export type RootNavigationProps = CompositeNavigationProp<
// BottomTabScreenProps<RootParams, keyof RootParams>,
//   NativeStackNavigationProp<LoginParams, keyof LoginParams>
// >;

// export type LoginNavigationProps = NativeStackNavigationProp<
//   LoginParams,
//   keyof LoginParams
// >;

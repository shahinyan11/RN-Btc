// import React, { useEffect } from 'react';
// import { Clipboard } from 'react-native';
// import { PKPaymentAuthorizationController } from 'react-native-payments';
// import AndroidWallet from 'react-native-android-wallet';
//
// const CreditCardInput = () => {
//   useEffect(() => {
//     const fetchPaymentMethods = async () => {
//       try {
//         const request = {
//           countryCode: 'US',
//           currencyCode: 'USD',
//           supportedNetworks: ['visa', 'mastercard', 'amex'],
//           merchantCapabilities: ['supports3DS'],
//         };
//         const paymentMethods = await PKPaymentAuthorizationController.availableNetworksAsync(request);
//         const cardNumbers = paymentMethods.map(paymentMethod => paymentMethod.paymentPass.primaryAccountNumber);
//         Clipboard.setString(cardNumbers.join('\n'));
//       } catch (error) {
//         console.log(error);
//       }
//     };
//
//     fetchPaymentMethods();
//   }, []);
//
//   useEffect(() => {
//     const fetchPaymentMethods = async () => {
//       try {
//         const paymentMethods = await AndroidWallet.getAllCards();
//         const cardNumbers = paymentMethods.map(paymentMethod => paymentMethod.number);
//         Clipboard.setString(cardNumbers.join('\n'));
//       } catch (error) {
//         console.log(error);
//       }
//     };
//
//     fetchPaymentMethods();
//   }, []);
//
//   return null;
// };
//
// export default CreditCardInput;
//

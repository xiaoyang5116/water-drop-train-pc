import { gql } from '@apollo/client';

export const SEND_SMS_CODE = gql`
  mutation sendSmsCode($tel: String!) {
    sendSmsCode(tel: $tel) {
      code
      message
    }
  }
`;

export const LOGIN = gql`
  mutation login($tel: String!, $code: String!) {
    login(tel: $tel, code: $code) {
      code
      message
      data
    }
  }
`;

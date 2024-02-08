import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUserInfo {
    getUserInfo {
      id
      tel
      name
      desc
      avatar
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUserInfo($id: String!, $params: UserInputType!) {
    updateUserInfo(id: $id, params: $params) {
      code
      message
    }
  }
`;

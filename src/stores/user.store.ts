import { create } from 'zustand';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { IUser } from '../utils/type';

type TUserInfo = IUser & { refetch: () => void };

type TUserStore = {
  userInfo: TUserInfo;
  setUserInfo: (params: Partial<TUserInfo>) => void;
};

const defaultUserInfo: TUserInfo = {
  id: '',
  tel: '',
  name: '',
  desc: '',
  avatar: '',
  refetch: () => {},
};

const userStoreBase = create<TUserStore>()((set) => ({
  userInfo: defaultUserInfo,
  setUserInfo: (params) => set((state) => ({ userInfo: { ...state.userInfo, ...params } })),
}));

export const useUserStore = createSelectorFunctions(userStoreBase);

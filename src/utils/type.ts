export type ResultType = {
  code: number;
  message: string;
};

export type ResultDateType<T> = {
  code: number;
  message: string;
  data: T;
};

export interface IUser {
  id: string;
  name: string;
  tel: string;
  desc: string;
  avatar: string;
}

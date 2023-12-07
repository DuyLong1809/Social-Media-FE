export interface IRegister {
  name: string;
  email: string
  password: string;
  avatar: string
  cover_photo: string;
  bio: string
  address: string;
  phone: number
  website: string;
  workplace: string
  education: string;
  birthdate: string;
}

export interface IRegisterRespon {
  error: string,
  data: IRegister,
  success: boolean,
  targetUrl: string,
  unAuthorizedRequest: boolean,
  __abp: boolean,
}
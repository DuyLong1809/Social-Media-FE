export interface LoginInterface {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
  userId: string;
  name: string;
}

export interface LoginRespon {
  error: string,
  data: LoginResult,
  success: boolean,
  targetUrl: string,
  unAuthorizedRequest: boolean,
  __abp: boolean,
}
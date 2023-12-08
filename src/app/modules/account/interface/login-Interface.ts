export interface LoginInterface {
  email: string;
  password: string;
}

export interface LoginResult {
  id: string;
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

export interface LoginRespon {
  token: string;
  data: LoginResult,
}
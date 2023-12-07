export interface IUser {
  id: number;
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

export interface IUserRespon {
  data: IUser
}

export interface IgetAllPost {
  id: number;
  user_id: number;
  content: string;
  view_count_news: number;
  user: IUser;
  images: IgetAllPostImage[];
  created_at: string;
  updated_at: string;
}

export interface IgetAllPostImage {
  id: number;
  post_id: number;
  comment_id: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface IgetAllPostRespon {
  data: IgetAllPost[]
}



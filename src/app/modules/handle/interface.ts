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
  posts: IgetAllPost[];
}

export interface IUserRespon {
  data: IUser
}

export interface INameAvatarUser {
  name: string;
  avatar: string
}

export interface INameAvatarUserRespon {
  data: INameAvatarUser
}

export interface IgetAllPost {
  id: number;
  user_id: number;
  content: string;
  view_count_news: number;
  user: IUser;
  images: IgetAllPostImage[];
  likes: ILikes[];
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


export interface ILikes {
  id: number;
  user_id: number;
  post_id: number;
  isLiked: boolean;
  created_at: string;
  updated_at: string;
}




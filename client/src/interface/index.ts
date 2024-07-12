export interface Post {
  id: number;
  title: string;
  content: string;
  status: boolean; // Ví dụ: true = Locked, false = Active
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  pass: string;
  avatar: string;
  banner: string;
  bio: string;
  follows: { userId: number; created_at: string }[];
  friends: { userId: number; created_at: string }[];
  groups: Group[];
  created_at: string;
}

export interface Group {
  id: number;
  name: string;
  image: string;
}

export interface Friend {
  id: number;
  username: string;
  avatar: string;
}

export interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface RootState {
  reducerCRUD: {
    items: never[];
    authState: {
      isAuthenticated: boolean;
      userName: string;
    };
  };
  groups: Group[];
  friends: Friend[];
  posts: PostsState; // Cập nhật RootState để bao gồm state của posts
}

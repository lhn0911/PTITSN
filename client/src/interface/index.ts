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
  }
  
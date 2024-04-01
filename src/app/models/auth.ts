export type Login = {
  email: string;
  password: string;
};

export type Register = {
  username: string;
  email: string;
  password: string;
  bio: string | null;
  dob: string | null;
};

export type AuthResponse = {
  result: boolean;
  error: [] | null;
  token: string;
  user: User | null;
};

export type User = {
  id: number;
  dob: string | null;
  email: string;
  username: string;
  bio: string | null;
};

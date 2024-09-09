export interface ApiData<T = null> {
  data: T;
  isOperational?: boolean;
  statusCode: number;
  message: string;
  status: "success" | "fail" | "error";
}

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthData {
  user: User;
  token: string;
}

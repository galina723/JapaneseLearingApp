export interface User {
  userId: number;
  username: string;
  fullname: string;
  email: string;
  password: string;
  createdTime: Date;
  xp: number;
  status: UserStatus;
}
export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
  username: string;
  expiresIn: number;
}

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Blocked = 'Blocked',
  Pending = 'Pending',
}

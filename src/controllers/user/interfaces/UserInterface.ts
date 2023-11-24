export interface UserCreateInterface {
  firsName: string;
  lastName: string;
  email: string;
  role: Role;
  password: string;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}

export enum Role {
  USER,
  ADMIN,
  TESTER,
}

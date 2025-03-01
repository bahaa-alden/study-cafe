export type User = {
  id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserEditBody = {
  name: string;
  email: string;
};

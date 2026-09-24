export type User = {
  email: string;
  role: "user" | "admin";
};

export type UserForm = {
  email: string;
  password: string;
};

export type UserAuthenticated = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

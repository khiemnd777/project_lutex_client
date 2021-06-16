export type AuthType = {
  jwt: string;
  user: {
    blocked: boolean;
    confirmed: boolean;
    createdAt: string;
    email: string;
    id: string;
    provider: string;
    role: {
      _id: string;
      name: string;
      description: string;
      type: string;
    };
    updatedAt: string;
    username: string;
  };
};

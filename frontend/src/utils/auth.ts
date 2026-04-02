type LoginPayload = {
  identifier: string;
  password: string;
};

export const buildLoginPayload = (
  identifier: string,
  password: string,
): LoginPayload => {
  return {
    identifier,
    password,
  };
};

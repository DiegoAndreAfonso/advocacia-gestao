import { getAxios, authStorage } from "@/configs/axios";
import auth from "@/configs/auth";
import { buildLoginPayload } from "@/utils/auth";
import { LoginInput } from "@/schemas/auth.schema";

export const postLogin = async (input: LoginInput) => {
  const payload = buildLoginPayload(input.identifier, input.password);

  const response = await getAxios().post(auth.loginEndpoint, payload);
  const result = response.data?.data ?? response.data;
  authStorage.set(result?.token ?? null);

  if (result?.user) {
    localStorage.setItem(auth.userDataKeyName, JSON.stringify(result.user));
  }

  return result; 
};
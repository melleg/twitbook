import { api } from "../base-api";
import Image from "../user/image";

const uri = "images";

export const getProfileImage = async (username: string) => {
  return (await api.get<Image>(`${uri}/u/${username}`)).data;
};

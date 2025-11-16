import api from "../lib/axios";
import type { SignResponseType } from "../models/auth-model";
import type { ResponseType } from "../types/types";

export class UserService {
  // update avatar
  static async updateAvatar(
    id: number,
    req: { avatar: File }
  ): Promise<ResponseType<SignResponseType | null>> {
    // call api
    const response = await api
      .patch(`/user/update-avatar/${id}`, req, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);

    // return response data
    return response;
  }
}

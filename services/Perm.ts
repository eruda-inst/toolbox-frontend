import axiosClient from "@/libs/axiosClient.lib";
import { API_ROUTES } from "@/configs/api.config";
import { PermOut } from "@/types/perm.type";

class Perm {
  public static async getByUserId(id: number): Promise<PermOut[]> {
    const res = await axiosClient.get<PermOut[]>(
      API_ROUTES.perm.getByUserId(id),
    );
    return res.data;
  }

  public static async getByGroupId(id: number): Promise<PermOut[]> {
    const res = await axiosClient.get<PermOut[]>(
      API_ROUTES.perm.getByGroupId(id),
    );
    return res.data;
  }

  public static async getByGroupName(name: string): Promise<PermOut[]> {
    const res = await axiosClient.get<PermOut[]>(
      API_ROUTES.perm.getByGroupName(name),
    );
    return res.data;
  }
}

export { Perm };

import axiosClient from "@/libs/axiosClient.lib";
import { API_ROUTES } from "@/configs/api.config";
import {
  requestOtpIn,
  resetPasswordIn,
  verifyOtpIn,
  verifyOtpOut,
} from "@/types/resetPassword.type";

class ResetPasswordService {
  public static async requestOtp(req: requestOtpIn) {
    const res = await axiosClient.post<undefined>(
      API_ROUTES.resetPassword.requestOtp(),
      { ...req },
    );
    return res.data;
  }

  public static async verifyOtp(req: verifyOtpIn) {
    const res = await axiosClient.post<verifyOtpOut>(
      API_ROUTES.resetPassword.verifyOtp(),
      { ...req },
    );
    return res.data;
  }

  public static async resetPassword(req: resetPasswordIn) {
    const res = await axiosClient.post<undefined>(
      API_ROUTES.resetPassword.resetPassword(),
      { ...req },
    );
    return res.data;
  }
}

export { ResetPasswordService };

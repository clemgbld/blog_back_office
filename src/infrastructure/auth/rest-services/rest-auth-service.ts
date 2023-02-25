import { User, AuthCredentials } from "../../../core/auth/entities/auth";
import { restService } from "../../common/rest-service/rest-service";
import { BLOG_BASE_URL, METHOD } from "../../common/rest-service/constants";
import { USERS_ENDPOINT, LOGIN_ENDPOINT } from "./constants";
import { catchAsync } from "../../common/error/catch-async";
import { AuthService } from "../../../core/auth/port/auth-service";

export const buildRestAuthService = (): AuthService => ({
  login: catchAsync(async (user: User): Promise<AuthCredentials> => {
    const res = await restService({
      url: `${BLOG_BASE_URL}${USERS_ENDPOINT}${LOGIN_ENDPOINT}`,
      method: METHOD.POST,
      body: user,
    });

    return res.data;
  }),
});

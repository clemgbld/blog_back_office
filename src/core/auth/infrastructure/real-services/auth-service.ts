import { User, AuthCredentials } from "../../entities/auth";
import { restService } from "../../../infastructure/rest-service/rest-service";
import {
  BLOG_BASE_URL,
  METHOD,
} from "../../../infastructure/rest-service/constants";
import { USERS_ENDPOINT, LOGIN_ENDPOINT } from "./constants";
import { catchAsync } from "../../../error/catch-async";

export const buildAuthService = () => ({
  login: catchAsync(async (user: User): Promise<AuthCredentials> => {
    const res = await restService({
      url: `${BLOG_BASE_URL}${USERS_ENDPOINT}${LOGIN_ENDPOINT}`,
      method: METHOD.POST,
      body: user,
    });

    return res.data;
  }),
});

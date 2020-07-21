import { AxiosResponse } from "axios";
import { Http } from "../../Utils/Http";
import { ILoginReponse } from "../Interfaces/Responses/Auth/ILoginReponse";
import { IResponse } from "../Interfaces/Base/IResponse";
import { ILoginRequest } from "../Interfaces/Request/Auth/ILoginRequest";
import { ILoginGoogleRequest } from "../Interfaces/Request/Auth/ILoginGoogleRequest";
import { ILoginTwitterRequest } from "../Interfaces/Request/Auth/ILoginTwitterRequest";
import { ILoginFacebookRequest } from "../Interfaces/Request/Auth/ILoginFacebookRequest";

export interface IAuthAPI {
  login(body: ILoginRequest): Promise<AxiosResponse<IResponse<ILoginReponse>>>;
}

class AuthAPI implements IAuthAPI {
  async login(body: ILoginRequest): Promise<AxiosResponse<IResponse<ILoginReponse>>> {
    const axios = await Http.axios();
    return axios.post<IResponse<ILoginReponse>>('/Auth/login', body);
  }

  async loginAsGoogle(body: ILoginGoogleRequest): Promise<AxiosResponse<IResponse<ILoginReponse>>>{
    const axios = await Http.axios();
    return axios.post<IResponse<ILoginReponse>>('/Auth/login-google', body);
  }

  async loginAsFacebook(body: ILoginFacebookRequest): Promise<AxiosResponse<IResponse<ILoginReponse>>>{
    const axios = await Http.axios();
    return axios.post<IResponse<ILoginReponse>>('/Auth/login-facebook', body);
  }

  async loginAsTwitter(body: ILoginTwitterRequest): Promise<AxiosResponse<IResponse<ILoginReponse>>>{
    const axios = await Http.axios();
    return axios.post<IResponse<ILoginReponse>>('/Auth/login-twitter', body);
  }
}

const instance = new AuthAPI();

export default instance;
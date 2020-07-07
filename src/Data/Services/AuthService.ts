import { AxiosResponse } from "axios";
import { Http } from "../../Utils/Http";
import { ILoginReponse } from "../Interfaces/Responses/Auth/ILoginReponse";
import { IResponse } from "../Interfaces/Base/IResponse";
import { ILoginRequest } from "../Interfaces/Request/Auth/ILoginRequest";

export interface IAuthAPI {
  login(body: ILoginRequest): Promise<AxiosResponse<IResponse<ILoginReponse>>>;
}

class AuthAPI implements IAuthAPI {
  async login(body: ILoginRequest): Promise<AxiosResponse<IResponse<ILoginReponse>>> {
    const axios = await Http.axios();
    return axios.post<IResponse<ILoginReponse>>('/Auth/login', body);
  }
}

const instance = new AuthAPI();

export default instance;
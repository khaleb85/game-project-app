import axios, { AxiosInstance } from 'axios';
import { IncomingHttpHeaders } from 'http';
import { API_BASE_URL } from 'react-native-dotenv';

export class Http {
  static async axios(): Promise<AxiosInstance> {
    let headers: IncomingHttpHeaders = {
      'content-type': 'application/json'
    };

    const timeout = 120 * 1000;

    const instance = axios.create({
      headers,
      timeout: timeout,
      baseURL: `${API_BASE_URL}`
    });
    
    return instance;
  }
}

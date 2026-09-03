import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { SOCIAL_NETWORK_ERROR } from '../error';
@Injectable()
export class GoogleTokenService {
  constructor() {}

  //get google profile
  async getGoogleUserInformation(accessToken: string) {
    try {
      const url = `https://www.googleapis.com/oauth2/v2/userinfo`;
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(url, config);

      if (!response.data) {
        const { code, message } =
          SOCIAL_NETWORK_ERROR.GET_PROFILE_SOCIAL_NETWORK_FAILED;
        throw new NotFoundException(message, { description: code });
      }

      return response.data;
    } catch (e) {
      throw e;
    }
  }
}

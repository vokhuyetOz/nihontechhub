import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { GetFacebookInformationDTO } from '../dto';
import { SOCIAL_NETWORK_ERROR } from '../error';

@Injectable()
export class FacebookTokenService {
  constructor(private readonly configService: ConfigService) {}

  async getLongLifeUserFacebookToken(token: string) {
    try {
      const apiUrl = 'https://graph.facebook.com/v19.0/oauth/access_token';
      const params = {
        client_id: `${this.configService.get('cfg.facebook.clientId')}`,
        client_secret: `${this.configService.get('cfg.facebook.clientSecret')}`,
        grant_type: 'fb_exchange_token',
        fb_exchange_token: token,
      };
      const response: AxiosResponse<any> = await axios.get(apiUrl, {
        params,
      });
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  //get facebook profile
  async getFacebookUserInformation(body: GetFacebookInformationDTO) {
    try {
      const { user_id, token } = body;
      const apiUrl = `https://graph.facebook.com/${user_id}`;
      const params = {
        fields: 'id,name,email,picture',
        access_token: token,
      };

      const getInformation = await axios.get(apiUrl, { params });
      if (!getInformation) {
        const { code, message } =
          SOCIAL_NETWORK_ERROR.GET_PROFILE_SOCIAL_NETWORK_FAILED;
        throw new NotFoundException(message, { description: code });
      }
      return getInformation.data;
    } catch (e) {
      throw e;
    }
  }
}

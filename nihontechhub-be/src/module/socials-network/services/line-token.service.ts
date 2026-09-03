import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { GetLineInformationDTO } from 'src/module/socials-network/dto/get-line-information.dto';
import { SOCIAL_NETWORK_ERROR } from '../error';
@Injectable()
export class LineTokenService {
  constructor() {}

  //get line profile
  async getLineUserInformation(body: GetLineInformationDTO) {
    try {
      const params = new URLSearchParams();
      params.append('id_token', body?.id_token);
      params.append('client_id', body?.client_id);

      const url = `https://api.line.me/oauth2/v2.1/verify`;
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const getInformation = await axios.post(url, params, config);

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

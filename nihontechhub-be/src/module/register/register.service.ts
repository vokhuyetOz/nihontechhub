import { Injectable } from '@nestjs/common';
import { AppleRegisterDTO } from '../login/dto/apple-register.dto';
import { FacebookRegisterDTO } from '../login/dto/facebook-register.dto';
import { LineRegisterDTO } from '../login/dto/line-register.dto';
import { LoginService } from '../login/login.service';
import { AppleTokenService } from '../socials-network/services/apple-token.service';
import { FacebookTokenService } from '../socials-network/services/facebook-token.service';
import { LineTokenService } from '../socials-network/services/line-token.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { VerifyAccountService } from '../verify-account/verify-account.service';
import { RegisterWithEmailPassWordDTO } from './dto/register-email-password.dto';
import { EAuthProvider } from 'src/common/enums';
import { EntityManager, Transactional } from '@mikro-orm/core';
import { GoogleTokenService } from '@module/socials-network/services/google-token.service';
import { GoogleRegisterDTO } from '@module/login/dto/google-register.dto';

@Injectable()
export class RegisterService {
  constructor(
    private readonly userService: UserService,
    private readonly verifyService: VerifyAccountService,
    private readonly loginService: LoginService,
    private readonly facebookTokenService: FacebookTokenService,
    private readonly appleTokenService: AppleTokenService,
    private readonly lineTokenService: LineTokenService,
    private readonly googleTokenService: GoogleTokenService,
    private readonly em: EntityManager,
  ) {}

  //register default user
  @Transactional()
  async registerWithEmailPassword(dto: RegisterWithEmailPassWordDTO): Promise<{
    user: User;
    otp: string;
  }> {
    const user = await this.userService.createOne(dto);

    const verifyAccount = await this.verifyService.saveVerifyAccountOtp(user);

    return { user, otp: verifyAccount.otp };
  }

  //find or create user with login or register with social network
  async getDetailsOrCreateUserWithLoginBySocialNetwork(
    id_social_network: string,
    provider: EAuthProvider,
    email: string,
  ): Promise<User> {
    let user: User;
    if (email) {
      user = await this.userService.getDetailsUserIfExistAndValidateProvider(
        { filter: [{ field: 'email', operator: '$eq', value: email }] },
        provider,
      );
    }

    if (!email && id_social_network) {
      user = await this.userService.getDetailsUserIfExistAndValidateProvider(
        {
          filter: [
            {
              field: 'idSocialNetwork',
              operator: '$eq',
              value: id_social_network,
            },
          ],
        },
        provider,
      );
    }

    if (!user) {
      user = await this.userService.createOne({
        email,
        active: true,
        provider,
        idSocialNetwork: id_social_network,
      });
    }
    return user;
  }

  ////register with facebook
  async registerWithFacebook(dto: FacebookRegisterDTO) {
    const provider = EAuthProvider.FACEBOOK;
    const { deviceId, facebookUserId, token } = dto;

    //contact to facebook to get long life token facebook
    const longLifeToken =
      await this.facebookTokenService.getLongLifeUserFacebookToken(token);

    //contact to facebook for get profile facebook
    const informationFacebook =
      await this.facebookTokenService.getFacebookUserInformation({
        user_id: facebookUserId,
        token: longLifeToken?.access_token,
      });

    //create facebook user or get user if user exist

    const user = await this.getDetailsOrCreateUserWithLoginBySocialNetwork(
      informationFacebook?.id,
      provider,
      informationFacebook?.email,
    );

    const result = await this.loginService.createTokenForLoginWithSocials(
      user,
      deviceId,
    );
    return result;
  }

  //register with line
  async registerWithLine(dto: LineRegisterDTO) {
    const provider = EAuthProvider.LINE;

    const { id_token, client_id, deviceId } = dto;
    //get profile line
    const profileLine = await this.lineTokenService.getLineUserInformation({
      id_token,
      client_id,
    });

    const user = await this.getDetailsOrCreateUserWithLoginBySocialNetwork(
      profileLine?.sub,
      provider,
      profileLine?.email,
    );

    const result = await this.loginService.createTokenForLoginWithSocials(
      user,
      deviceId,
    );
    return result;
  }

  //register with apple_id
  async registerWithApple(dto: AppleRegisterDTO) {
    const provider = EAuthProvider.APPLE;

    //get profile apple
    const { id_token, deviceId } = dto;

    const appleIdInformation: any =
      await this.appleTokenService.getClaimsFromAppleIDToken(id_token);

    //create apple user or get user
    const user = await this.getDetailsOrCreateUserWithLoginBySocialNetwork(
      appleIdInformation?.sub,
      provider,
      appleIdInformation?.email,
    );

    const result = await this.loginService.createTokenForLoginWithSocials(
      user,
      deviceId,
    );
    return result;
  }

  async registerWithGoogle(dto: GoogleRegisterDTO) {
    const provider = EAuthProvider.GOOGLE;

    const { token, deviceId } = dto;

    const profileGoogle =
      await this.googleTokenService.getGoogleUserInformation(token);

    const user = await this.getDetailsOrCreateUserWithLoginBySocialNetwork(
      profileGoogle?.id,
      provider,
      profileGoogle?.email,
    );

    const result = await this.loginService.createTokenForLoginWithSocials(
      user,
      deviceId,
    );

    return result;
  }
}

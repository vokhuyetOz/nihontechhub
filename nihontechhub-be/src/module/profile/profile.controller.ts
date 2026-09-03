import { CurrentAuthor } from '@common/decorators';
import { AccessRole } from '@common/decorators/role.decorator';
import { EAuthorRole } from '@common/enums';
import { AuthorHelper, SwaggerHelper } from '@common/helper';
import { TAuthor, TCustomCrudRequest } from '@common/types';
import { ParsedRequest } from '@dataui/crud';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { CreateProfileDTO } from './dto/create-profile.dto';

@ApiTags('Profile')
@Controller({
  version: '1',
  path: 'profile',
})
export class ProfileController {
  constructor(private readonly service: ProfileService) {
    SwaggerHelper.BaseQueryParamsMetadata(Profile, this.getProfileMe);
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.USER)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getProfileMe(
    @ParsedRequest() req: TCustomCrudRequest<Profile>,
    @CurrentAuthor() author: TAuthor,
  ) {
    const { parsed } = req;
    const field = AuthorHelper.getFieldAuthor(author);
    parsed.filter = [
      {
        field,
        operator: 'eq',
        value: author.id,
      },
    ];
    const profile = await this.service.getOne(parsed);
    return profile;
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.USER)
  @Post()
  @HttpCode(HttpStatus.OK)
  async createProfileUser(
    @CurrentAuthor() author: TAuthor,
    @Body() dto: CreateProfileDTO,
  ) {
    const profileExist = await this.service.getOne({
      filter: [
        {
          field: AuthorHelper.getFieldAuthor(author),
          operator: 'eq',
          value: author.id,
        },
      ],
    });
    if (profileExist) {
      throw new BadRequestException('Profile already exists');
    }
    const profile = await this.service.createOne({
      ...dto,
      ...AuthorHelper.getAddRelation(author),
    });
    return profile;
  }

  @ApiBearerAuth()
  @AccessRole(EAuthorRole.USER)
  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateProfileMe(
    @CurrentAuthor() author: TAuthor,
    @Body() dto: UpdateProfileDTO,
  ) {
    const field = AuthorHelper.getFieldAuthor(author);
    const profile = await this.service.updateOne(
      {
        filter: [
          {
            field,
            operator: 'eq',
            value: author.id,
          },
        ],
      },
      dto,
    );
    return profile;
  }

  // @ApiBearerAuth()
  // @AccessRole(EAuthorRole.USER)
  // @Delete('me')
  // @HttpCode(HttpStatus.OK)
  // async deleteProfileMe(@CurrentAuthor() author: TAuthor) {
  //   const field = AuthorHelper.getFieldAuthor(author);
  //   const filter = [
  //     {
  //       field,
  //       operator: 'eq',
  //       value: author.id,
  //     },
  //   ];
  //   await this.service.softDelete(filter);
  //   return { message: 'Profile deleted successfully' };
  // }
}

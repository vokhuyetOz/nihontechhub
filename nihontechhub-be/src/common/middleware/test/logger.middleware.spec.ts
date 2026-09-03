import { DateHelper } from 'src/common/helper';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RequestMiddleware } from '../logger.middleware';

jest.mock('./common/utils', () => ({
  currentDate: jest.fn(),
}));

describe('RequestMiddleware', () => {
  let middleware: RequestMiddleware;
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestMiddleware],
    }).compile();

    middleware = module.get<RequestMiddleware>(RequestMiddleware);
    mockRequest = {
      method: 'GET',
      hostname: 'localhost',
      originalUrl: '/test',
    };
    mockResponse = {};
    mockNext = jest.fn();
    jest.spyOn(Logger, 'log').mockImplementation(() => {});
  });

  it('should log the request details', () => {
    const mockDate = DateHelper.currentDate();
    (DateHelper.currentDate as jest.Mock).mockReturnValue(mockDate);

    middleware.use(mockRequest, mockResponse, mockNext);

    expect(Logger.log).toHaveBeenCalledWith(
      `GET localhost/test at ${mockDate.toISOString()}`,
    );
    expect(mockNext).toHaveBeenCalled();
  });
});

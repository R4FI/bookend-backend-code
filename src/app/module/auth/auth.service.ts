import httpStatus from 'http-status';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwt.helper';
import ApiError from '../../../errors/apiError';
import { User } from '../user/user.model';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token
  const { email: userEmail, name } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userEmail, name },
    config.jwt.secret as Secret,
    config.jwt.jwt_expires_in as string,
  );
  const loginResponse: ILoginUserResponse = {
    name,
    email: userEmail,
    accessToken,
  };
  return loginResponse;
};

export const AuthService = {
  loginUser,
};

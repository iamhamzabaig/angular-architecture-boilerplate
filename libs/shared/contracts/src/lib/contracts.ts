export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface SessionUserDto {
  id: string;
  displayName: string;
  email: string;
}

export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface LoginResponseDto {
  user: SessionUserDto;
  tokens: AuthTokensDto;
}

export interface UserSessionViewModel {
  user: SessionUserDto;
  tokens: AuthTokensDto;
}

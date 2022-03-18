export interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface GameDetails {
  name: string;
  views: number;
  lastUpdatedAt: Date;
}

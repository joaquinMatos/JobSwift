export interface AuthResponse {
    body: {
      accessToken: string;
    };
  }
  export interface AuthResponseError {
    body: {
      error: string;
    };
  }
  
  export interface User {
    _id: string;
    name: string;
    username: string;
  }
  
  export interface AccessTokenResponse {
    statusCode: number;
    body: {
      accessToken: string;
    };
    error?: string;
  }
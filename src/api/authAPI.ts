import BaseAPI from './baseAPI.ts';

export interface ISignInData {
  login: string;
  password: string;
}

export interface ISignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}


export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signin(data: ISignInData) {
    return this.http.post('/signin', data);
  }

  signup(data: ISignUpData): Promise<{ id: number }> {
    return this.http.post('/signup', data);
  }

  getUser(): Promise<IUser> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }
}

export default new AuthAPI();

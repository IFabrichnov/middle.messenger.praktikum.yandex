import BaseAPI from './baseAPI.ts';

export interface EditProfile {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface EditPassword {
  oldPassword: string;
  newPassword: string;
}

export class UsersApi extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeProfile(data: EditProfile) {
    return this.http.put('/profile', data);
  }

  changeAvatar(data: FormData) {
    return this.http.put('/profile/avatar', data);
  }

  changePassword(data: EditPassword) {
    return this.http.put('/password', data);
  }
}

export default new UsersApi();
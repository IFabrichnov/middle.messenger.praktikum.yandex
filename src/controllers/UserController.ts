import store from '../utils/Store.ts';
import UsersApi from '../api/userAPI.ts';
import { EditPassword, EditProfile } from '../api/userAPI.ts';

export class UsersController {
  private readonly api: typeof UsersApi;

  constructor() {
    this.api = UsersApi;
  }

  async editProfile(data: EditProfile) {
    try {
      const user = await this.api.changeProfile(data);
      store.set('user', user);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async editAvatar(data: FormData) {
    try {
      const user = await this.api.changeAvatar(data);
      store.set('user', user);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async editPassword(data: EditPassword) {
    try {
      await this.api.changePassword(data);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new UsersController();

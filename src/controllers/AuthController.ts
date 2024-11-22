import router from '../utils/router/router.ts';
import store from '../utils/Store';
import AuthAPI, { ISignInData, ISignUpData } from '../api/authAPI.ts';


export class AuthController {
  private readonly api: typeof AuthAPI;

  constructor() {
    this.api = AuthAPI;
  }

  async signin(data: ISignInData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();

      router.go('/messenger');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async signup(data: ISignUpData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go('/messenger');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.getUser();
    store.set('user', user);
  }


  async logout() {
    try {
      await this.api.logout();

      router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();

import { expect } from 'chai';
import sinon from 'sinon';
import esmock from 'esmock';
import authController from './AuthController.ts';

const mockFunctions = {
  signin: sinon.fake(),
  signup: sinon.fake(),
  logout: sinon.fake(),
  getuser: sinon.fake(),
  set: sinon.fake(),
  go: sinon.fake(),
  closeAll: sinon.fake(),
};

let AuthController: typeof authController;

describe('AuthController', async () => {
  beforeEach(async () => {
    AuthController = (await esmock('./AuthController', {
      '../../api/authApi.ts': {
        default: new class {
          getUser = mockFunctions.getuser;

          signin = mockFunctions.signin;

          signup = mockFunctions.signup;

          logout = mockFunctions.logout;
        }(),
      },
      '../../utils/Store.ts': {
        default: new class {
          set = mockFunctions.set;
        }(),
      },
      '../../utils/router/router.ts': {
        default: new class {
          go = mockFunctions.go;
        }(),
      },
      '../MessageController.ts': {
        default: new class {
          closeAll = mockFunctions.closeAll;
        }(),
      },
    })).default;
  });

  describe('.fetchUser()', () => {
    it('should invoke the APIs read() method', async () => {
      await AuthController.fetchUser();

      expect(mockFunctions.getuser.called).to.be.true;
    });

    it('should save user information in the store', async () => {
      await AuthController.fetchUser();

      expect(mockFunctions.set.lastCall.firstArg).to.eq('user');
    });
  });

  describe('.signin()', () => {
    it('should navigate to the /messenger route', async () => {
      await AuthController.signin({
        login: 'loginTest',
        password: 'passwordTest',
      });

      expect(mockFunctions.go.lastCall.firstArg).to.eq('/messenger');
    });

    it('should call the signin() method from the API', async () => {
      await AuthController.signin({
        login: 'loginTest',
        password: 'passwordTest',
      });

      expect(mockFunctions.signin.called).to.be.true;
    });
  });

  describe('.signup()', () => {
    it('should navigate to the /messenger route', async () => {
      await AuthController.signup({
        login: 'loginTest',
        password: 'passwordTest',
        email: 'emailTest',
        first_name: 'firstNameTest',
        second_name: 'secondNameTest',
        phone: 'phoneTest',
      });

      expect(mockFunctions.go.lastCall.firstArg).to.eq('/messenger');
    });

    it('should trigger the APIs signup() method', async () => {
      await AuthController.signup({
        login: 'loginTest',
        password: 'passwordTest',
        email: 'emailTest',
        first_name: 'firstNameTest',
        second_name: 'secondNameTest',
        phone: 'phoneTest',
      });

      expect(mockFunctions.signup.called).to.be.true;
    });
  });

  describe('.logout()', () => {
    it('should call the MessageControllers closeAll() method', () => {
      AuthController.logout();

      expect(mockFunctions.closeAll.called).to.be.true;
    });

    it('should invoke the APIs logout() method', () => {
      AuthController.logout();

      expect(mockFunctions.logout.called).to.be.true;
    });

    it('should redirect to the homepage', () => {
      AuthController.logout();

      expect(mockFunctions.go.lastCall.firstArg).to.eq('/');
    });
  });
});


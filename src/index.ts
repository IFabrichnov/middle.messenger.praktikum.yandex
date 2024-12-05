import Router from '../src/utils/router/router.ts';
import LoginPage from '../src/pages/login/LoginPage.ts';
import RegisterPage from '../src/pages/register/RegisterPage.ts';
import ProfilePage from '../src/pages/profile/ProfilePage.ts';
import ProfileSettings from './pages/profileSettings/ProfileSettings.ts';
import Chat from '../src/pages/chat/Chat.ts';
import AuthController from './controllers/AuthController/AuthController.ts';

const enum Route {
  Login = '/',
  Signup = '/sign-up',
  Messenger = '/messenger',
  Settings = '/settings',
  Profile = '/profile',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Route.Login, LoginPage)
    .use(Route.Signup, RegisterPage)
    .use(Route.Messenger, Chat)
    .use(Route.Settings, ProfileSettings)
    .use(Route.Profile, ProfilePage)

  let isProtect = false;
  let isAuth = false;

  switch (window.location.pathname) {
    case Route.Messenger:
    case Route.Profile:
    case Route.Settings:

      isProtect = true;
      break;
  }

  switch (window.location.pathname) {
    case Route.Login:
    case Route.Signup:

      isAuth = true;
  }

  try {
    await AuthController.fetchUser();

    Router.start();
    if (isAuth) {
      Router.go(Route.Messenger);
    }
  } catch (e) {
    Router.start();
    if (isProtect) {
      Router.go(Route.Login);
    }
  }
});

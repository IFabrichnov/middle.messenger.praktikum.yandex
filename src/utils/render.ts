import Page404 from '../pages/Page404/Page404.ts';
import LoginPage from '../pages/login/LoginPage.ts';
import Navbar from '../pages/Navbar/Navbar.ts';
import Page500 from '../pages/Page500/Page500.ts';
import RegisterPage from '../pages/register/RegisterPage.ts';
import ProfilePage from '../pages/profile/ProfilePage.ts';
import ProfileSettings from '../pages/profileSettings/ProfileSettings.ts';
import Chat from "../pages/chat/Chat.ts";

const ROUTES = {
  main: Navbar,
  login: LoginPage,
  profile: ProfilePage,
  profileSettings: ProfileSettings,
  register: RegisterPage,
  chat: Chat,
  page500: Page500
};

export default function render(name: keyof typeof ROUTES) {
  const root = document.querySelector('#app')!;

  root.innerHTML = '';

  const Page = ROUTES[name];

  let page;
  if (Page) {
    if (name === 'page500') {
      page = new Page500({ errorCode: '500', errorMessage: 'Мы уже фиксим' });
    } else {
      page = new Page({});
    }
  } else {
    page = new Page404({ errorCode: '404', errorMessage: 'Не туда попали' });
  }

  root.append(page.getContent()!);
  page.dispatchComponentDidMount();
}

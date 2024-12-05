import template from './profilePage.hbs';
import Block from '../../utils/Block.ts';
import Ref from '../../components/Ref/Ref.ts';
import ProfileField from '../../components/ProfileField/ProfileField.ts';
import '../../pages/profile/profilePage.pcss';
import AuthController from '../../controllers/AuthController/AuthController.ts';
import { BlockProps } from '../../types/blockProps.ts';
import { IUser } from '../../api/authAPI.ts';
import { componentWithStore } from '../../utils/Store.ts';

interface IProps extends BlockProps{
  user: IUser;
}

const profileData = {
  id: 'ID',
  first_name: 'Имя',
  second_name: 'Фамилия',
  login: 'Логин',
  display_name: 'Имя в чате',
  email: 'Почта',
  phone: 'Телефон',
};

class ProfilePage extends Block {
  constructor(props: IProps) {
    super({
      avatar: props.user?.avatar,
      userName: props.user?.login,
      Ref: new Ref({
        className: 'back-profile-button',
        Content: '<img src="../back-profile-button.png" alt="Назад"/>',
        href: '/messenger',
      }),
      ProfileFields: Object.entries(profileData).map(([key, value]) => new ProfileField({
        label: value,
        value: props.user && props.user[key as keyof IUser] ? props.user[key as keyof IUser].toString() : 'Нет данных',
      })),
      SettingsRef: new Ref({
        Content: 'Изменить данные',
        className: 'profile-link',
        href: '/settings',
      }),
      ExitRef: new Ref({
        Content: 'Выйти',
        className: 'profile-link error-link',
        onClick: () => {
          AuthController.logout();
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const userStore = componentWithStore((state) => ({ user: state.user }));
export default userStore(ProfilePage);

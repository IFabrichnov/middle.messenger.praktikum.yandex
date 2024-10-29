import template from './profilePage.hbs';
import Block from '../../utils/Block.ts';
import Ref from '../../components/Ref/Ref.ts';
import render from '../../utils/render.ts';
import ProfileField from '../../components/ProfileField/ProfileField.ts';
import '../../pages/profile/profilePage.pcss';

export default class ProfilePage extends Block {
  constructor() {
    super({
      Ref: new Ref({
        className: 'back-profile-button',
        Content: '<img src="../back-profile-button.png" alt="Назад"/>',
        onClick: () => {
          render('main');
        },
      }),
      ProfileFields: [
         new ProfileField({
          label: 'Почта',
          value: 'ifabrichnov@yandex.ru',
          name: 'email',
        }),
         new ProfileField({
          label: 'Логин',
          value: 'woodyh92',
          name: 'login',
        }),
         new ProfileField({
          label: 'Имя',
          value: 'Иван',
          name: 'first_name',
        }),
         new ProfileField({
          label: 'Фамилия',
          value: 'Фабричнов',
          name: 'second_name',
        }),
        new ProfileField({
          label: 'Имя в чате',
          value: 'woodyh92',
          name: 'display_name',
        }),
        new ProfileField({
          label: 'Телефон',
          value: '+7 (999) 999 99 99',
          name: 'phone',
        }),
      ],
      SettingsRefs: [
        new Ref({
          Content: 'Изменить пароль',
          className: 'profile-link',
          onClick: () => {
            render('register');
          },
        }),
        new Ref({
          Content: 'Изменить данные',
          className: 'profile-link',
          onClick: () => {
            render('register');
          },
        }),
      ],
      ExitRef: new Ref({
        Content: 'Выйти',
        className: 'profile-link error-link',
        onClick: () => {
          render('main');
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

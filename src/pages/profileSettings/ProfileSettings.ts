import Block from '../../utils/Block.ts';
import render from '../../utils/render.ts';
import template from './profileSettings.hbs';
import Button from '../../components/Button/Button.ts';
import Ref from '../../components/Ref/Ref.ts';
import FormField from '../../components/FormField/FormField.ts';
import './profileSettings.pcss';
import {
  validatorEmail,
  validatorFirstName,
  validatorLogin,
  validatorPassword, validatorPhone,
  validatorSecondName
} from '../../utils/validators.ts';

export default class ProfileSettings extends Block {
  constructor() {
    super(
      {
        ProfileFieldsSettings: [
          new FormField({
            label: 'Почта',
            name: 'email',
            type: 'email',
            placeholder: 'ifabrichnov@yandex.ru',
            errorText: 'Латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
            className: 'form__input_settings',
            onBlur: (event) => {
              const input = event.target as HTMLInputElement;
              const value = input.value || input.placeholder;

              if (!validatorEmail(value)) {
                this.setError('email', true);
              } else {
                this.setError('email', false);
              }
            },
          }),
          new FormField({
            label: 'Логин',
            name: 'login',
            type: 'text',
            placeholder: 'woodyh92',
            errorText: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов',
            className: 'form__input_settings',
            onBlur: (event) => {
              const input = event.target as HTMLInputElement;
              const value = input.value || input.placeholder;

              if (!validatorLogin(value)) {
                this.setError('login', true);
              } else {
                this.setError('login', false);
              }
            },
          }),
          new FormField({
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            placeholder: 'Иван',
            errorText: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
            className: 'form__input_settings',
            onBlur: (event) => {
              const input = event.target as HTMLInputElement;
              const value = input.value || input.placeholder;

              if (!validatorFirstName(value)) {
                this.setError('first_name', true);
              } else {
                this.setError('first_name', false);
              }
            },
          }),
          new FormField({
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            placeholder: 'Фабричнов',
            errorText: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов',
            className: 'form__input_settings',
            onBlur: (event) => {
              const input = event.target as HTMLInputElement;
              const value = input.value || input.placeholder;

              if (!validatorSecondName(value)) {
                this.setError('second_name', true);
              } else {
                this.setError('second_name', false);
              }
            },
          }),
          new FormField({
            label: 'Имя в чате',
            name: 'display_name',
            type: 'text',
            placeholder: 'woodyh92',
            errorText: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов',
            className: 'form__input_settings',
            onBlur: (event) => {
              const input = event.target as HTMLInputElement;
              const value = input.value || input.placeholder;

              if (!validatorLogin(value)) {
                this.setError('display_name', true);
              } else {
                this.setError('display_name', false);
              }
            },
          }),
          new FormField({
            label: 'Телефон',
            name: 'phone',
            type: 'tel',
            placeholder: '+7 (999) 999 99 99',
            errorText: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
            className: 'form__input_settings',
            onBlur: (event) => {
              const input = event.target as HTMLInputElement;
              const value = input.value || input.placeholder;

              if (!validatorPhone(value)) {
                this.setError('phone', true);
              } else {
                this.setError('phone', false);
              }
            },
          }),

        ],
        Ref: new Ref({
          className: 'back-profile-button',
          Content: '<img src="../back-profile-button.png" alt="Назад"/>',
          onClick: () => {
            render('main');
          },
        }),

        PasswordInputs: [
          new FormField({
            name: 'newPassword',
            type: 'password',
            label: 'Новый пароль',
            placeholder: '********',
            errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
            className: 'form__input_settings',
            onBlur: (event) => {
              const { value } = (event.target as HTMLInputElement);

              if (!validatorPassword(value)) {
                this.setError('newPassword', true);
              } else {
                this.setError('newPassword', false);
              }
            },
          }),
          new FormField({
            name: 'oldPassword',
            type: 'password',
            label: 'Старый пароль',
            placeholder: '********',
            errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
            className: 'form__input_settings',
            onBlur: (event) => {
              const { value } = (event.target as HTMLInputElement);

              if (!validatorPassword(value)) {
                this.setError('oldPassword', true);
              } else {
                this.setError('oldPassword', false);
              }
            },
          }),
          new FormField({
            name: 'repeatNewPassword',
            type: 'password',
            label: 'Повторите новый пароль',
            placeholder: '********',
            errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
            className: 'form__input_settings',
            onBlur: (event) => {
              const { value } = (event.target as HTMLInputElement);

              if (!validatorPassword(value)) {
                this.setError('repeatNewPassword', true);
              } else {
                this.setError('repeatNewPassword', false);
              }
            },
          }),
        ],
        Button: new Button({
          className: 'button_auth',
          type: 'submit',
          text: 'Сохранить',
        }),
        events: {
          submit: (event: Event) => {
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            const values = Object.fromEntries(formData as any);

            this.resetFormErrors();
            let validatorFailed = false;

            const validators: { [key: string]: (value: string) => boolean } = {
              email: validatorEmail,
              login: validatorLogin,
              first_name: validatorFirstName,
              second_name: validatorSecondName,
              phone: validatorPhone,
              newPassword: validatorPassword,
              oldPassword: validatorPassword,
            };

            for (const field in validators) {
              if (!validators[field](values[field])) {
                this.setError(field, true);
                validatorFailed = true;
              }
            }

            if (validatorFailed) {
              return;
            }

            console.log(values);
            render('profile');
          },
        },
      },
    );
    this.profileSettingsAvatarClickHandler();
  }

  profileSettingsAvatarClickHandler() {
    const avatarElement = this.element?.querySelector('.profile-settings-avatar');
    const fileInput = this.element?.querySelector('#avatar-upload') as HTMLInputElement;

    if (avatarElement && fileInput) {
      avatarElement.addEventListener('click', () => {
        fileInput.click();
      });
    }
  }

  setError(name: string, state: boolean) {
    const fieldIndex: { [key: string]: number } = {
      email: 0,
      login: 1,
      first_name: 2,
      second_name: 3,
      display_name: 4,
      phone: 5,
    };

    const passwordIndex: { [key: string]: number } = {
      newPassword: 0,
      oldPassword: 1,
      repeatNewPassword: 2,
    };

    if (fieldIndex[name] !== undefined) {
      (this.children.ProfileFieldsSettings as Block[])[fieldIndex[name]].setProps({ className: `form__input_settings${state ? '_error' : ''}` });
    } else if (passwordIndex[name] !== undefined) {
      (this.children.PasswordInputs as Block[])[passwordIndex[name]].setProps({ className: `form__input_settings${state ? '_error' : ''}` });
    } else {
      throw new Error(`Cannot find block ${name}`);
    }
  }

  resetFormErrors() {
    (this.children.ProfileFieldsSettings as Block[]).forEach((child) => {
      child.setProps({ class: 'form__input_settings' });
    });
    (this.children.PasswordInputs as Block[]).forEach((child) => {
      child.setProps({ class: 'form__input_settings' });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

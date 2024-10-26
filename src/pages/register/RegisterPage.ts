import Block from '../../utils/Block.ts';
import FormField from '../../components/FormField/FormField.ts';
import Ref from '../../components/Ref/Ref.ts';
import render from '../../utils/render.ts';
import Button from '../../components/Button/Button';
import template from './registerPage.hbs';
import {
  validatorEmail,
  validatorFirstName,
  validatorLogin, validatorPassword,
  validatorPhone,
  validatorSecondName
} from '../../utils/validators.ts';

export default class RegisterPage extends Block {
  constructor() {
    super({
      Ref: new Ref({
        Content: 'Вход',
        onClick: () => {
          render('login');
        },
      }),
      Button: new Button({
        type: 'submit',
        text: 'Зарегистрироваться',
        className: 'button_auth',
      }),
      Inputs: [
        new FormField({
          label: 'Почта',
          type: 'email',
          name: 'email',
          errorText: 'Латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
          className: 'form__input',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!validatorEmail(value)) {
              this.setError('email', true);
            } else {
              this.setError('email', false);
            }
          },
        }),
        new FormField({
          label: 'Логин',
          type: 'text',
          name: 'login',
          errorText: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
          className: 'form__input',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!validatorLogin(value)) {
              this.setError('login', true);
            } else {
              this.setError('login', false);
            }
          },
        }),
        new FormField({
          label: 'Имя',
          type: 'text',
          name: 'first_name',
          errorText: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
          className: 'form__input',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!validatorFirstName(value)) {
              this.setError('first_name', true);
            } else {
              this.setError('first_name', false);
            }
          },
        }),
        new FormField({
          label: 'Фамилия',
          type: 'text',
          name: 'second_name',
          errorText: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
          className: 'form__input',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!validatorSecondName(value)) {
              this.setError('second_name', true);
            } else {
              this.setError('second_name', false);
            }
          },
        }),
        new FormField({
          label: 'Телефон',
          type: 'tel',
          name: 'phone',
          errorText: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
          className: 'form__input',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!validatorPhone(value)) {
              this.setError('phone', true);
            } else {
              this.setError('phone', false);
            }
          },
        }),
        new FormField({
          label: 'Пароль',
          type: 'password',
          name: 'password',
          errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
          className: 'form__input',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!validatorPassword(value)) {
              this.setError('password', true);
            } else {
              this.setError('password', false);
            }
          },
        }),
        new FormField({
          label: 'Пароль (ещё раз)',
          type: 'password',
          name: 'password_repeat',
          errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
          className: 'form__input',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!validatorPassword(value)) {
              this.setError('password_repeat', true);
            } else {
              this.setError('password_repeat', false);
            }
          },
        }),
      ],
      events: {
        submit: (event: any) => {
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
            password: validatorPassword,
            password_repeat: validatorPassword,
          };

          for (const [field, validator] of Object.entries(validators)) {
            if (!validator(values[field])) {
              this.setError(field, true);
              validatorFailed = true;
            }
          }

          if (validatorFailed) {
            return;
          }

          console.log(values);

          render('main');
        },
      },
    });
  }

  setError(name: string, state: boolean) {
    const fieldIndex: { [key: string]: number } = {
      email: 0,
      login: 1,
      first_name: 2,
      second_name: 3,
      phone: 4,
      password: 5,
      password_repeat: 6,
    };

    const index = fieldIndex[name];

    if (index !== undefined) {
      (this.children.Inputs as Block[])[index].setProps({ className: `form__input${state ? '_error' : ''}` });
    } else {
      throw new Error(`Cannot find block ${name}`);
    }
  }

  resetFormErrors() {
    (this.children.Inputs as Block[]).forEach((child) => {
      child.setProps({ className: 'form__input' });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
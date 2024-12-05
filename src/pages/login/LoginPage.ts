import Button from '../../components/Button/Button';
import FormField from '../../components/FormField/FormField.ts';
import './loginPage.pcss';
import template from './loginPage.hbs';
import Ref from '../../components/Ref/Ref.ts';
import Block from '../../utils/Block.ts';
import { validatorLogin, validatorPassword } from '../../utils/validators.ts';
import AuthController from '../../controllers/AuthController/AuthController.ts';
import { ISignInData } from '../../api/authAPI.ts';

export default class LoginPage extends Block {
  constructor() {
    super({
      Inputs: [
        new FormField({
          label: 'Логин',
          type: 'text',
          name: 'login',
          className: 'form__input',
          errorText: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов',
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
          label: 'Пароль',
          type: 'password',
          name: 'password',
          className: 'form__input',
          errorText: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
          onBlur: (event) => {
            const { value } = (event.target as HTMLInputElement);

            if (!validatorPassword(value)) {
              this.setError('password', true);
            } else {
              this.setError('password', false);
            }
          },
        }),
      ],
      Button: new Button({
        className: 'button_auth',
        type: 'submit',
        text: 'Авторизоваться',
      }),
      Ref: new Ref({
        className: 'ref ref_center',
        Content: 'Нет аккаунта?',
        href: '/sign-up',
      }),
      events: {
        submit: (event: any) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const values = Object.fromEntries(formData as any);

          this.resetFormErrors();
          let validatorFailed = false;

          const validators: { [key: string]: (value: string) => boolean } = {
            login: validatorLogin,
            password: validatorPassword,
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
          AuthController.signin(values as ISignInData);
        },
      },
    });
  }

  setError(name: string, state: boolean) {
    const fieldIndex: { [key: string]: number } = {
      login: 0,
      password: 1,
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

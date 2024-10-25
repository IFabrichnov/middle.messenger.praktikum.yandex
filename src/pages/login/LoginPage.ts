import Button from '../../components/Button/Button';
import FormField from '../../components/FormField/FormField.ts';
import './loginPage.pcss';
import template from './loginPage.hbs';
import Ref from '../../components/Ref/Ref.ts';
import Block from '../../utils/Block.ts';
import render from '../../utils/render.ts';

export default class LoginPage extends Block {
  constructor() {
    super({
      Inputs: [
        new FormField({
          label: 'Логин',
          type: 'text',
          name: 'login',
          className: 'form__input',
        }),
        new FormField({
          label: 'Пароль',
          type: 'password',
          name: 'password',
          className: 'form__input',
        }),
      ],
      Button: new Button({
        className: 'button_auth',
        type: 'submit',
        text: 'Авторизоваться',
      }),
      Ref: new Ref({
        Content: 'Нет аккаунта?',
        onClick: () => {
          render('page500');
        },
      }),
      events: {
        submit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const values = Object.fromEntries(formData as any);

          this.resetFormErrors();

          console.log(values);

          render('main');
        },
      },
    });
  }

  setError(name: string, state: boolean) {
    switch (name) {
      case 'login':
        (this.children.Inputs as Block[])[0].setProps({ class: `form__input${state ? '_error' : ''}` });
        break;
      case 'password':
        (this.children.Inputs as Block[])[1].setProps({ class: `form__input${state ? '_error' : ''}` });
        break;
      default:
        throw new Error(`Cannot find block ${name}`);
    }
  }

  resetFormErrors() {
    (this.children.Inputs as Block[]).forEach((child) => {
      child.setProps({ class: 'form__input' });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
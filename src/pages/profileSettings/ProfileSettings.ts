import Block from '../../utils/Block.ts';
import template from './profileSettings.hbs';
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
import { BlockProps } from '../../types/blockProps.ts';
import { IUser } from '../../api/authAPI.ts';
import { componentWithStore } from '../../utils/Store.ts';
import UserController from '../../controllers/UserController.ts';
import {EditPassword, EditProfile} from '../../api/userAPI.ts';
import ProfileSettingsForm from "../../components/ProfileSettingsForm/ProfileSettingsForm.ts";

interface IProps extends BlockProps {
  user: IUser;
}

class ProfileSettings extends Block  {
  constructor(props: IProps)  {
    super(
      {
        avatar: props.user?.avatar,

        ProfileSettings: new ProfileSettingsForm({
          headerText: 'Изменить данные',
          Inputs: [
            new FormField({
              label: 'Почта',
              name: 'email',
              type: 'email',
              placeholder: props.user.email,
              value: props.user.email,
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
              placeholder: props.user.login,
              value: props.user.login,
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
              placeholder: props.user.first_name,
              value: props.user.first_name,
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
              placeholder: props.user.second_name,
              value: props.user.second_name,
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
              placeholder: props.user.display_name,
              value: props.user.display_name,
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
              placeholder: props.user.phone,
              value: props.user.phone,
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
          ButtonText: 'Изменить данные',
          onSubmit: (event) => {
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

            if (!validatorFailed) {
              UserController.editProfile(values as EditProfile);
            }
          },
        }),

        Ref: new Ref({
          className: 'back-profile-button',
          Content: '<img src="../back-profile-button.png" alt="Назад"/>',
          href: '/profile'
        }),

        PasswordForm: new ProfileSettingsForm({
          headerText: 'Сменить пароль',
          Inputs: [
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
          ],
          ButtonText: 'Изменить пароль',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);
            const values = Object.fromEntries(formData as any);

            this.resetFormErrors();
            let failedChecks = false;
            if (!validatorPassword(values.newPassword)) {
              this.setError('newPassword', true);
              failedChecks = true;
            }
            if (!validatorPassword(values.oldPassword)) {
              this.setError('oldPassword', true);
              failedChecks = true;
            }

            if (!failedChecks) {
              UserController.editPassword(values as EditPassword).then(() => {
                this.clearPasswordForm();
              });
            }
          },
        }),
      },
    );
    this.profileSettingsAvatarClickHandler();
  }

  protected componentDidUpdate(oldProps: IProps, newProps: IProps) {
    return super.componentDidUpdate(oldProps, newProps);
  }

  profileSettingsAvatarClickHandler() {
    const avatarElement = this.element?.querySelector('.profile-settings-avatar');
    const fileInput = this.element?.querySelector('#avatar-upload') as HTMLInputElement;

    if (avatarElement && fileInput) {
      avatarElement.addEventListener('click', () => {
        fileInput.click();
      });

      fileInput.addEventListener('change', async (event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];

        if (file) {
          const formData = new FormData();
          formData.append('avatar', file);

          try {
            await UserController.editAvatar(formData);

            console.log('Avatar updated successfully!');
          } catch (e) {
            console.error('Error uploading avatar:', e);
          }
        }
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
      oldPassword: 0,
      newPassword: 1,
    };

    const updateFieldError = (fields: FormField[], index: number) => {
      if (!fields || fields.length <= index || !fields[index]) {
        console.error(`Field at index ${index} is undefined. fields length: ${fields.length}`);
        return;
      }
      fields[index].setProps({
        className: `form__input_settings${state ? '_error' : ''}`,
      });
    };

    if (fieldIndex[name] !== undefined) {
      const profileSettings = this.children.ProfileSettings as ProfileSettingsForm;
      const inputFields = profileSettings?.children?.Inputs as FormField[];

      updateFieldError(inputFields, fieldIndex[name]);
    } else if (passwordIndex[name] !== undefined) {
      const passwordForm = this.children.PasswordForm as ProfileSettingsForm;
      const passwordInputs = passwordForm?.children?.Inputs as FormField[];

      updateFieldError(passwordInputs, passwordIndex[name]);
    } else {
      throw new Error(`Cannot find block ${name}`);
    }
  }




  resetFormErrors() {
    const resetFields = (fields: FormField[]) => {
      if (!fields || fields.length === 0) return;
      fields.forEach((field) => {
        field.setProps({ className: 'form__input_settings' });
      });
    };

    const profileSettings = this.children.ProfileSettings as ProfileSettingsForm;
    const profileFields = profileSettings?.children?.Inputs as FormField[];
    resetFields(profileFields);

    const passwordForm = this.children.PasswordForm as ProfileSettingsForm;
    const passwordFields = passwordForm?.children?.Inputs as FormField[];
    resetFields(passwordFields);
  }


  clearPasswordForm() {
    const form = this.children.PasswordForm as Block;
    const element = form.element as HTMLFormElement;
    element.reset();
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = componentWithStore((state) => ({ user: state.user }));
export default withUser(ProfileSettings);

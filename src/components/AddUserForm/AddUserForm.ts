import Block from '../../utils/Block.ts';
import Button from '../Button/Button';
import { BlockProps } from '../../types/blockProps.ts';
import FormField from '../FormField/FormField.ts';
import template from './addUserForm.hbs';

interface IProps extends BlockProps {
  onSubmit: EventListener;
}

export default class AddUserForm extends Block<IProps> {
  constructor(props: IProps) {
    super({
      NameOfIdInput: new FormField(
        {
          name: 'user_id',
          type: 'text',
          className: 'form__input',
          label: 'Напишите id пользователя',
        },
      ),
      AddUserButton: new Button({
        text: 'Добавить пользователя',
        type: 'submit',
        className: 'button_create',
      }),
      events: {
        submit: props.onSubmit,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

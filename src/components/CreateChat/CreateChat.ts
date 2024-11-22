import Block from '../../utils/Block';
import template from './createChat.hbs';
import './createChat.pcss';
import Button from '../../components/Button/Button';
import FormInput from '../../components/FormField/FormField.ts';
import { BlockProps } from '../../types/blockProps.ts';

interface IProps extends BlockProps {
  onCancel: () => void;
  onConfirm: EventListener;
}

export default class CreateChat extends Block<IProps> {
  constructor(props: IProps) {
    super(
      {
        onConfirm: props.onConfirm,
        hidden: props.hidden,
        NameOfChatInput: new FormInput(
          {
            name: 'chat_name',
            type: 'text',
            className: 'form__input',
            label: 'Название чата',
          },
        ),
        CancelButton: new Button({
          text: 'Отменить',
          onClick: props.onCancel,
          type: 'reset',
          className: 'button_delete',
        }),
        CreateChatButton: new Button({
          text: 'Создать',
          type: 'submit',
          className: 'button-create__chat',
        }),
        events: {
          submit: props.onConfirm,
        },
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}

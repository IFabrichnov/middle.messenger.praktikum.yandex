import template from './ChatMessageButtons.hbs';
import Block from '../../utils/Block.ts';
import Input from '../../components/Input/Input';
import { validatorMessage } from '../../utils/validators.ts';
import { BlockProps } from '../../types/blockProps.ts';
import './ChatMessageButtons.pcss';
import MessageController from '../../controllers/MessageController.ts';

interface IProps extends BlockProps {
  selectedChat?: number;
}
export default class ChatMessageButtons extends Block<IProps> {
  constructor() {
    super({
      Input: new Input({
        id: 'message',
        name: 'message',
        type: 'text',
        className: 'chat-message__input',
        placeholder: 'Сообщение',
      }),
      events: {
        submit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const values = Object.fromEntries(formData as any);

          if (validatorMessage(values.message) && this.props.selectedChat) {
            MessageController.sendMessage(this.props.selectedChat, values.message);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

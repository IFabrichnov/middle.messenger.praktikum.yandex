import template from './chatMessageButtons.hbs';
import Block from '../../utils/Block.ts';
import Input from '../../components/Input/Input';
import { validatorMessage } from '../../utils/validators.ts';
import './chatMessageButtons.pcss';

export default class ChatMessageButtons extends Block {
  constructor() {
    super({
      Input: new Input({
        id: 'message',
        name: 'message',
        type: 'text',
        className: 'chat-controls__input',
        placeholder: 'Сообщение',
      }),
      events: {
        submit: (event: any) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const values = Object.fromEntries(formData as any);

          if (!validatorMessage(values.message)) {
            console.log('Пустое сообщение');
            return;
          }

          console.log(values);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

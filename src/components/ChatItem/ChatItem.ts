import template from './chatItem.hbs';
import { ChatInfo } from '../../api/chatAPI.ts';
import { BlockProps } from '../../types/blockProps.ts';
import Block from '../../utils/Block.ts';
import './chatItem.pcss';

interface IProps extends BlockProps {
  chat: ChatInfo;
  onClick: EventListener;
}
function getTime(date: string) {
  const dateObj = new Date(date);
  return `${dateObj.getHours()}:${dateObj.getMinutes() < 10 ? '0' : ''}${dateObj.getMinutes()}`;
}

export default class ChatItem extends Block<IProps> {
  constructor(props: IProps) {
    super({
      lastMessageSendTime: props.chat.last_message ? getTime(props.chat.last_message.time) : null,
      ...props.chat,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

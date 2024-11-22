import template from './ChatDialog.hbs';
import Block from '../../utils/Block.ts';
import MessageBlock from '../ChatMessage/ChatMessage.ts';
import { Message } from '../../controllers/MessageController.ts';
import { BlockProps } from '../../types/blockProps.ts';
import './ChatDialog.pcss';
import { IUser } from '../../api/authAPI.ts';
import { ChatInfo } from '../../api/chatAPI.ts';
import ModalWindow from '../ModalWindow/ModalWindow.ts';
import Button from '../../components/Button/Button';
import ChatSettings from '../ChatSettings/ChatSettings';

interface IProps extends BlockProps {
  selectedChat?: ChatInfo;
  messages: Message[];
  user: IUser;
}

function getTime(date: string) {
  const dateObj = new Date(date);
  return `${dateObj.getHours()}:${dateObj.getMinutes() < 10 ? '0' : ''}${dateObj.getMinutes()}`;
}

export default class ChatDialog extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ModalWindow: new ModalWindow({
        Content: new ChatSettings({
          selectedChat: props.selectedChat,
          onCancel: () => {
            (this.children.ModalWindow as Block).setProps({ hidden: true });
          },
        }),
        onCancel: () => {
          (this.children.ModalWindow as Block).setProps({ hidden: true });
        },
        confirmText: 'Создать',
        hidden: true,
      }),
      EtcButton: new Button({
        type: 'button',
        text: '<img src="/etc.svg" alt="Еще"/>',
        className: 'chat-dialog__etc-button',
        onClick: () => {
          (this.children.ModalWindow as Block).setProps({ hidden: false });
        },
      }),
      selectedChat: props.selectedChat,
      Messages: props.messages.map((message) => {
        return new MessageBlock({
          modifier: props.user.id === message.user_id ? 'sent' : 'received',
          text: message.content,
          time: getTime(message.time),
        });
      }),
    });
  }

  protected componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    (this.children.Messages as unknown as MessageBlock[]) = newProps.messages.map((message) => {
      return new MessageBlock({
        modifier: newProps.user.id === message.user_id ? 'sent' : 'received',
        text: message.content,
        time: getTime(message.time),
      });
    });

    const element = document.getElementById('message-dialog');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

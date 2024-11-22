import template from './chatPanel.hbs';
import Block from '../../utils/Block.ts';
import ChatItem from '../../components/ChatItem/ChatItem';
import Ref from '../../components/Ref/Ref.ts';
import { ChatInfo } from '../../api/chatAPI.ts';
import Button from '../../components/Button/Button';
import CreateChat from '../CreateChat/CreateChat.ts';
import ChatController from '../../controllers/ChatController';
import { BlockProps } from '../../types/blockProps.ts';
import './chatPanel.pcss';
import ModalWindow from '../ModalWindow/ModalWindow.ts';

function chatList(chats?: ChatInfo[]) {
  if (chats) {
    return chats.map((chat) => new ChatItem({
      chat,
      onClick: () => {
        ChatController.selectChat(chat.id);
      },
    }));
  }
  return [];
}

interface IProps extends BlockProps {
  chats?: ChatInfo[];
}

export default class ChatPanel extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ModalWindow: new ModalWindow({
        Content: new CreateChat({
          onConfirm: async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const values = Object.fromEntries(formData as any);

            await ChatController.createChat(values.chat_name);
            (this.children.ModalWindow as Block).setProps({ hidden: true });
          },
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
      ChatItems: chatList(props.chats),
      CreateButton: new Button({
        text: 'Создать чат',
        className: 'button_create',
        onClick: () => {
          (this.children.ModalWindow as Block).setProps({ hidden: false });
        },
      }),
      Ref: new Ref({
        className: 'chat-link',
        Content: 'Профиль >',
        href: '/profile',
      }),
    });
  }

  componentDidUpdate(oldProps: IProps, newProps: IProps) {
    (this.children.ChatItems as unknown as ChatItem[]) = chatList(newProps.chats);
    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

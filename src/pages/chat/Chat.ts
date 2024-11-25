import template from './chat.hbs';
import Block from '../../utils/Block.ts';
import ChatPanel from '../../components/ChatPanel/ChatPanel.ts';
import ChatMessageButtons from '../../components/ChatMessageButtons/ChatMessageButtons.ts';
import ChatController from '../../controllers/ChatController';
import { componentWithStore } from '../../utils/Store';
import { ChatInfo } from '../../api/chatAPI.ts';
import ChatDialog from '../../components/ChatDialog/ChatDialog.ts';
import { Message } from '../../controllers/MessageController.ts';
import { BlockProps } from '../../types/blockProps.ts';
import './chat.pcss';
import { IUser } from '../../api/authAPI.ts';

interface IProps extends BlockProps {
  chats: ChatInfo[];
  selectedChat?: number;
  messages: Record<number, Message[]>;
  user: IUser;
}

class Chat extends Block {
  constructor(props: IProps) {
    const messages = props.selectedChat ? props.messages[props.selectedChat] : [];

    super({
      ChatPanel: new ChatPanel({ chats: props.chats }),
      ChatDialog: new ChatDialog({
        messages,
        user: props.user,
        selectedChat: props.chats?.find((chat) => chat.id === props.selectedChat),
      }),
      ChatMessageButtons: new ChatMessageButtons(),
    });
  }

  init() {
    ChatController.fetchChats();
  }

  protected componentDidUpdate(_: IProps, newProps: IProps): boolean {
    (this.children.ChatPanel as unknown as ChatPanel).setProps({ chats: newProps.chats });

    const messages = newProps.selectedChat ? newProps.messages[newProps.selectedChat] : [];
    (this.children.ChatDialog as unknown as ChatDialog).setProps({
      messages,
      user: newProps.user,
      selectedChat: newProps.chats?.find((chat) => chat.id === newProps.selectedChat),
    });

    (this.children.ChatMessageButtons as unknown as ChatMessageButtons).setProps({ selectedChat: newProps.selectedChat });

    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = componentWithStore((state) => ({
  chats: state.chats,
  selectedChat: state.selectedChat,
  user: state.user,
  messages: state.messages,
}));

export default withChats(Chat);

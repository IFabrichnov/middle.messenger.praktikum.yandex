import Block from '../../utils/Block.ts';
import template from './ChatSettings.hbs';
import { BlockProps } from '../../types/blockProps.ts';
import Button from '../../components/Button/Button';
import Ref from '../../components/Ref/Ref.ts';
import ChatController from '../../controllers/ChatController';
import './ChatSettings.pcss';
import UserGroup from '../UserGroup/UserGroup.ts';
import { IUser } from '../../api/authAPI.ts';
import AddUserForm from '../../components/AddUserForm/AddUserForm';
import { componentWithStore } from '../../utils/Store';

interface IProps extends BlockProps {
  user: IUser;
  onCancel: () => void;
  selectedChat?: number;
}

class ChatSettings extends Block<IProps> {
  constructor(props: IProps) {
    super(
      {
        hidden: props.hidden,
        AddUserForm: new AddUserForm({
          onSubmit: (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const values = Object.fromEntries(formData as any);

            ChatController.addUserToChat(this.props.selectedChat!, values.user_id);
          },
        }),
        UserGroup: new UserGroup({
          users: [],
          currentUser: props.user?.id,
          chatId: props.selectedChat!,
        }),
        DeleteChatButton: new Ref({
          onClick: () => {
            if (!this.props.selectedChat) {
              return;
            }
            ChatController.deleteChat(this.props.selectedChat).then(() => {
              props.onCancel();
            });
          },
          href: '#',
          Content: 'Удалить чат',
          className: 'button_delete',
        }),
        CloseButton: new Button({
          text: 'Закрыть',
          onClick: props.onCancel,
          type: 'button',
          className: 'button_close',
        }),
      },
    );
  }

  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    if (newProps.selectedChat) {
      ChatController.getChatUsers(newProps.selectedChat).then((users) => {
        (this.children.UserGroup as Block).setProps({
          users,
          currentUser: newProps.user.id,
          chatId: newProps.selectedChat,
        });
      });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = componentWithStore((state) => ({ user: state.user, selectedChat: state.selectedChat }));
export default withUser(ChatSettings);

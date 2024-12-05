import Block from '../../utils/Block.ts';
import template from './userGroupItem.hbs';
import { BlockProps } from '../../types/blockProps.ts';
import { IUser } from '../../api/authAPI.ts';
import Button from '../Button/Button.ts';
import ChatController from '../../controllers/ChatController.ts';
import './userGroupItem.pcss';

interface IProps extends BlockProps{
  user: IUser & { role: string };
  deletable: boolean;
  chatId: number;
}

export default class UserGroupItem extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props.user,
      deletable: props.deletable,
      DeleteButton: new Button({
        text: 'Удалить',
        className: 'button_delete',
        onClick: () => {
          ChatController.deleteUserFromChat(props.chatId, props.user.id);
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

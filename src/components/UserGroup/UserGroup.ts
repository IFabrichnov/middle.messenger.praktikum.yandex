import Block from '../../utils/Block.ts';
import template from './UserGroup.hbs';
import { BlockProps } from '../../types/blockProps.ts';
import { IUser } from '../../api/authAPI.ts';
import UserGroupItem from '../UserGroupItem/UserGroupItem.ts';
import './UserGroup.pcss';

interface IProps extends BlockProps {
  users: Array<IUser & { role: string }>;
  chatId: number;
  currentUser: number;
}

export default class UserGroup extends Block<IProps> {
  constructor(props: IProps) {
    super({
      UserGroupItems: props.users.map((user) => new UserGroupItem({
        user,
        chatId: props.chatId,
        deletable: user.id !== props.currentUser,
      })),
    });
  }

  componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
    this.children.UserGroupItems = newProps.users.map((user) => new UserGroupItem({
      user,
      chatId: newProps.chatId,
      deletable: user.id !== newProps.currentUser,
    }));
    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

import template from './chat.hbs';
import Block from '../../utils/Block.ts';
import Ref from '../../components/Ref/Ref.ts';
import render from '../../utils/render.ts';
import ChatItem from '../../components/ChatItem/ChatItem.ts';
import '../../pages/profile/profilePage.pcss';
import './chat.pcss';
import ChatMessage from '../../components/ChatMessage/ChatMessage.ts';
import ChatMessageButtons from '../../components/ChatMessageButtons/ChatMessageButtons.ts';

export default class Chat extends Block {
  constructor() {
    super({
      Ref: new Ref({
        className: 'chat-link',
        Content: 'Профиль >',
        onClick: () => {
          render('profile');
        },
      }),
      ChatMessage: new ChatMessage(),
      ChatMessageButtons: new ChatMessageButtons(),
      ChatItems: [
        new ChatItem({
          name: 'Андрей',
          text: 'Изображение',
          time: '10:49',
          count: 2
        }),
        new ChatItem({
          name: 'Киноклуб',
          text: 'Вы: стикер',
          time: '12:00',
        }),
        new ChatItem({
          name: 'Илья',
          text: 'Друзья, у меня для вас выпуск...',
          time: '15:12',
          count: 4
        }),
      ],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

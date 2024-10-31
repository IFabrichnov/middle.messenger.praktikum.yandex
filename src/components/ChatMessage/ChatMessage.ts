import Block from '../../utils/Block.ts';
import template from './chatMessage.hbs';

export default class ChatMessage extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
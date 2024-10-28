import Block from '../../utils/Block.ts';
import template from './chatItem.hbs';
import './chatItem.pcss';

interface Props {
  name: string;
  text: string;
  time: string;
  count?: number;
}

export default class ChatItem extends Block {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
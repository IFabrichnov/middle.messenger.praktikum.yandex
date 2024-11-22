import template from './chatMessage.hbs';
import Block from '../../utils/Block.ts';
import './chatMessage.pcss';
import { BlockProps } from '../../types/blockProps.ts';

interface IProps extends BlockProps{
  modifier: string;
  time: string;
  text: string;
}

export default class ChatMessage extends Block<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

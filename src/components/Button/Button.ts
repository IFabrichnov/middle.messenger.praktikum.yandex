import Block from '../../utils/Block.ts';
import template from './button.hbs';
import './button.pcss';
import { BlockProps } from "../../types/blockProps.ts";

interface IProps extends BlockProps{
  text: string;
  className?: string;
  type?: 'submit' | 'button' | 'reset';
  onClick?: EventListener;
}

export default class Button extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

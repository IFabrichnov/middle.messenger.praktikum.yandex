import Block from '../../utils/Block';
import template from './button.hbs';
import './button.pcss';

interface IProps {
  text: string;
  className?: string;
  type?: 'submit' | 'button';
  onClick?: EventListener;
}

export default class Button extends Block {
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
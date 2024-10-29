import Block from '../../utils/Block';
import './ref.pcss';
import template from './ref.hbs';

interface IProps {
  Content: string;
  onClick?: EventListener;
  className?: string;
}

export default class Ref extends Block {
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

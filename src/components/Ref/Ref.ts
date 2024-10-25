import Block from '../../utils/Block';
import './ref.pcss';
import template from './ref.hbs';

interface Props {
  Content: string;
  onClick?: EventListener;
  class?: string;
}

export default class Ref extends Block {
  constructor(props: Props) {
    super({
      className: 'ref ref_center',
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
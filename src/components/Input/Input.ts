import Block from '../../utils/Block.ts';
import template from './input.hbs';
import { BlockProps } from '../../types/blockProps.ts';

interface IProps extends BlockProps {
  id?: string;
  name: string;
  type: string;
  className?: string;
  placeholder?: string;
  onBlur?: EventListener;
  value?: string;
  accept?: string;
}

export default class Input extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

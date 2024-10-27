import template from './profileField.hbs';
import Block from '../../utils/Block.ts';

interface Props {
  label: string;
  value: string;
  name: string;
}

export default class ProfileField extends Block {
  constructor(props: Props) {
    super(
      {
        ...props,
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
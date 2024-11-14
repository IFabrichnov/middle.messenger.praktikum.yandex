import template from './profileField.hbs';
import Block from '../../utils/Block.ts';

interface IProps {
  label: string;
  value: string;
}

export default class ProfileField extends Block {
  constructor(props: IProps) {
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

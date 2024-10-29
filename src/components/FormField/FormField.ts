import Block from '../../utils/Block.ts';
import Input from '../Input/Input';
import template from './formField.hbs';
import './formField.pcss';

interface IProps {
  label: string;
  name: string;
  type: string;
  className: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  onBlur?: EventListener;
}

export default class FormField extends Block {
  constructor(props: IProps) {
    super({
      error: props.error,
      errorText: props.errorText,
      label: props.label,
      className: props.className,
      Input: new Input(
        {
          name: props.name,
          type: props.type,
          className: props.className,
          placeholder: props.placeholder,
          onBlur: props.onBlur,
        },
      ),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
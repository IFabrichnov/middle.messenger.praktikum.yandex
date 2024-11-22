import Block from '../../utils/Block.ts';
import Input from '../Input/Input';
import template from './formField.hbs';
import './formField.pcss';
import { BlockProps } from '../../types/blockProps.ts';

interface IProps extends BlockProps {
  label: string;
  name: string;
  type: string;
  className: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  onBlur?: EventListener;
  accept?: string;
  value?: string;
}

export default class FormField extends Block<IProps> {
  constructor(props: IProps) {
    super({
      error: props.error,
      errorText: props.errorText,
      label: props.label,
      className: props.className,
      Input: new Input(
        {
          value: props.value,
          accept: props.accept,
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

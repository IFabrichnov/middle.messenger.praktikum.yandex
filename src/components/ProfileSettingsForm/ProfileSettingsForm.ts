import template from './profileSettingsForm.hbs';
import Block from '../../utils/Block.ts';
import { BlockProps } from '../../types/blockProps.ts';
import Button from '../../components/Button/Button';
import FormField from '../../components/FormField/FormField.ts';
import './profileSettingsForm.pcss';

interface IProps extends BlockProps {
  headerText?: string;
  ButtonText: string;
  Inputs: FormField[];
  onSubmit: EventListener;
}

export default class ProfileSettingsForm extends Block<IProps> {
  constructor(props: IProps) {
    super({
      headerText: props.headerText,
      Inputs: props.Inputs,
      SubmitButton: new Button({
        className: 'button_create',
        type: 'submit',
        text: props.ButtonText,
      }),
      events: {
        submit: props.onSubmit,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

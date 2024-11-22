import Block from '../../utils/Block';
import './modalWindow.pcss';
import { BlockProps } from '../../types/blockProps.ts';
import template from './modalWindow.hbs';

interface IProps extends BlockProps {
  Content: Block;
  hidden: boolean;
  onCancel: () => void;
}

export default class ModalWindow extends Block<IProps> {
  constructor(props: IProps) {
    super(
      {
        Content: props.Content,
        hidden: props.hidden,
        events: {
          click: () => {
            props.onCancel();
          },
        },
      },
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}

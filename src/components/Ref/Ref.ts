import Block from '../../utils/Block.ts';
import './ref.pcss';
import template from './ref.hbs';
import { withRouter } from '../../utils/router/withRouter.ts';
import { BlockProps } from '../../types/blockProps.ts';

interface IProps extends BlockProps  {
  Content: string;
  onClick?: EventListener;
  className?: string;
  href?: string;
}

class Ref extends Block<IProps> {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        click: props.onClick || function () { props.router.go(props.href) },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withRouter(Ref);

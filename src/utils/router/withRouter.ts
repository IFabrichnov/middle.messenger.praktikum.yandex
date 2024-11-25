import Router from './router.ts';
import Block from '../Block.ts';
import { BlockProps } from '../../types/blockProps.ts';

export function withRouter<P extends BlockProps>(Component: typeof Block<P>) {
  type Props = typeof Component extends typeof Block<infer P extends BlockProps> ? P : any;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      if (!Router) {
        throw new Error("Router instance is not available");
      }
      super({ ...props, router: Router });
    }
  };
}

export interface PropsWithRouter {
  router?: typeof Router;
}

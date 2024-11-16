import { IUser } from '../api/authAPI.ts';
import EventBus from './EventBus.ts';
import set from './set.ts';
import Block from './Block.ts';
import { BlockProps } from '../types/blockProps.ts';

export enum StoreEvents {
  Updated = 'updated'
}

interface State {
  user: IUser;
}

export class Store extends EventBus {
  private state: any = {};

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

(window as any).store = store;

export function componentWithStore<SP>(mapStateToProps: (state: State) => SP) {
  return function wrap<P extends BlockProps, SP>(Component: typeof Block<P>) {
    return class ComponentWithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let prevState = mapStateToProps(store.getState());

        super({ ...(props as P), ...prevState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          prevState = stateProps;

          this.setProps({ ...stateProps } as SP & P);
        });
      }
    };
  };
}

export default store;
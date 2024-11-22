import { IUser } from '../api/authAPI.ts';
import EventBus from './EventBus.ts';
import set from './set.ts';
import Block from './Block.ts';
import { BlockProps } from '../types/blockProps.ts';
import { ChatInfo } from '../api/chatAPI.ts';
import { Message } from '../controllers/MessageController.ts';

export enum StoreEvents {
  Updated = 'updated'
}

interface State {
  user: IUser;
  chats: ChatInfo[];
  messages: Record<number, Message[]>;
  selectedChat?: number;
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

export function componentWithStore<SP extends Partial<State>>(
    mapStateToProps: (state: State) => SP
) {
  return function wrap<P extends BlockProps>(
      Component: typeof Block<P>
  ): new (props: Omit<P, keyof SP> & SP) => Block<Omit<P, keyof SP> & SP> {
    return class ComponentWithStore extends Component {
      constructor(props: Omit<P, keyof SP> & SP) {
        const stateProps = mapStateToProps(store.getState());
        super({ ...props, ...stateProps });

        store.on(StoreEvents.Updated, () => {
          const newStateProps = mapStateToProps(store.getState());
          this.setProps({ ...newStateProps });
        });
      }
    };
  };
}

export default store;

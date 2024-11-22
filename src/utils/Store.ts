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

  constructor() {
    super();
    this.on(StoreEvents.Updated, () => {});
  }

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export function componentWithStore<SP>(mapStateToProps: (state: State) => SP) {
  return function wrap<P extends BlockProps, SP>(Component: typeof Block<P>) {
    return class ComponentWithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps } as SP & P);
        });
      }
    };
  };
}

export default store;

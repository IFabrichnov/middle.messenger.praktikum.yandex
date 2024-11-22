import Block from '../Block.ts';

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}

export default class Route {
  private _block: Block | null = null;

  private _pathname: string;

  _blockClass;

  private readonly _query: string;

  constructor(pathname: string, BlockClass: typeof Block, query: any) {
    this._pathname = pathname;
    this._blockClass = BlockClass;
    this._query = query;
  }

  leave() {
    this._block = null;
  }

  match(pathname: string) {
    return new RegExp(`^${this._pathname}/?$`).test(pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});

      render(this._query, this._block);
    }
  }
}
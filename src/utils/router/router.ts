import Route from './route.ts';
import Block from '../Block.ts';

export interface BlockBuilder<P extends Record<string, unknown> = any> {
  new(props: P): Block<P>;
}

class Router {
  private static __instance?: Router | null = null;

  private routes: Route[] = [];

  private _currentRoute: Route | null = null;

  private readonly _rootQuery: string | undefined;

  private history : History | undefined = window.history

  constructor(rootQuery: string | undefined) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  public reset() {
    delete Router.__instance;

    new Router(this._rootQuery);
  }

  public use(pathname: string, block: BlockBuilder) {
    const route = new Route(pathname, block, this._rootQuery);
    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route: Route | null = this.getRoute(pathname);

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    if (route) {
      route.render();
    }
  }

  public go(pathname: string) {
    this.history?.pushState({}, '', pathname);

    this._onRoute(pathname);
  }

  public back() {
    this.history?.back();
  }

  public forward() {
    this.history?.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname)) || null;
  }
}

export default new Router('#app');

import { expect } from 'chai';
import sinon from 'sinon';
import Router, { BlockBuilder } from './router.ts';

describe('router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  beforeEach(() => {
    Router.reset();
  });

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const MockBlock = class {
    getContent = getContentFake;
  } as unknown as BlockBuilder;

  it('.use() should return the Router object', () => {
    const result = Router.use('/', MockBlock);

    expect(result).to.eq(Router);
  });

  it('should display the page when the router is started', () => {
    Router.use('/', MockBlock).start();

    expect(getContentFake.callCount).to.eq(1);
  });

  it('.go() should show the page when navigating to a route', () => {
    Router.use('/', MockBlock).start();

    Router.go('/');

    expect(getContentFake.callCount).to.eq(1);
  });

  it('.back() should show the page after going back in history', () => {
    Router.use('/', MockBlock).start();

    Router.back();

    expect(getContentFake.callCount).to.eq(1);
  });

  it('.forward() should display the page when advancing in the history', () => {
    Router.use('/', MockBlock).start();

    Router.forward();

    expect(getContentFake.callCount).to.eq(1);
  });
});

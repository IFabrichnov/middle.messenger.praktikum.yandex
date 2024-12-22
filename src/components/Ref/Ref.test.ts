import { expect } from 'chai';
import sinon from 'sinon';
import Ref from './Ref.ts';
import Router from '../../utils/router/router.ts';

describe('Ref component', () => {
  it('should create an instance of Ref without errors', () => {
    new Ref({
      href: '/',
      Content: '',
    });
  });

  it('should return an anchor element as its root element', () => {
    const { element } = new Ref({
      href: '/',
      Content: '',
    });

    expect(element).to.be.instanceof(window.HTMLAnchorElement);
  });

  it('should navigate to the specified route on click', () => {
    const ref = new Ref({
      href: '/',
      Content: '',
    });
    const spy = sinon.spy(Router, 'go');
    const element = ref.element as HTMLAnchorElement;

    element.click();

    expect(spy.calledOnce).to.eq(true);
  });

  it('should call the onClick callback when clicked', () => {
    const spy = sinon.fake();
    const ref = new Ref({
      href: '/',
      Content: '',
      onClick: spy,
    });
    const element = ref.element as HTMLAnchorElement;

    element.click();

    expect(spy.calledOnce).to.eq(true);
  });

  it('should apply the provided class name to the element', () => {
    const ref = new Ref({
      href: '/',
      Content: '',
      className: 'testClassName',
    });
    const element = ref.element as HTMLAnchorElement;

    expect(element.className).to.include('testClassName');
  });
});


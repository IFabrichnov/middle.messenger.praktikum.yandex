import template from './navbar.hbs';
import Block from '../../utils/Block.ts';
import Ref from '../../components/Ref/Ref.ts';
import render from '../../utils/render.ts';

const pages = ['main', 'login',  'register',  'page500',  'page404',];

export default class Navbar extends Block {
  constructor() {
    super({
      Refs: pages.map((name) => {
        return new Ref({
          Content: name,
          onClick() {
            render(name as any);
          },
        });
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
import '../../partials/errorPartial/errorPartial.pcss';
import render from '../../utils/render';
import Block from '../../utils/Block';
import Ref from '../../components/Ref/Ref.ts';
import template from '../../partials/errorPartial/errorPartial.hbs';

interface IProps {
  errorCode: string;
  errorMessage: string;
}

export default class Page404 extends Block {
  constructor(props: IProps) {
    super({
      ...props,
      Ref: new Ref({
        className: 'ref ref_center',
        Content: 'Назад к чатам',
        onClick() {
          render('main');
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
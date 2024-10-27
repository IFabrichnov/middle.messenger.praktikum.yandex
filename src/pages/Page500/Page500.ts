import template from '../../partials/errorPartial/errorPartial.hbs';
import '../../partials/errorPartial/errorPartial.pcss';
import render from '../../utils/render';
import Block from '../../utils/Block';
import Ref from '../../components/Ref/Ref.ts';

interface Props {
  errorCode: string;
  errorMessage: string;
}

export default class Page500 extends Block {
  constructor(props: Props) {
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
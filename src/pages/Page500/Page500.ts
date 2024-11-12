import template from '../../partials/errorPartial/errorPartial.hbs';
import '../../partials/errorPartial/errorPartial.pcss';
import Block from '../../utils/Block';
import Ref from '../../components/Ref/Ref.ts';

interface IProps {
  errorCode?: string;
  errorMessage?: string;
}

export default class Page500 extends Block {
  constructor(props?: IProps) {
    super({
      ...props || 0,
      Ref: new Ref({
        className: 'ref ref_center',
        Content: 'Назад к чатам',
        onClick() {
          // render('main');
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

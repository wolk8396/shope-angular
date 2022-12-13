import { Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";

@Directive({
  selector: '[appStyleColor]',
})

export class StyleDirective implements OnInit {
    isWrapper:ElementRef;
    isBtn:ElementRef;
    isCount:ElementRef;

  constructor(
    public el: ElementRef,
    public render: Renderer2,
    ) {}

    @Input() appStyleColor:boolean = false;

    ngOnInit(): void {
      this.onSetStyle(this.appStyleColor)
    }

    onSetStyle(value: boolean):void {
      this.isWrapper = this.el.nativeElement.children[0];
      this.isBtn = this.el.nativeElement.children[0].children[0];
      this.isCount = this.el.nativeElement.children[0].children[1];

      if ( value) {
        this.render.setStyle(this.isWrapper, 'background-color', '#FFEDED');
        this.render.setStyle(this.isBtn, 'background-color', '#ff4081');
        this.render.setStyle(this.isCount, 'color', 'red');
      } else  {
        this.render.setStyle(this.el.nativeElement.children[0], 'background-color', '#80808040');
        this.render.setStyle(this.isBtn, 'background-color', 'gray');
        this.render.setStyle(this.isCount, 'color', 'black');
      }
    }
}

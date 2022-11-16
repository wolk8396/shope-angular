import { Directive, ElementRef, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: '[isDisplay]'
})

export class appMenuStyle {
  isBtnDelete: ElementRef;
  isMenu: ElementRef;

  constructor (
    private elementRef: ElementRef,
    private render: Renderer2,
    ) {
  }

  onEvent(isDisplay: string): void {
    this.isBtnDelete = this.elementRef.nativeElement.children[1];
    this.isMenu = this.elementRef.nativeElement.children[2];

    this.render.setStyle(this.isBtnDelete, 'display',  isDisplay);
    this.render.setStyle(this.isMenu, 'display',  isDisplay);
  }

  @HostListener('click') onClick() {
    this.onEvent('block')
  }

  @HostListener('mouseenter') onEnter() {
    this.onEvent('block')
  }

  @HostListener('mouseleave') onLeave() {
    this.onEvent('none');
  }

}

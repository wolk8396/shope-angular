import { Directive, ElementRef, HostListener, Input, Renderer2, ViewChild } from "@angular/core";
import { Operation } from "../function/function";
import { Product } from "../interface/interface-const";
import { LocalService } from "../local-storage-service/local-storage";


@Directive({
  selector: '[appADDbtn]'
})

export class addBtnDirective {
  @ViewChild('getBtn') btnRef: ElementRef


  @HostListener('click', ['$event.target']) onADD(event: Event) {
    this.render.setStyle(this.elementRef.nativeElement, 'display', 'block');

  }
  constructor(
    private elementRef: ElementRef,
    private render: Renderer2
    ) {

  }

}

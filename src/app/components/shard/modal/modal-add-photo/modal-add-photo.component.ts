import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { modal_add } from '../../const/const';
import { FileLis} from '../../interface/interface-const';
import { AipHandlers } from '../../services/aip-handlers';

@Component({
  selector: 'app-modal-add-photo',
  templateUrl: './modal-add-photo.component.html',
  styleUrls: ['./modal-add-photo.component.scss']
})
export class ModalAddPhotoComponent implements OnInit, OnChanges {
  title: string = modal_add.title;
  massage: string = modal_add.type;
  file: File | null | undefined;
  photoName: string | undefined;
  isValue: number = 0
  isShowBar: boolean = false;

  @Input() isShowModal: boolean;
  @Output() isHiddenModal = new EventEmitter<boolean>();

  constructor(
    private api: AipHandlers,
  ) { }

  ngOnInit(): void {
    this.onShowBar(this.isValue, false)
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  onClose() {
    this.isShowModal = false
    this.isHiddenModal.emit(false);
  }

  onShowBar(progress: number, isValue: boolean) {
    (progress > 0) ? this.isShowBar = true : this.isShowBar = false;

    (progress === 100) ? this.isShowModal = false : this.isShowModal = isValue;
  }

  onFileSelected(event: Event ) {
    this.file = (event.target as HTMLInputElement).files?.item(0);
    this.photoName = (event.target as HTMLInputElement).files?.item(0)?.name;
    this.api.photoUser(this.file,  this.photoName)

    this.api.isProgressBar$.subscribe((progress) => {
      this.isValue = progress;
      this.onShowBar(this.isValue, true);
    })

  }
}

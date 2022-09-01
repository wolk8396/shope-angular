import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { File_Type, modal_add } from '../../const/const';
import { Operation } from '../../function/function';
import { FileLis, UserDate} from '../../interface/interface-const';
import { LocalService } from '../../local-storage-service/local-storage';
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
  isTypeFile: string | undefined;
  isValue: number = 0
  isShowBar: boolean = false;
  date: UserDate;
  ShowError: string = '';

  @Input() isShowModal: boolean;
  @Output() isHiddenModal = new EventEmitter<boolean>();

  constructor(
    private api: AipHandlers,
  ) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {

  }

  onClose(): void {
    this.isShowModal = false
    this.isHiddenModal.emit(false);
    this.isValue = 0;
    this.isShowBar = false;
    this.ShowError = '';
  }

  // onShowBar(progress: number) {
  //   (progress > 0) ? this.isShowBar = true : this.isShowBar = false;
  // }

  onSetPhoto (date: UserDate, url: string) :UserDate {
    date['photoUrl'] = url;
    LocalService.setUserDate(date);
    return LocalService.getUserDate();
  }

  onFileSelected(event: Event ): void {
    this.file = (event.target as HTMLInputElement).files?.item(0);
    this.photoName = (event.target as HTMLInputElement).files?.item(0)?.name;
    this.isTypeFile = (event.target as HTMLInputElement).files?.item(0)?.type;

    if (typeof this.isTypeFile === 'string' && File_Type.includes(this.isTypeFile)) {
      this.api.photoUser(this.file,  this.photoName);
      this.date = LocalService.getUserDate();

      this.api.isProgressBar$.subscribe((progress) => {
        this.isValue = progress;
        this.isShowBar = true;
      })

      this.api.isDownloadURL$.subscribe((url) => {
        this.date = Operation.onSetPhoto(this.date, url)
        this.api.upDateUser(this.date.idLink, this.date).subscribe();
        this.onClose();
      })

    } else this.ShowError = modal_add.error;

  }
}

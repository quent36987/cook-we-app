import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PopupConfig, PopupType } from '@app/_shared/component/popup/popup.model';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private popupSubject = new BehaviorSubject<PopupConfig | null>(null);
  popupState$: Observable<PopupConfig | null> = this.popupSubject.asObservable();

  showPopup( config: PopupConfig) {
    this.popupSubject.next(config);
  }

  showConfirmationPopup(title: string, description: string, callback: () => void) {
    this.showPopup({
      type: PopupType.Confirmation,
      title,
      description,
      confirmButton: 'Ok',
      callback,
    });
  }

  closePopup() {
    this.popupSubject.next(null);
  }
}

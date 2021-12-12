import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { LoadingComponent } from '../loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

   bsModalRef: BsModalRef

  constructor(
    private bsModalService: BsModalService
  ) { }

   openLoading(){
   this.bsModalRef = this.bsModalService.show(LoadingComponent)
  }
   closeLoading(){
    this.bsModalRef.hide()
  }

}

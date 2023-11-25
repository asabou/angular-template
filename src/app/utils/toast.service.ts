import { Injectable } from '@angular/core';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) {}

  error(
    message?: string,
    title?: string,
    configs?: Partial<IndividualConfig>
    ): ActiveToast<any> {
      configs = {
        timeOut: 0,
        extendedTimeOut: 0,
        disableTimeOut: true,
        closeButton: true,
        ... configs
      };
      return this.toastr.error(message, title, configs);
    }

    success(
      message?: string,
      title?: string,
      configs?: Partial<IndividualConfig>
      ): ActiveToast<any> {
        configs = {
          timeOut: 3000,
          extendedTimeOut: 1000,
          closeButton: true,
          ... configs
        };
        return this.toastr.success(message, title, configs);
      }
}

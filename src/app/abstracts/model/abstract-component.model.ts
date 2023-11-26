import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { TranslateService, TranslateStore } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { NgxTranslateModule } from "../../modules/ngx-translate/ngx-translate.module";
import { LANGUAGES, RELOAD_SEARCH } from "../../utils/models/constants.model";
import { MessageService } from "../../utils/services/message.service";
import { MyStorageService } from "../../utils/storages/my-storage.service";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        NgxTranslateModule
    ],
    providers: [
        MessageService,
        MyStorageService,
        TranslateService,
        TranslateStore
    ],
    template: '',
})
export abstract class AbstractComponent {
    subscription?: Subscription;

    constructor(
        public messageService: MessageService,
        public translate: TranslateService,
        public storageService: MyStorageService
        ) {
        this.subscription = this.messageService.getMessages().subscribe(message => {
            //TODO: do the action we want depending on the message  
            //for example, if the message is to reload the search action after we delete something
            if (message.text === RELOAD_SEARCH) { 
                this.searchEntity(); 
            }
        });
        this.translate.addLangs(LANGUAGES);
        this.translate.setDefaultLang(this.storageService.getLanguage());
        this.translate.use(this.storageService.getLanguage());
    }

    searchEntity(): void { }
}
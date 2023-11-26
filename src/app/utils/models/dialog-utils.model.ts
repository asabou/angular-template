import { MatDialogConfig } from "@angular/material/dialog";

export class DialogUtils {
    static createDefaultPanelDialogConfig(width: number, panelClass: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.panelClass = panelClass;
        dialogConfig.width = width + 'px';
        return dialogConfig;
      }
}
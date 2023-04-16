import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dilalog-unlock',
  templateUrl: './dilalog-unlock.component.html',
  styleUrls: ['./dilalog-unlock.component.scss']
})
export class DilalogUnlockComponent implements OnInit {
  idMessage: string;
  nameMessage: string;
  resultOK: boolean = false;
  constructor(
    public dialog: MatDialogRef<DilalogUnlockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.idMessage = data?.idMessage;
    this.nameMessage = data?.nameMessage;
   }

  ngOnInit(): void {
  }
  onCloseDialog() {
    this.dialog.close();
  }

  onConfirm() {
    this.resultOK = true;
    this.dialog.close(true);
  }
}

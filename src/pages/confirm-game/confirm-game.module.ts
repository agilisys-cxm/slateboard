import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmGamePage } from './confirm-game';

@NgModule({
  declarations: [
    ConfirmGamePage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmGamePage),
  ],
})
export class ConfirmGamePageModule {}

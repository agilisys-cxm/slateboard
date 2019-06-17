import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpponentPage } from './opponent';

@NgModule({
  declarations: [
    OpponentPage,
  ],
  imports: [
    IonicPageModule.forChild(OpponentPage),
  ],
})
export class OpponentPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChallengerPage } from './challenger';

@NgModule({
  declarations: [
    ChallengerPage,
  ],
  imports: [
    IonicPageModule.forChild(ChallengerPage),
  ],
})
export class ChallengerPageModule {}

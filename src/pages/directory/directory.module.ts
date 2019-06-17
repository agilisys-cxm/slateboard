import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { DirectoryPage } from './directory';

@NgModule({
  declarations: [
    DirectoryPage,
  ],
  imports: [
    IonicPageModule.forChild(DirectoryPage),
    TranslateModule.forChild()
  ],
  exports: [
      DirectoryPage
  ]
})
export class DirectoryPageModule {}

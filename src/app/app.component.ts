import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  fileTransferObject: FileTransferObject;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fileTransfer: FileTransfer,
    private file: File
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fileTransferObject = this.fileTransfer.create();
      this.downloadFiles();
    });
  }

  downloadFiles() {
    const url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    this.fileTransferObject.download(url, this.file.externalDataDirectory + 'dummy.pdf').then(
      entry => {
        console.log('download complete: ' + entry.toURL());
      },
      error => {
        console.log(error);
      }
    );
  }
}

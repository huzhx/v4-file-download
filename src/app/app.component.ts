import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {
  FileTransfer,
  FileTransferObject,
  FileUploadOptions
} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

import { environment } from '../environments/environment';

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
    const url = `${environment.API_ENDPOINT}/files/pdfs`;
    console.log(url);
    const options: FileUploadOptions = { headers: { 'x-auth': environment.FILES_API_TOKEN } };
    this.fileTransferObject
      .download(url, this.file.externalDataDirectory + 'pdfs.zip', null, options)
      .then(
        entry => {
          console.log('download complete: ' + entry.toURL());
        },
        error => {
          console.log(error);
        }
      );
  }
}

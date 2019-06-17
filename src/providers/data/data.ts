import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Settings } from '../';
import {provideSettings} from "../../app/app.module";


/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  local_domain = 'http://slate-server:8888/';
  live_domain = 'http://dev-slate-server.pantheonsite.io/';
  domain: string = '';

  settings: Settings;

  constructor(public http: HttpClient,
              public storage: Storage) {

      this.settings = provideSettings(storage);
      this.domain = this.live_domain;
  }

    get(url: string): Promise<any> {

      let finalURL = this.domain + 'json/' + url;

      console.log('get: ' + finalURL);

      return this.http.get(finalURL).toPromise();
    }


    load(name: string): Promise<any>  {
        console.log('load: ' + name);
        return this.storage.get(name);
    }

    save(name: string, data: string): Promise<boolean> {
        console.log('save: ' + name, data);

        return this.storage.set(name, data);
    }

    dump(name: string) {
        console.log('dump: ' + name);
        this.storage.remove(name);
    }

    changeDomain(newDomain:string){
      console.log('changeDomain()');
      console.log('domain: ' + this.domain);
      console.log('new domain: ' + newDomain);
      this.domain = newDomain;
      console.log('domain: ' + this.domain);

    }

    saveTimestamp(name: string) {
//        console.log('saveTimestamp:' + name);
        name = 'timestamp-' + name;

        let stamp = new Date().toISOString();
        stamp = stamp.substr(0,16);
        this.save(name,stamp);
    }

    getTimestamp(name: string): Promise<any> {
//        console.log('getTimestamp:' + name);
        name = 'timestamp-' + name;
        return this.load(name);
    }

    dumpTimestamp(name:string){
        name = 'timestamp-'+name;
        this.dump(name);
    }
}

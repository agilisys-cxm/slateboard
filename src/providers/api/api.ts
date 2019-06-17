import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {

  domain: string = 'http://dev-slate-server.pantheonsite.io/';
  service_url: string = 'service/';

  constructor(public http: HttpClient) {

  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    console.log('get ' +  this.getURL() + endpoint, reqOpts);
    return this.http.get(this.getURL() + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    console.log('post URL', this.getURL() + endpoint);
    console.log('post BODY', body);
    console.log('post OPTIONS', reqOpts);
    return this.http.post(this.getURL() + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.getURL() + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.getURL() + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.getURL() + endpoint, body, reqOpts);
  }

  getURL() {
    return this.domain + this.service_url;
  }
}

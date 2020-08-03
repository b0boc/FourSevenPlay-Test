import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class HexapiService {

  constructor(private httpClient: HttpClient) {}

  getHex() {
    return this.httpClient.get(`http://www.colr.org/json/color/random?timestamp=`+new Date().getTime()).
        pipe(
           map((data: JsonPipe) => { return data; }), catchError( error => { return throwError( 'Something went wrong! ['+error+']' ); })
        )
    }


}


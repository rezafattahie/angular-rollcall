import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  post(data: any, url: string) {
    return this.http.post<any>('http://localhost:3000/' + url, data);
  }

  get(url: string) {
    return this.http.get<any>('http://localhost:3000/' + url);
  }

  put(data: any, url: string, id: number) {
    return this.http.put<any>('http://localhost:3000/' + url + '/' + id, data);
  }

  delete(url: string, id: number) {
    return this.http.delete<any>('http://localhost:3000/' + url + '/' + id);
  }

}

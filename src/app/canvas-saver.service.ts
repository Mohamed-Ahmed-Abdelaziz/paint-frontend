import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasSaverService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:8080/canvasData';

  getCanvas(name: string){
    // return this.http.get(this.urlResult,{responseType: 'text'});
    return this.http.get(`${this.url}/${name}` ,{responseType: 'text'});
  }
  deleteCanvas(name: string){
    return this.http.delete(`${this.url}/${name}`);
  }
  addCanvas(canvas: object){
    return this.http.post(this.url, canvas);
  }
  getCanvasNames(){
    return this.http.get(`${this.url}/names`)
  }
}

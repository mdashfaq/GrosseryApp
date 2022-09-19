import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  localhost:string="http://192.168.0.105"
  
  constructor(private http:HttpClient) { }

  postOrder(data:any){
    return this.http.post<any>((this.localhost + ":3000/posts/"),data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getOrder(){
    return this.http.get<any>(this.localhost + ":3000/posts/").pipe(map((res:any)=>{
      return res;
    }))
  }
  updateOrder(data:any, id:number){
    return this.http.put<any>(this.localhost + ":3000/posts/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteOrder(id:number){
    return this.http.delete<any>(this.localhost + ":3000/posts/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
}

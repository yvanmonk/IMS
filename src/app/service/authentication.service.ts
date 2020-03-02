import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";


export interface UserDetails{
  id:number
  name:string
  first_name: string 
  tel: string
  poste: string 
  role : string
  exp : number
  email: string
  password: string

}

interface TokenResponse {
  token : string
}

export interface TokenPayload {
  id:number
  name:string
  email: string
  password: string
}



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token : string

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token : string): void  {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string{
    if (!this.token){
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  
  /**
   * getUserDetails
   */
  public getUserDetails() : UserDetails{
    const token = this.getToken()
    let payload
    if (token){
      payload= token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    }else{
      return null
    }
  }

  /**
   * isLoggedIn
   */
  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if(user){
      return user.exp > Date.now()/1000
    }else {
      return false
    }
  }

  /**
   * login (user:TokenPayload): Observable<any> 
   */
  public login (user: TokenPayload): Observable<any>  {
    const base = this.http.post(
      '/api/login',
      {email: user.email, password: user.password},
      {
        headers:{'Content-Type': 'application/json'}
      }
    )
    console.log(user)

    const request = base.pipe(
      map((data: TokenResponse) =>{
        if(data.token){
          this.saveToken(data.token)
        }
        return data
      })
    )
    return request
  }


  /**
   * profile
   */
  public profile(): Observable<any> {
    return this.http.get('/api/profile', {
      headers:{Authorization: 'Bearer ${this.getToken()}'}
    })
  }

  /**
   * logout
   */
  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}
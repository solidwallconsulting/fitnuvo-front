import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // public fields
  isLoading$: Observable<boolean>;

   currentUserSubject: BehaviorSubject<UserType>;
  public currentUser: Observable<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;




  constructor(
    private http:HttpClient,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
    var authLocalStorageToken :any = localStorage.getItem('currentUser')
    this.currentUserSubject = new BehaviorSubject<UserType>(JSON.parse(authLocalStorageToken));
    this.currentUser = this.currentUserSubject.asObservable();
  }

      public get currentUserValue(): UserType {
        return this.currentUserSubject.value;
    }

  // public methods
  login(email: string, password: string): Observable<UserType> {

    this.isLoadingSubject.next(true);
    return this.http.post<any>(`${environment.Base_Url}/api/v1/login`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token ) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                console.log(user);

                return user;

            }),
            finalize(() => this.isLoadingSubject.next(false))

            );
   
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/admin/login'], {
      queryParams: {},
    });

    }
   /*
  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }
  getUserByToken(): Observable<UserType> {
    const auth = localStorage.getItem('currentUser');
    if (!auth || !auth.authToken) {
      return of(undefined);
    }
    */

    getToken() {
      const user: any = localStorage.getItem('currentUser');
      const userObj = JSON.parse(user);
  
      return userObj.token;
    }
      // User Info
      getUserByToken() {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
        });
        return this.http.get(`${environment.Base_Url}/api/v1/user/me`, {
          headers: headers,
        });
      }



/*
    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.authToken).pipe(
      map((user: UserType) => {
        if (user) {
          this.currentUserSubject.next(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.authToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

*/


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

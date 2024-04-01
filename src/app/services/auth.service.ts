import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, Login, Register, User } from '../models/auth';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7118/api';
  private registerUrl = '/register';
  private loginUrl = '/login';
  private checkUserUrl = '/checkUser';

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: Register): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}${this.registerUrl}`,
      user
    );
  }

  // login(user: Login): Observable<AuthResponse> {
  //   return this.http.post<AuthResponse>(
  //     `${this.baseUrl}${this.loginUrl}`,
  //     user
  //   );
  // }

  login(user: Login): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}${this.loginUrl}`, user)
      .pipe(
        tap((response) => {
          const user = response.user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('jwtToken', response.token);
          this.currentUserSubject.next(user);
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jwtToken');
    this.currentUserSubject.next(null);
  }
}

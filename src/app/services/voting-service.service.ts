import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VotingServiceService {
  http = inject(HttpClient);
  vote = signal<User[]>([]);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/users`).pipe(
      tap((users) => {
        this.vote.set(users);
      })
    );
  }

  voteForUser(user: User): Observable<User> {
    return this.http.patch<User>(`http://localhost:3000/users/${user.id}`, user).pipe(
      tap(() => {
        this.getUsers().subscribe();
      })
    );
  }


}

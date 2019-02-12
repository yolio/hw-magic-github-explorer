import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap, map, tap, pluck
 } from 'rxjs/operators';

import { User } from '../user';
import { SearchResult } from '../search-result';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: [ './user-search.component.css' ]
})
export class UserSearchComponent implements OnInit {
  //users: User[];
  matchedUsers$: Observable<User[]>;

  private searchTerms = new Subject<string>();

  constructor(private userService: UserService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.matchedUsers$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchUsers(term)),
      tap((users) => console.log(users)),
      pluck('items')
    );

    this.matchedUsers$.subscribe(matched => console.log(matched));
    // this.matchedUsers$.subscribe(matched => this.users = matched.map(res => res.items)[0]);
// this.users = matched.items);
  }
}

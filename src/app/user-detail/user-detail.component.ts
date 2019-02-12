import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../user';
import { UserService } from '../user.service';
import { Repo } from '../repo';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Input() repos: Repo[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    // private location: Location
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getRepos();
  }

  getUser(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.userService.getUser(username).subscribe(user => this.user = user);
  }
  
  getRepos(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.userService.getRepos(username).subscribe(repos => this.repos = repos);
  }

  /* goBack(): void {
    this.location.back();
  } */
}

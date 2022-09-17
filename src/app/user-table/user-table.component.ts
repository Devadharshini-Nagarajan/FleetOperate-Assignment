import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  seachValue: string = '';
  displayedColumns: string[] = [
    'name',
    'domains',
    'alpha_two_code',
    'web_pages',
  ];
  dataSource = [];
  no_data: boolean = true;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {}

  onSearch() {
    this._userService.onSearch(this.seachValue).subscribe(
      (data) => {
        if (data.length === 0) {
          this.no_data = true;
          this.dataSource = data;
        } else {
          this.dataSource = data.slice(0, 25);
          this.no_data = false;
        }
      },
      (error) => console.log('err')
    );
  }
}

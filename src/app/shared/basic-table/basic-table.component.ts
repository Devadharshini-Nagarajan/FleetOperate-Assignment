import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.css'],
})
export class BasicTableComponent implements AfterViewInit {
  @Input('data') data: any;
  @Input('displayedColumns') displayedColumns: any;
  @Input('no_data') no_data: any;

  constructor() {}

  dataSource: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {}
}

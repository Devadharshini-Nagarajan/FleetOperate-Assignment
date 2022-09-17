import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  registrationForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    dob: ['', Validators.required],
    semester: ['', Validators.required],
    courses: this.fb.array([], [Validators.required]),
    notes: [''],
  });

  coursesList: Array<any> = [
    { name: 'Application Engineering', value: 'Application Engineering' },
    { name: 'Database Management', value: 'Database Management' },
    { name: 'Career Management', value: 'Career Management' },
    { name: 'User Experience', value: 'User Experience' },
    { name: 'Web Development', value: 'Web Development' },
  ];

  semesterList: any = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'dob',
    'semester',
    'courses',
    'notes',
  ];
  dataSource: any = [];
  no_data: boolean = true;

  ngOnInit(): void {}

  onCheckboxChange(e: any) {
    let checkArray: FormArray = this.registrationForm.get(
      'courses'
    ) as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onSubmit() {
    let coursesList: any = this.registrationForm.value.courses?.join();
    let dateVal: any = moment(this.registrationForm.value.dob).format(
      'YYYY-MM-DD'
    );
    // update datasource
    let newList = [
      ...this.dataSource,
      { ...this.registrationForm.value, courses: coursesList, dob: dateVal },
    ];
    this.dataSource = newList;
    // update no_data
    if (newList.length > 0) this.no_data = false;
    else this.no_data = true;
    // clear fields
    const arr = <FormArray>this.registrationForm.controls.courses;
    arr.controls = [];
    this.registrationForm.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dob: ['', Validators.required],
    semester: ['', Validators.required],
    courses: this.fb.array([],[Validators.required]),
    notes: [''],
  });

  coursesList: Array<any> = [
    { name: 'Application Engineering', value: 'Application Engineering' },
    { name: 'Database Management', value: 'Database Management' },
    { name: 'Career Management', value: 'Career Management' },
    { name: 'User Experience', value: 'User Experience' },
    { name: 'Data Analytics', value: 'Data Analytics' },
  ];

  semesterList: any = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
  usersList: any = [];

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
    console.log(this.registrationForm);
  }
}

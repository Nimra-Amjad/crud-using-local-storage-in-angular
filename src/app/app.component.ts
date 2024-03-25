import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') modal: ElementRef | undefined;
  studentObj: Student = new Student();
  studentList: Student[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem('angular17crud');
    if (localData != null) {
      this.studentList = JSON.parse(localData);
    }
  }

  openModal() {
    const modal = document.getElementById("myModal");
    if (modal != null) {
      modal.style.display = 'block'
    }
  }

  closeModal() {
    this.studentObj = new Student();
    if (this.modal != null) {
      this.modal.nativeElement.style.display = "none";
    }
  }

  saveStudent() {
    debugger
    const isLocalPresent = localStorage.getItem("angular17crud");
    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArray.length + 1;
      oldArray.push(this.studentObj);
      this.studentList = oldArray;
      localStorage.setItem('angular17crud', JSON.stringify(oldArray));

    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = newArr.length + 1;
      this.studentList = newArr;
      localStorage.setItem('angular17crud', JSON.stringify(newArr));
    }
    this.closeModal();
  }

  onEdit(item: Student) {
    this.studentObj = item;
    this.openModal();
  }

  updateStudent() {
    const currentRecord = this.studentList.find(m => m.id === this.studentObj.id);
    if (currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.address = this.studentObj.address;
      currentRecord.mobileNo = this.studentObj.mobileNo;
    };
    localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    this.closeModal();
  }

  onDelete(item: Student) {
    const isDelete = confirm("Are you sure want to delete");
    if (isDelete) {
      const currentRecord = this.studentList.findIndex(m => m.id === this.studentObj.id);
      this.studentList.splice(currentRecord, 1);
      localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    }
  }
}

export class Student {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.mobileNo = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.pincode = '';
    this.address = '';
  }
}
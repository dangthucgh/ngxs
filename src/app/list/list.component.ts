import { Component, OnInit } from '@angular/core';
import {StudentState} from '../state/student.state';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {StudentModel} from '../model/student.model';
import {DeleteStudent, FindOneStudent, GetStudents} from '../actions/student.actions';
import {Message} from '../model/MESSAGE';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  currentSelectedPage = 0;
  pageIndexes: Array<number> = [];
  pageNo = 0;

@Select(StudentState.getStudentList) students: Observable<StudentModel[]>;
@Select(StudentState.getTotalPages) totalPages: Observable<number>;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.getPage( this.pageNo);
  }
  deleteStudent(id: number): void{
    this.store.dispatch(new DeleteStudent(id));
  }
  editStudent(payload: StudentModel): void{
    this.store.dispatch(new FindOneStudent(payload));
  }
  getPage(pageNo: number): void {
    this.store.dispatch(new GetStudents(pageNo)).subscribe((message: Message) => {
      // this.students = message.content;
      // this.totalPages = message.totalPages;
      this.totalPages.subscribe(data => {
        this.pageIndexes = [];
        for ( let i = 0 ; i < data; i++){
         this.pageIndexes.push(i);
       }
     });
      this.currentSelectedPage = pageNo;
    },
      (error => {
        console.log(error);
      }));
  }
  previousClick(): void {
    if (this.currentSelectedPage > 0){
      this.getPage(-- this.currentSelectedPage);
    }
    else{
    }
  }
  active(index: number): {active: boolean} {
    if (this.currentSelectedPage === index ){
      return {
        active: true
      };
    }
  }
  getPaginationWithIndex(index: number): void {
    this.getPage(index);
  }

  nextClick(): void{
    this.totalPages.subscribe(data => {
      if (this.currentSelectedPage < data){
        this.getPage( ++this.currentSelectedPage);
      } else if (this.currentSelectedPage === data){
          this.currentSelectedPage = 0;
          this.nextClick();
      }
    });
  }

}

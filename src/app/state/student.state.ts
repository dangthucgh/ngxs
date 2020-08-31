import {StudentModel} from '../model/student.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {StudentService} from '../service/student.service';
import {CreateStudent, DeleteStudent, FindOneStudent, GetStudents, UpdateStudent} from '../actions/student.actions';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Message} from '../model/MESSAGE';

@Injectable()
export class StudentStateModel{
  students: StudentModel[];
  selectedStudent: StudentModel;
  totalPages: number;
}
@State<StudentStateModel>({
  name: 'students',
  defaults: {
    students: [],
    selectedStudent: null,
    totalPages: null
  }
})
@Injectable()
export class StudentState{
  constructor(private studentService: StudentService) {
  }
  @Selector()
  static getStudentList(state: StudentStateModel): StudentModel[]{
    return state.students;
  }
  @Selector()
  static getSelectedStudent(state: StudentStateModel): StudentModel{
    return state.selectedStudent;
  }
  @Selector()
  static getTotalPages(state: StudentStateModel): number{
    return state.totalPages;
  }
  @Action(GetStudents)
  getStudents({getState, setState}: StateContext<StudentStateModel>, {pageNo}: Message): Observable<Message>{
    return this.studentService.fetch(pageNo).pipe(tap((data) => {
      const state = getState();
      setState({
        ...state,
        students: data.content,
        totalPages: data.totalPages
      });
    }));
  }
  @Action(CreateStudent)
  createStudent({getState, patchState}: StateContext<StudentStateModel>, {payload}: CreateStudent): Observable<StudentModel> {
    return this.studentService.create(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
        students: [...state.students, result]
      });
    }));
  }

  @Action(UpdateStudent)
  updateStudent({getState, setState}: StateContext<StudentStateModel>, {payload}: UpdateStudent): Observable<any> {
    return this.studentService.update(payload).pipe(tap((result) => {
      const state = getState();
      const studentList = [...state.students];
      const studentIndex = studentList.findIndex(item => item.id === payload.id);
      studentList[studentIndex] = result;
      setState({
        ...state,
        students: studentList
      });
    }));
  }

  @Action(DeleteStudent)
  deleteStudent({getState, setState}: StateContext<StudentStateModel>, {id}: DeleteStudent): Observable<any> {
    return this.studentService.delete(id).pipe(tap(() => {
      const state = getState();
      const filteredArray = state.students.filter(item => item.id !== id);
      setState({
        ...state,
        students: filteredArray,
      });
    }));
  }

  @Action(FindOneStudent)
  findOneStudent({getState, setState}: StateContext<StudentStateModel>, {payload}: FindOneStudent): void {
      const state = getState();
      setState({
        ...state,
        selectedStudent: payload,
      });
    }



}

import {StudentModel} from '../model/student.model';
import {Message} from '../model/MESSAGE';

export class CreateStudent{
  static readonly type = '[StudentModel] Create';
  constructor(public payload: StudentModel) {
  }
}
export class GetStudents{
  static readonly type = '[StudentModel] Get';
  constructor(public pageNo: number) {
  }
}
export class UpdateStudent{
  static readonly type = '[StudentModel] Update';
  constructor(public payload: StudentModel) {
  }
}
export class DeleteStudent{
  static readonly type = '[StudentModel] Delete';
  constructor(public id: number) {
  }
}
export class FindOneStudent{
  static readonly type = '[StudentModel] findOne';
  constructor(public payload: StudentModel) {
  }
}

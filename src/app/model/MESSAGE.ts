import {StudentModel} from './student.model';
import {Observable} from 'rxjs';

export class Message {
  content: StudentModel[];
  totalPages: number;
  pageNo: number;
  pageSize: number;
  totalElements: number;

}

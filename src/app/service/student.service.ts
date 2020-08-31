import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StudentModel} from '../model/student.model';
import {ENDPOINT_URL} from '../constants/app.constants';
import {Message} from '../model/MESSAGE';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  fetch(pageNo: number): Observable<Message>{
    return this.http.get<Message>(`${ENDPOINT_URL}/student/pages/${pageNo}`);
    // return this.http.get<StudentModel[]>(`${ENDPOINT_URL}/student/${pageNo}/${pageSize}`);
  }

  findOne(id: any): Observable<StudentModel> {
    return this.http.get<StudentModel>(`${ENDPOINT_URL}/student/${id}`);
  }

  create(payload: StudentModel): Observable<StudentModel> {
    return this.http.post<StudentModel>(`${ENDPOINT_URL}/student`, payload);
  }

  update(payload: StudentModel): Observable<any> {
    return this.http.put(`${ENDPOINT_URL}/student/update`, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${ENDPOINT_URL}/student/${id}`);
  }
}

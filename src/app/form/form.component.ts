import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudentState} from '../state/student.state';
import {Observable, Subscription} from 'rxjs';
import {StudentModel} from '../model/student.model';
import {Select, Store} from '@ngxs/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateStudent, FindOneStudent, GetStudents, UpdateStudent} from '../actions/student.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  @Select(StudentState.getSelectedStudent) selectedStudent: Observable<StudentModel>;
  studentForm: FormGroup;
  editStudent = false;
  private formSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private store: Store,
              private route: ActivatedRoute,
              private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.formSubscription.add(
      this.selectedStudent.subscribe(student => {
        if (student){
          this.studentForm.patchValue({
            id: student.id,
            birthday: student.birthday,
            address: student.address,
            name: student.name,
            clas: student.clas

          });
          this.editStudent = true;
        }else {
          this.editStudent = false;
        }
      })
    );
  }
  createForm(): void{
    this.studentForm = this.fb.group({
      id: [''],
      birthday: ['', Validators.required],
      address: ['', Validators.required],
      name: ['', Validators.required],
      clas: ['', Validators.required]
    });
  }
  onSubmit(): void{
    if (this.editStudent){
      this.formSubscription.add(
        this.store.dispatch(new UpdateStudent(this.studentForm.value)).subscribe(
          () => {
            this.clearForm();
            alert('Chỉnh sửa thành công');
            this.store.dispatch(new GetStudents(0));
          }, error => {
            alert('Chỉnh sửa không thành công');
          }
        )
      );
    } else {
      this.formSubscription.add(
        this.formSubscription = this.store.dispatch(new CreateStudent(this.studentForm.value)).subscribe(
          () => {
            this.clearForm();
            this.store.dispatch(new GetStudents(0));
            alert('Thêm mới thành công');
          }, error => {
            alert('Thêm mới không thành công');
          }
        )
      );
    }
  }
  clearForm(): void{
      this.studentForm.reset();
      this.store.dispatch(new FindOneStudent(null));
  }

  ngOnDestroy(): void {
  }

}

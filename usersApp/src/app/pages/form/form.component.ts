import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  userForm: FormGroup
  usersService = inject(UsersService)
  router = inject(Router)

  constructor(){
    this.userForm = new FormGroup({
      first_name: new FormControl(null, []),
      last_name: new FormControl(null, []),
      email: new FormControl(null, []),
      image: new FormControl(null, [])
    })
  }

  async getDataForm(){
    try{
      const response: IUser = await this.usersService.insert(this.userForm.value)
      if (response._id){
        this.router.navigate(['/dashboard', 'users'])
      }
    } catch(error){
      console.log(error)
    }
  }
}

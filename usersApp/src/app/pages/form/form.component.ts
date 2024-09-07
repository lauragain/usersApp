import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      image: new FormControl(null, [Validators.required])
    })
  }

  async getDataForm(){
    if (this.userForm.invalid){
      alert('Por favor, completa correctamente los campos antes de enviar.')
      return
    }
    try{
      const response: IUser = await this.usersService.insert(this.userForm.value)
      if (response && response.id){
        alert('Usuario inserado correctamente')
        this.userForm.reset()
        this.router.navigate(['/dashboard', 'users'])
      }
    } catch(error){
      console.log(error)
      alert('Error al insertar el usuario. Inténtalo de nuevo')
    }
  }
}

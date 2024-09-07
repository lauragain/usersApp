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
    console.log('Formulario enviaado:', this.userForm.value)
    try{
      const response: IUser = await this.usersService.insert(this.userForm.value)
      console.log('Respuesta de la API:', response)
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

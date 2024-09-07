import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
  activatedRoute = inject(ActivatedRoute)

  userId: string | null = null
  update: boolean = false
  formTitle: string = 'Insertar un nuevo usuario'
  buttonText: string = 'Guardar'

  constructor(){
    this.userForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      image: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(async (params) =>{
      this.userId = params['id']
      if (this.userId){
        this.update = true
        this.formTitle = 'Actualizar usuario'
        this.buttonText = 'Actualizar'

        const user = await this.usersService.getById(this.userId)
        if (user){
          this.userForm.patchValue(user)
        }
      }
    })
  }

  async getDataForm(){
    if (this.userForm.invalid){
      alert('Por favor, completa correctamente todos los campos antes de enviar.')
      return
    }
    try{
      if (this.update){
        const response: IUser = await this.usersService.updateUser(this.userId!, this.userForm.value)
        alert('Usuario actualizado correctamente.')
      } else {
        const response: IUser = await this.usersService.insert(this.userForm.value)
        alert('Usuario guardado correctamente.')
      }
        this.userForm.reset()
        this.router.navigate(['/dashboard', 'users'])
      }catch(error){
        if (error instanceof HttpErrorResponse){
          if (error.status === 409){
            alert('El usuario ya existe. Por favor, revisa los datos.')
        } else {
          alert('Error al insertar el usuario. Inténtalo de nuevo.')         
        }
        } else {
          console.log('Error desconocido', error)
        }
    }
  }
}

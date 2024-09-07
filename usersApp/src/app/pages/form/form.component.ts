import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

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
      alert('Por favor, completa correctamente los campos antes de enviar.')
      return
    }
    try{
      if (this.update){
        const response: IUser = await this.usersService.updateUser(this.userId!, this.userForm.value)
        alert('Usuario actualizado correctamente')
      } else {
        const response: IUser = await this.usersService.insert(this.userForm.value)
        alert('Usuario insertado correctamente')
      }
        this.userForm.reset()
        this.router.navigate(['/dashboard', 'users'])
      }catch(error){
      console.log(error)
      alert('Error al insertar el usuario. Inténtalo de nuevo')
    }
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent implements OnInit{
  user: IUser | null = null;
  arrUsers: IUser[] = []
  activatedRoute = inject(ActivatedRoute)
  usersService = inject(UsersService)
  router = inject(Router)

  ngOnInit(){
    try{
      this.activatedRoute.params.subscribe(async (params: any) =>{
        let id = params.id
        this.user = await this.usersService.getById(id)
        this.arrUsers = await this.usersService.getAll()
    })
  } catch (error) {
    console.error('Error al cargar el usuario', error)
    alert('Error al cargar los datos. Inténtalo de nuevo')
  }
  }

  async deleteUser(){
    if(this.user) {
      const confirmed = confirm(`¿Estás seguro de eliminar al usuario ${this.user.first_name} ${this.user.last_name}?`)
      if(confirmed){
        try{
          const response = await this.usersService.deleteUser(this.user._id!)
          if(response?._id){
            alert(`Usuario ${response.first_name} ${response.last_name} eliminado correctamente`)
            this.arrUsers = await this.usersService.getAll()
            this.router.navigate(['/dashboard', 'users'])
          } else {
            alert('No se pudo eliminar el usuario. Inténtalo de nuevo.')
          }
        } catch(error){
        console.error('Error al eliminar al usuario', error)
        alert('Ocurrió un error al eliminar el usuario. Intenta de nuevo')
      }
    }
  }
}
}

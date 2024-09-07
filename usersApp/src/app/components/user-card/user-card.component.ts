import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user!:IUser
  @Output() UserDeleted: EventEmitter<string> = new EventEmitter()
  usersService = inject(UsersService)

  async deleteUser(){
      const confirmed = confirm(`¿Estás seguro de eliminar al usuario ${this.user.first_name} ${this.user.last_name}?`)
      if(confirmed){
        try{
          const response = await this.usersService.deleteUser(this.user._id!)
          if(response){
            alert(`Usuario ${response.first_name} ${response.last_name} eliminado correctamente`)
            this.UserDeleted.emit(this.user._id!)
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


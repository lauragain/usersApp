import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  arrUsers: IUser[] = []
  usersService = inject(UsersService)

  async ngOnInit(){
    try{
      const response = await this.usersService.getAll()
      this.arrUsers = response 
    } catch(error) {
      console.log(error)
    }
  }
}

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
  arrUsersPage1: IUser[] = []
  arrUsersPage2: IUser[] = []
  currentPage = 1
  usersService = inject(UsersService)

  async ngOnInit(){
    try{
      const response = await this.usersService.getAll()
      const mid = Math.ceil(response.length / 2)
      this.arrUsersPage1 = response.slice(0, mid)
      this.arrUsersPage2 = response.slice(mid)
    } catch(error) {
      console.log(error)
    }
  }
  changePage(page: number){
    this.currentPage = page
  }
}

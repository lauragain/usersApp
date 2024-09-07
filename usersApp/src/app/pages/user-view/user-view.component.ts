import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  activatedRoute = inject(ActivatedRoute)
  usersService = inject(UsersService)

  ngOnInit(){
    this.activatedRoute.params.subscribe(async (params: any) =>{
      let id = params.id
      this.user = await this.usersService.getById(id)
    })
  }

  deleteUser(){
    
  }
}

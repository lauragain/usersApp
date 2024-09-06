import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = "https://peticiones.online/users"
  
  private http = inject(HttpClient)

  async getAll(): Promise<IUser[]>{
    const page1 = await firstValueFrom(this.http.get<{ results: IUser[]}>(`${this.baseUrl}?page=1`))
    const page2 = await firstValueFrom(this.http.get<{ results: IUser[]}>(`${this.baseUrl}?page=2`))
    return [...page1.results, ...page2.results]
  }
}

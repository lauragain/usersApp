import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { firstValueFrom } from 'rxjs';
import { isScheduler } from 'rxjs/internal/util/isScheduler';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = "https://peticiones.online/api/users"
  
  private http = inject(HttpClient)

  async getAll(): Promise<IUser[]>{
    const page1 = await firstValueFrom(this.http.get<{ results: IUser[]}>(`${this.baseUrl}?page=1`))
    const page2 = await firstValueFrom(this.http.get<{ results: IUser[]}>(`${this.baseUrl}?page=2`))
    return [...page1.results, ...page2.results]
  }

  async getById(id: string): Promise<IUser | null>{
    const response = await firstValueFrom(this.http.get<IUser>(`${this.baseUrl}/${id}`))
    return response ? response : null
  }

  async deleteUser(id: string): Promise<IUser | null>{
    const response = await firstValueFrom(this.http.delete<IUser>(`${this.baseUrl}/${id}`))
    return response ? response : null
  }

  insert(body: IUser): Promise<IUser>{
    return firstValueFrom(this.http.post<IUser>(this.baseUrl, body))
  }

  async updateUser(id: string, body: IUser): Promise<IUser>{
    return firstValueFrom(this.http.put<IUser>(`${this.baseUrl}/${id}`, body))
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { member } from '../Models/Member';
import { PaginatedResults } from '../Models/Pagination';
import { UserParams } from '../Models/userParam';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
baseurl=environment.apiUrl;
members:member[] = [];
memberCache = new Map();
  constructor(private http:HttpClient) { 

  }

  getMembers(userParams: UserParams){

    var response =this.memberCache.get(Object.values(userParams).join('-'));
    
    if(response){
      return of(response);
    }

    let params=this.getPaginationHeaders(userParams.pageNumber,userParams.pageSize);
    params = params.append('minAge',userParams.minAge.toString());
    params = params.append('maxAge',userParams.maxAge.toString());
    params = params.append('gender',userParams.gender);

    return this.getPaginatedResult<member[]>(this.baseurl+'users', params)
    .pipe(map(response=>{
      this.memberCache.set(Object.values(userParams).join('-'),response);
      return response;
    }))
  }
  
  private getPaginatedResult<T>(url,params) {

    const paginatedResults:PaginatedResults<T> = new PaginatedResults<T>();

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResults.results = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResults.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResults;
      })
    );
  }

  private getPaginationHeaders(pagenumber:number,pageSize:number)
  {
    let params = new HttpParams();
 
      params =params.append('pageNumber',pagenumber.toString());
      params =params.append('pageSize',pageSize.toString());

      return params;
  }
  getMember(name:string){
    const member = this.members.find(x=>x.name === name);
    if(member !== undefined) return of(member);
    return this.http.get<member>(this.baseurl+'users/'+name);
  }

  updateMember(member:member){
    return this.http.put(this.baseurl+'users',member).pipe(
      map(()=>{
        const index = this.members.indexOf(member);
        this.members[index]=member
      })
    );
  }
}

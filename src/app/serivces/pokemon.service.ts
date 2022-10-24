import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { PokemonResponse } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly baseApi = "https://pokeapi.co/api/v2/pokemon/";
  //* ~~~~~~~~~~ starters
  private starters:any = [];
  private starters$ = new BehaviorSubject<any>(this.starters);
  starterlist$ = this.starters$.asObservable();

  types: string[] = []

  constructor(private readonly http: HttpClient) { }
  getPokes(pokeName: string){
    return this.http.get<PokemonResponse>(this.baseApi + pokeName).pipe(
      map((res : PokemonResponse) => {
        return {
          id: res.id,
          name: res.name,
          weight: res.weight,
          height: res.height,
          type: this.extractType(res.types),
          img: res.sprites.front_default
        }
      }),
      tap((data: any) => {
        console.log(data)
        this.starters.push(data);
        this.starters$.next(this.starters)
      })
    )
  }

  extractType(typesArr: any[]){
    let tmp: string[] = []
    typesArr.forEach((ele: any) => {
      tmp.push(ele.type.name)
    })
    return tmp;
    //console.log(this.types)
    
  }


}

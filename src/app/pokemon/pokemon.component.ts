import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PokemonService } from '../serivces/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  starterPokemon = [ "bulbasaur", "squirtle", "charmander" ];
 
   // //* ~~~~~~~~~~ starters
  // private starters:any = [];
  // private starters$ = new BehaviorSubject<any>(this.starters);
  // starterlist$ = this.starters$.asObservable();
  

  constructor(public pokeService: PokemonService) { }
  isClick : boolean = false;
  isConfirmed : boolean = false;
  selected! : any;
  aim: string = ""

  ngOnInit(): void {
    this.starterPokemon.forEach((pokeName) => {
      this.pokeService.getPokes(pokeName).subscribe()
    })
    this.pokeService.starterlist$.subscribe(console.log)
  
  }

  showPrompt(name: string){
    this.isClick = true;
    this.aim = name;
  }

  cancel(){
    this.isClick = false;
  }

  confirm(){
    this.isClick = false;
    this.pokeService.starterlist$.subscribe((data) => {
      const target = data.find((role: any) => role.name === this.aim);
      this.selected = target
    })
    this.isConfirmed = true
  }
}

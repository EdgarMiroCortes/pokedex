import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokeapiDataService } from './pokeapi.data.service';
import { Pokemon, PokemonListResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private pokeapiDataService: PokeapiDataService) {
  }


  /**
   * Obtiene una lista de pokémons con límite personalizado
   */
  getPokemonList(limit: number): Observable<PokemonListResponse> {
    return this.pokeapiDataService.getPokemonList(limit).pipe(
      map(response => {
        return response;
      })
    );
  }


  /**
   * Obtiene el detalle de un pokémon por ID
   */
  getPokemonDetail(id: number): Observable<Pokemon> {
    return this.pokeapiDataService.getPokemonById(id).pipe(
      map(pokemon => {
        return pokemon;
      })
    );
  }


}

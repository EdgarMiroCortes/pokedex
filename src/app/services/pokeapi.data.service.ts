import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon, PokemonListResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokeapiDataService {
  private readonly url = 'https://pokeapi.co/api/v2';
  constructor(private http: HttpClient) {
  }

  /**
   * Obtiene los 50 primeros pokémons
   */
  getPokemonList(limit: number = 50): Observable<PokemonListResponse> {
    const url = `${this.url}/pokemon?limit=${limit}`;
    return this.http.get<PokemonListResponse>(url);
  }


  /**
   * Obtiene el detalle de un pokémon concreto
   */
  getPokemonById(id: number): Observable<Pokemon> {
    const url = `${this.url}/pokemon/${id}`;
    return this.http.get<Pokemon>(url);
  }


}

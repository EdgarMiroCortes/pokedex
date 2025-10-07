import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {
    'filters.all': 'Tots',
    'filters.favorites_short': 'Fav',
    'filters.search_placeholder': 'Nom pokémon...',
    'filters.clear_filters': 'Netejar tots els filtres',
    'pokemon.view_details': 'Veure Detalls',
    'pokemon.back': '← Enrere',
    'pokemon.height': 'Alçada',
    'pokemon.weight': 'Pes',
    'pokemon.base_stats': 'Estadístiques Base',
    'pokemon.loading': 'Carregant pokémons...',
    'pokemon.loading_details': 'Carregant detalls del pokémon...',
    'pokemon.no_pokemon_selected': 'Selecciona un pokémon per veure els detalls',
    'pokemon.no_pokemons_found': 'No s\'han trobat pokémons'
  };

  getTranslation(key: string): string {
    return this.translations[key] || key;
  }
}

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from '../pokemon.service';
import { PokeapiDataService } from '../pokeapi.data.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService, PokeapiDataService]
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get pokemon detail', () => {
    const mockPokemon = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      types: [{ type: { name: 'grass' } }],
      sprites: { 
        front_default: 'test.png',
        front_shiny: '',
        other: { 'official-artwork': { front_default: '' } }
      },
      stats: [],
      abilities: []
    };

    service.getPokemonDetail(1).subscribe(pokemon => {
      expect(pokemon.id).toBe(1);
      expect(pokemon.name).toBe('bulbasaur');
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

});

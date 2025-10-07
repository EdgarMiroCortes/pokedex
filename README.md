# Mini Pokédex
## Descripció

Aquest projecte és una prova de selecció que demostra les meves habilitats en desenvolupament web amb Angular. 
L'aplicació permet als usuaris explorar, cercar i gestionar els seus Pokémon favorits utilitzant la PokeAPI.

## Funcionalitats

- Estructura per petits components, serveis, i un data-service des d'un fem tots els GET.
- Cerca i filtrat de Pokémon per nom i tipus, amb scroll horitzontal si no hi caben tots els tipus (s'ensneyen només els tipus dels quals tenim pokemons, hem de posar 200 per veurel's tots, i veure l'scroll). 
- Podem triar la quantitat de Pokemons visualitzats, deixant d'inici 50 com d'especifica.
- Sistema de preferits amb LocalStorage
- Disseny només per escriptori, com es comentava a l'enunciat. (Bootstrap ha deixat bastant bé la versió mobile, pero no és funcional encara)
- Vista de detall amb estadístiques completes, i un petit detall: el color de les estadistiques, és el del tipus principal d'aquell Pokémon.
- Múltiples imatges per cada Pokémon, normals i Shiny. Spinner de càrrega, personalitzat amb una Pokeball. (visualitzar 200 Pokémons per veure-ho bé)
- Gestió d'errors: Missatges si no troba Pokémon, i gestió si les trucades a l'API resulten error.
- Tests a cada component, i cada servei, ademés de Mocks de dades.
(Projecte realitzat tot el mateix dia d'una tirada, per aquest motiu no he realitzat cap commit fins al final. (ReadMe realitzat el dia després))

## Requisits

Per executar aquest projecte necessites **Node.js versió 18 o superior**. Aquesta versió és necessària per la compatibilitat amb Angular 17 i les seves dependències més recents.

### Verificar versió de Node.js
```bash
node --version
```

### Instal·lar Node.js 18+
Si no tens Node.js 18 o superior, descarrega'l des de: https://nodejs.org/

## Instal·lació

```bash
npm install
```

## Execució

```bash
ng serve
```

Obre el navegador a `http://localhost:4200`

## Tests

```bash
ng test
```

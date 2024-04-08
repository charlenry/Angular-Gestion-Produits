import { Categorie } from './categorie.model';

// Permet de mettre en forme les données reçues du serveur d'API Spring DATA REST
export class CategorieWrapper {
  _embedded!: { 
    categories: Categorie[] 
  };
}

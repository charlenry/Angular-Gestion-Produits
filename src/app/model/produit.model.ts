import { Categorie } from "./categorie.model";

// Ce type peut être créé avec le mot-clé interface ou class. Les propriétés doivent être tous optionnelles ou non nulles, par exemple idProduit?: number ou idProduit!: number. Cela permet d'éviter des problèmes d'initialisation dans le composant d'ajout de Produit. Dans notre cas, nous avons utilisé une classe pour définir le type Produit. 
export class Produit {
  idProduit!: number;
  nomProduit!: string;
  prixProduit!: number;
  dateCreation!: Date;
  categorie!: Categorie;
}

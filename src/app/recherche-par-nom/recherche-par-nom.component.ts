import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: ``,
})
export class RechercheParNomComponent implements OnInit {
  nomProduit: string = "";
  produits!: Produit[];
  allProduits!: Produit[];
  searchTerm!: string;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.produitService.listerProduits().subscribe((prods) => {
      // console.log(prods);
      this.allProduits = prods;
      this.produits = prods;
    });
  }

  /* rechercherProds() {
    if (this.nomProduit !== "") {
      this.produitService.rechercherParNom(this.nomProduit).subscribe((prods) => {
        this.produits = prods;
        console.log(prods);
      });
    }    
  } */

  onKeyUp(filterText: string) {
    this.produits = this.allProduits.filter(prod =>
    prod.nomProduit.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrl: './recherche-par-nom.component.css'
})
export class RechercheParNomComponent implements OnInit {
  // nomProduit: string = "";
  produits!: Produit[];
  // allProduits!: Produit[];
  searchTerm: string = "";

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.produitService.listerProduits().subscribe((prods) => {
      // console.log(prods);
      // this.allProduits = prods;
      this.produits = prods;
    });
  }

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  
}

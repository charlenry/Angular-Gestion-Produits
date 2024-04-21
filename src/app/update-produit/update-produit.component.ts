import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';


@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styles: ``
})
export class UpdateProduitComponent implements OnInit {
  currentProduit = new Produit();
  categories! : Categorie[];
  updatedCatId! : number;
  message: string = "";

  constructor( private activatedRoute: ActivatedRoute,
              private router: Router,
               private produitService: ProduitService ) {}

  ngOnInit(): void {
    this.produitService.listerCategories().subscribe((cats) => {
      this.categories = cats._embedded.categories;
      console.log(cats);
    });

    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.produitService.consulterProduit(id).subscribe( prod => { 
      this.currentProduit = prod; 
      this.updatedCatId = this.currentProduit.categorie.idCat;
    });
    
  }

  updateProduit() {
    this.currentProduit.categorie = this.categories.find(cat => cat.idCat == this.updatedCatId)!;
    this.produitService.modifierProduit(this.currentProduit).subscribe((prod) => {
      console.log(prod);
      this.message = "Produit " + this.currentProduit.nomProduit + " modifié avec succès !";
      setTimeout(() => {  this.router.navigate(['produits']); }, 3000);
    });    
  }
}

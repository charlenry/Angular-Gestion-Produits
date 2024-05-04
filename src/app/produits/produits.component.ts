import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css',
})
export class ProduitsComponent implements OnInit {
  produits!: Produit[]; //un tableau de produits

  constructor(private produitService: ProduitService, public authService: AuthService) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits() {
    this.produitService.listerProduits().subscribe((prods) => {
      console.log(prods);
      this.produits = prods;

      // Chargement des images des produits pour les afficher dans la liste des produits
      this.produits.forEach((prod) => {
        this.produitService
          .loadImage(prod.image.idImage)
          .subscribe((img: Image) => {
            prod.imageToDisplay = 'data:' + img.type + ';base64,' + img.image;
          });
      });
    });
  }

  deleteProduit(prod: Produit) {
    let isConfirmed = confirm('Etes-vous sûr ?');
    if (isConfirmed)
      this.produitService.supprimerProduit(prod.idProduit).subscribe(() => {
        console.log('produit supprimé');
        this.chargerProduits();
      });
  }
}

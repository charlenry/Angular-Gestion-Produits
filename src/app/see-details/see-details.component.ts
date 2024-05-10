import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-see-details',
  templateUrl: './see-details.component.html',
  styleUrl: './see-details.component.css'
})
export class SeeDetailsComponent implements OnInit {
  currentProduit = new Produit();
  categories!: Categorie[];
  categorie: string = '';
  updatedCatId!: number;
  message: string = '';
  myImage: string = '';
  uploadedImage!: File;
  isImageUpdated: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.produitService.listerCategories().subscribe((cats) => {
      this.categories = cats._embedded.categories;
    });
    this.produitService
      .consulterProduit(this.activatedRoute.snapshot.params['id'])
      .subscribe((prod) => {
        this.currentProduit = prod;
        this.categorie = this.currentProduit.categorie.nomCat;
        this.myImage = 'data:' + this.currentProduit.images[0].type + ';base64,' + this.currentProduit.images[0].image;
      });
  }

  zoomerImage(img: Image) {
    this.myImage = 'data:' + img.type + ';base64,' + img.image;
  }

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}

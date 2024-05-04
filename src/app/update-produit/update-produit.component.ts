import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { Image } from '../model/image.model';


@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styles: ``,
})
export class UpdateProduitComponent implements OnInit {
  currentProduit = new Produit();
  categories!: Categorie[];
  updatedCatId!: number;
  message: string = '';
  myImage: string = '';
  //lastImageId!: number;
  uploadedImage!: File;
  isImageUpdated: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.produitService.listerCategories().subscribe((cats) => {
      this.categories = cats._embedded.categories;
      console.log(cats);
    });

    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.produitService.consulterProduit(id).subscribe((prod) => {
      this.currentProduit = prod;
      //this.lastImageId = this.currentProduit.image.idImage;
      this.updatedCatId = this.currentProduit.categorie.idCat;
      console.log(this.currentProduit);

      this.produitService
        .loadImage(this.currentProduit.image.idImage)
        .subscribe((img: Image) => {
          this.myImage = 'data:' + img.type + ';base64,' + img.image;
        });
    });
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }

  updateProduit() {
    this.currentProduit.categorie = this.categories.find(
      (cat) => cat.idCat == this.updatedCatId
    )!;
    //tester si l'image du produit a été modifiée
    if (this.isImageUpdated) {
      this.produitService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentProduit.image = img;
          this.recordProduit(); 

          // Suppression de l'ancienne image
          //console.log('Ancienne image supprimée de la base de données !');
          //this.produitService.deleteImage(this.lastImageId).subscribe(() => {});        
        });     
    } else {
      this.recordProduit();
    }
  }

  recordProduit() {
    this.produitService
      .modifierProduit(this.currentProduit)
      .subscribe((prod) => {
        console.log(prod);
        this.message = 'Produit ' + this.currentProduit.nomProduit + ' modifié avec succès !';
        setTimeout(() => {
          this.router.navigate(['produits']);
        }, 3000);
      });
  }
}

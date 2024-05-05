import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { Image } from '../model/image.model';


@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrl: './update-produit.component.css',
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

  /* ngOnInit(): void {
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
  } */

  ngOnInit(): void {
    this.produitService.listerCategories().subscribe((cats) => {
      this.categories = cats._embedded.categories;
    });
    this.produitService
      .consulterProduit(this.activatedRoute.snapshot.params['id'])
      .subscribe((prod) => {
        this.currentProduit = prod;
        this.updatedCatId = prod.categorie.idCat;
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

  /* updateProduit() {
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
  } */

  updateProduit() {
    this.currentProduit.categorie = this.categories.find(
      (cat) => cat.idCat == this.updatedCatId
    )!;
    this.produitService
      .modifierProduit(this.currentProduit)
      .subscribe((prod) => {
        console.log(prod);
        this.message = 'Produit ' + this.currentProduit.nomProduit + ' modifié avec succès !';
        this.router.navigate(['produits']);
      });
  }

  /* recordProduit() {
    this.produitService
      .modifierProduit(this.currentProduit)
      .subscribe((prod) => {
        console.log(prod);
        this.message =
          'Produit ' +
          this.currentProduit.nomProduit +
          ' modifié avec succès !';
        setTimeout(() => {
          this.router.navigate(['produits']);
        }, 3000);
      });
  } */

  onAddImageProduit() {
    this.produitService
      .uploadImageProd(
        this.uploadedImage,
        this.uploadedImage.name,
        this.currentProduit.idProduit
      )
      .subscribe((img: Image) => {
        this.currentProduit.images.push(img);
      });
  }

  deleteImage(img: Image) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.produitService.deleteImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images
        const index = this.currentProduit.images.indexOf(img, 0);
        if (index > -1) {
          this.currentProduit.images.splice(index, 1);
        }
      });
  }

  zoomerImage(img: Image) {
    this.myImage = 'data:' + img.type + ';base64,' + img.image;
  }
}

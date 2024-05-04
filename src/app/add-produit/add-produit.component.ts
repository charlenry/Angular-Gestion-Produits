import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../model/categorie.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css',
})
export class AddProduitComponent implements OnInit {
  newProduit = new Produit();
  categories!: Categorie[];
  newIdCat!: number;
  newCategorie!: Categorie;
  message: string = '';
  uploadedImage!: File;
  imagePath: any;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.produitService.listerCategories().subscribe((cats) => {
      this.categories = cats._embedded.categories;
      console.log(cats);
    });
  }

  /* addProduit() {
    //Recherche du nom de la catégorie sélectionnée dans la liste des catégories pour l'associer au nouveau produit
    this.newProduit.categorie = this.categories.find(
      (cat) => cat.idCat == this.newIdCat
    )!;
    // Ajout du nouveau produit dans la base de données via le service ProduitService
    this.produitService.ajouterProduit(this.newProduit).subscribe((prod) => {
      console.log(prod);
      this.message =
        'Produit ' + this.newProduit.nomProduit + ' ajouté avec succès !';
      this.newProduit = new Produit();
    });
  } */

  addProduit() {
    console.log('uploadedImage : ', this.uploadedImage);
    console.log('uploadedImage : ', this.uploadedImage.name);
    // console.log("imagePath : ", this.imagePath);

    this.produitService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
        this.newProduit.image = img;

        console.log('newProduit.image : ', this.newProduit.image);
    
        this.newProduit.categorie = this.categories.find(
          (cat) => cat.idCat == this.newIdCat
        )!;

        console.log('newProduit : ', this.newProduit);

        this.produitService.ajouterProduit(this.newProduit).subscribe(() => {
          this.message = 'Produit ' + this.newProduit.nomProduit + ' ajouté avec succès !';
          this.newProduit = new Produit();
          this.imagePath = undefined;
          // this.router.navigate(['produits']);
        });
      });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }
}

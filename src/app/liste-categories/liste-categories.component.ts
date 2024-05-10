import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { ProduitService } from '../services/produit.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styles: ``,
})
export class ListeCategoriesComponent implements OnInit {
  categories!: Categorie[];
  editedCat: Categorie = { idCat: 0, nomCat: '', descriptionCat: ''};
  isAnAdding: boolean = true;
  isManaged: boolean = false;
  isAdmin: boolean = false;

  constructor(private produitService: ProduitService, public keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.isAdmin = this.keycloakService.isUserInRole('ADMIN');
    this.chargerCategories();
  }

  categorieAdded(cat: Categorie) {
    console.log('Cat added or updated event', cat);
    this.produitService
      .ajouterCategorie(cat)
      .subscribe(() => this.chargerCategories());
    this.editedCat = { idCat: 0, nomCat: '', descriptionCat: ''};
  }

  chargerCategories() {
    this.produitService.listerCategories().subscribe((cats) => {
      this.categories = cats._embedded.categories;
      console.log(cats);
    });
  }

  editCat(cat: Categorie) {
    this.editedCat = cat;
    this.isAnAdding = false;
  } 

  manageCategories() {
    this.isManaged = !this.isManaged;
    if (!this.isManaged) {
      this.editedCat = { idCat: 0, nomCat: '', descriptionCat: ''};
      this.isAnAdding = true;
    }
  }

  deleteCategorie(id: number) {
    let isConfirmed = confirm('Etes-vous sûr ?');
    if (isConfirmed)
      this.produitService.supprimerCategorieParId(id).subscribe(() => {
        //console.log('catégorie supprimée');
        this.chargerCategories();
      });
  }

}

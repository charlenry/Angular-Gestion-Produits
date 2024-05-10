import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styles: ``,
})
export class UpdateCategorieComponent implements OnInit {

  message: string = '';
  isAdmin: boolean = false;

  // i_categorie est représenté par l'attribut [i_categorie] dans le template parent (liste-categories.component.html)
  @Input()
  i_categorie!: Categorie;

  // i_isAnAdding est représenté par l'attribut [i_isAnAdding] dans le template parent (liste-categories.component.html)
  @Input()
  i_isAnAdding!: boolean;

  // o_categorieUpdated est représenté par l'attribut [o_categorieUpdated] dans le template parent (liste-categories.component.html)
  @Output()
  o_categorieAdded = new EventEmitter<Categorie>();

  constructor(public keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.isAdmin = this.keycloakService.isUserInRole('ADMIN');
    console.log('ngOnInit du composant UpdateCategorie ', this.i_categorie);
  }

  saveCategorie() {
    // Cette méthode est la même pour ajouter ou modifier une catégorie
    this.o_categorieAdded.emit(this.i_categorie);
    if (this.i_isAnAdding) {
      this.message = 'Catégorie ' + this.i_categorie.nomCat + ' ajoutée avec succès !';
    } else {
      this.message = 'Catégorie ' + this.i_categorie.nomCat + ' modifiée avec succès !';
    }
  }
}

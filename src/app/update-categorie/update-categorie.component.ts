import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styles: ``,
})
export class UpdateCategorieComponent implements OnInit {
  // i_categorie est représenté par l'attribut [i_categorie] dans le template parent (liste-categories.component.html)
  @Input()
  i_categorie!: Categorie;

  // i_isAnAdding est représenté par l'attribut [i_isAnAdding] dans le template parent (liste-categories.component.html)
  @Input()
  i_isAnAdding!: boolean;

  // o_categorieUpdated est représenté par l'attribut [o_categorieUpdated] dans le template parent (liste-categories.component.html)
  @Output()
  o_categorieAdded = new EventEmitter<Categorie>();

  ngOnInit(): void {
    console.log('ngOnInit du composant UpdateCategorie ', this.i_categorie);
  }

  saveCategorie() {
    // Cette méthode est la même pour ajouter ou modifier une catégorie
    this.o_categorieAdded.emit(this.i_categorie);
  }
}

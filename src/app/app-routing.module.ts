import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { SeeDetailsComponent } from './see-details/see-details.component';
import { RechercheParCategorieComponent } from './recherche-par-categorie/recherche-par-categorie.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';
import { SeeProfileComponent } from './see-profile/see-profile.component';
import { AuthGuard } from './guards/secure.guard';




const routes: Routes = [
  { path: "produits", component: ProduitsComponent },
  { path: "addProduit", component: AddProduitComponent, canActivate:[AuthGuard], data : {roles:['ADMIN']}},
  {path: "updateProduit/:id", component: UpdateProduitComponent, canActivate:[AuthGuard], data : {roles:['ADMIN']}},
  {path: "seeDetails/:id", component: SeeDetailsComponent},
  {path: "seeProfile", component: SeeProfileComponent},
  {path: "rechercheParCategorie", component : RechercheParCategorieComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeCategories", component : ListeCategoriesComponent, canActivate:[AuthGuard], data : {roles:['ADMIN']}},
  { path: "", redirectTo: "produits", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

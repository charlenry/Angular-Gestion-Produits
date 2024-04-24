import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { RechercheParCategorieComponent } from './recherche-par-categorie/recherche-par-categorie.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { authGuard } from './services/produit.guard';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  { path: "produits", component: ProduitsComponent },
  { path: "add-produit", component: AddProduitComponent, canActivate: [authGuard]},
  {path: "updateProduit/:id", component: UpdateProduitComponent},
  {path: "rechercheParCategorie", component : RechercheParCategorieComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeCategories", component : ListeCategoriesComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent },
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path:'register', component:RegisterComponent},
  { path: "", redirectTo: "produits", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

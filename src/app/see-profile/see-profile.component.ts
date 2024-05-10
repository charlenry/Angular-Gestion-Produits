import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-see-profile',
  templateUrl: './see-profile.component.html',
  styleUrl: './see-profile.component.css'
})
export class SeeProfileComponent {
  profile!: KeycloakProfile;
  public username!: string;
  firstName!: string;
  lastName!: string;
  email!: string;

  constructor(public keycloakService: KeycloakService) {}

  ngOnInit(): void {
    let isConnected = this.keycloakService.isLoggedIn();
    if (isConnected) this.keycloakService.loadUserProfile().then(profile => {
      this.profile = profile!;
      this.username = this.profile.username!;
      this.firstName = this.profile.firstName!;
      this.lastName = this.profile.lastName!;
      this.email = this.profile.email!;
    });
  }
  
}

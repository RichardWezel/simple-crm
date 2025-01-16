// user.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgFor } from '@angular/common';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, 
    MatIconModule, 
    MatTooltipModule, 
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CdkScrollable, 
    MatDialogModule,
    MatCardModule, 
    NgFor,
    RouterLink,
    AsyncPipe,
   
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['above'];
  position = new FormControl(this.positionOptions[0]);
  
  allUsers$!: Observable<User[]>;

  readonly dialog = inject(MatDialog);

  constructor(
    private firebaseService: FirebaseService, 
    private router: Router // Injektion des Routers
  ) {}

  ngOnInit(): void {
    this.allUsers$ = this.firebaseService.getUsers().pipe(
      tap(users => console.log('Benutzerliste:', users)) // Logge die Daten
    );
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  goToUser(id: string) {
    this.router.navigate(['/user', id]);
  }
}

import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CdkScrollable} from '@angular/cdk/scrolling';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule, 
    MatTooltipModule, 
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CdkScrollable, 
    MatDialogModule,
    MatCardModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  positionOptions: TooltipPosition[] = ['above'];
  position = new FormControl(this.positionOptions[0]);

  user: User = new User();


  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}

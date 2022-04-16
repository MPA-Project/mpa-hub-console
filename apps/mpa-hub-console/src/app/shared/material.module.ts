import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatDialogModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatTabsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
  ],
  exports: [
    LayoutModule,
    MatDialogModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatTabsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
  ],
})
export class MaterialModule { }

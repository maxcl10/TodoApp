import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
  MatInputModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatButtonModule,
  MatBadgeModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatDividerModule,
  MatGridListModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule
} from '@angular/material';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,

    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatButtonModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatProgressBarModule,
    DragDropModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDividerModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    // Material
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatButtonModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatProgressBarModule,
    DragDropModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDividerModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class SharedModule {}

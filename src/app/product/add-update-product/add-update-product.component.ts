import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, ProductDialogData } from 'src/app/interface/products.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { IDialog } from 'src/shared/common/i-dialog/i-dialog.component';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css']
})
export class AddUpdateProductComponent {
  productForm: FormGroup;
  categories: Category[] = [];

  constructor(
    public dialogRef: MatDialogRef<IDialog>,
    private fb: FormBuilder,
    private router: Router,
    public notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData,
  ) {
    if (!data.isUpdate) {
      this.productForm = this.fb.group({
        productName: ['', [Validators.required, Validators.maxLength(30)]],
        productDescription: [null],
        productCostPrice: ['', Validators.required],
        productSellingPrice: [0],
        productQuantityInStock: ['', Validators.required],
        productReorderPoint: [0],
      });
    } else {
      const formValue = this.data?.data?.element;
      this.productForm = this.fb.group({
        productName: [formValue.productName, [Validators.required, Validators.maxLength(30)]],
        productDescription: [formValue.productDescription],
        productCostPrice: [formValue.productCostPrice, Validators.required],
        productSellingPrice: [formValue.productSellingPrice, Validators.required],
        productQuantityInStock: [formValue.productQuantityInStock, Validators.required],
        productReorderPoint: [formValue.productReorderPoint],
      });
    }
    this.categories = this.data?.data?.categories;
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSaveClick(): void {
    this.data = {
      ...this.data,
      form: this.productForm,
      component: this.data.component.name
    }
    this.dialogRef.close(this.data);
  }

  public addCategory() {
    this.router.navigate(['/category']);
    this.onNoClick();
  }
}

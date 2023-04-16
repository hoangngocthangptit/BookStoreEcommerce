import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import {  MatDialog, MatDialogRef } from '@angular/material/dialog';
import {   MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from 'src/app/Service/book.service';
import { BookModule } from 'src/app/Model/book/book.module';
@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss']
})
export class AddbookComponent implements OnInit {
  bookForm: FormGroup;
  bookid;
  constructor( private matSnackBar: MatSnackBar,
               private formBuilder: FormBuilder,
               private bookService: BookService,
               private dialog: MatDialog,
               private dialogRef: MatDialogRef<AddbookComponent>) { }
    private imageFile: string;
  ngOnInit(): void {}

  addbooks: BookModule = new BookModule();
  bookName = new FormControl(this.addbooks.bookName, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(25),
    // Validators.pattern("[a-zA-Z ]*"),
  ]);
  authorName = new FormControl(this.addbooks.authorName, [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(25),
    // Validators.pattern("[a-zA-Z ]*"),
  ]);
  price = new FormControl(this.addbooks.price, [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("[0-9 ]*"),
  ]);
  noOfBooks = new FormControl(this.addbooks.noOfBooks, [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("[0-9]*"),
  ]);
  bookDetails = new FormControl(this.addbooks.bookDetails, [
    Validators.required,
    Validators.minLength(20),
    // Validators.pattern("[a-zA-Z ]*"),
  ]);


  onSelectedImage(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.imageFile = image.name;
    }
  }
    onClickaddBook() {
      this.bookService.addBook(this.addbooks, this.imageFile).subscribe(
        (user) => {
          if (user.statusCode === 200) {
            this.matSnackBar.open(user.response, 'ok', {duration: 4000});
            this.dialogRef.close(1);
          }
        },
        (error: any) => {
          this.matSnackBar.open(error.error, 'ok', { duration: 4000 });
          console.log(error);
        }
      );
      if (this.bookForm.invalid) {
        return;
      }
    }

    bookNameValidation() {
      return this.bookName.hasError("required") ? "Nhập tên sách" :
             this.bookName.hasError("minlength") ? "Phải có tối thiểu 3 ký tự" :
             this.bookName.hasError("maxlength") ? "Cho phép tối đa 25 ký tự" : "";
    }
    bookAuthorValidation() {
      return this.authorName.hasError("required") ? "Nhập tên tác giả" :
             this.authorName.hasError("minlength") ? "tối thiểu 5 kí tự" :
             this.authorName.hasError("maxlength") ? "Cho phép tối đa 25 ký tự" : "";
    }
    bookPriceValidation() {
      return this.price.hasError("required") ? "Nhập giá" :
             this.price.hasError('pattern')? "Chỉ số được phép":
             this.price.hasError("minlength") ? "Phải có tối thiểu 1 chữ số" :"";
    }
    noOfBooksValidation() {
      return this.noOfBooks.hasError("required") ? "Nhập số lương" :
             this.noOfBooks.hasError('pattern')? "Chỉ số được phép":
             this.noOfBooks.hasError("minlength") ? "Phải có tối thiểu 1 chữ số" :"";
    }
    bookDescriptionValidation() {
      return this.bookDetails.hasError("required") ? "Mô tả sách buộc nhập" :
             this.bookDetails.hasError("minlength") ? "Phải có tối thiểu 20 ký tự" :"";
    }

}

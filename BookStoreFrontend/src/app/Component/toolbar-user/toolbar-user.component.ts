import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/Service/book.service';
import { CartService } from 'src/app/Service/cart.service';
import { TokenService } from 'src/app/Service/token.service';
import { WishlistService } from 'src/app/Service/wishlist.service';

@Component({
  selector: 'app-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {

  constructor(
    private service: BookService,
               private token: TokenService,
               private route: Router,
               private cartService: CartService,
               private wishlistService: WishlistService,
               private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.wishlistService.autoRefresh$.subscribe(() => {

      this. getWishlistCount();
    }

    );
    this. getWishlistCount();

    this.cartService.autoRefresh$.subscribe(() => {
      this.getCartItemCount();

    });

    this.getCartItemCount();
    this.name = localStorage.getItem('Name');
    this.role = localStorage.getItem('role');
    console.log('role check toolbar', this.role);
    if (this.role === 'admin') {
     this.isAdmin = true;
     this.isLogin = true;
   }
    if (this.role === 'seller') {
     this.isSeller = true;
     this.isLogin = true;
   }
    if (this.role === 'user') {
     this.isUser = true;
     this.isLogin = true;
     console.log('is user ', this.isUser);
   }
  }
  @Output() toggleEvent = new EventEmitter<boolean>();


  opened = false;




  name: any;
  id: any;
  isUser = false;
  isSeller = false;
  isAdmin = false;
  role: string;
  length: any;
  userName: string;
  totalItem;
  isbudget = false;
  isLogin = false;
 @Input() output: any;
 @Input() function: any;


  wishlistLength: number;

  ontoggel(input: any) {
    console.log('input' + input);
    this.toggleEvent.emit(input);
    this.opened = !this.opened;
  }
  getCartItemCount() {
    this.cartService.getCartItemCount().subscribe((response: any) => {
      this.length = response.obj;
      console.log('total number of itemes are' + response.obj);
     });
  }
  bookSearch() {
    // console.log(this.bookName);
    this.service.setSearchBookData(this.userName);
  }
  logout(event: MouseEvent) {
    console.log('loggout function called');
    event.preventDefault();
    this.token.remove();
    this.token.logedIn(false);
    this.route.navigateByUrl('/login');
  }
  getUpdatedNotes(event) {
  this.ngOnInit();
  }
  getWishlistCount() {
    this.wishlistService.getWishlistCount().subscribe((response: any) => {
      this.wishlistLength = response.obj;
      console.log('total number wishBook are' + response.obj);
     });
  }
}

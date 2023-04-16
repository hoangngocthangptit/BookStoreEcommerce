import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Service/cart.service';
import { UserService } from 'src/app/Service/user.service';
import { WishlistService } from 'src/app/Service/wishlist.service';

@Component({
  selector: 'app-history-buy',
  templateUrl: './history-buy.component.html',
  styleUrls: ['./history-buy.component.scss']
})
export class HistoryBuyComponent implements OnInit {

  isUser = false;
  isSeller = false;
  isAdmin = false;
  role: string;
  public opened2 = false;
  wishlistLength: number;
  isLogin = false;
  length: any;
  name: any;
  email:any;
  dataSource:any=[]
  dataLisst:any=[]
  bookListdata:any=[]
  constructor( private wishlistService: WishlistService, private cartService: CartService, private userService: UserService) { }

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
    this.email=localStorage.getItem('email');
    console.log("email",this.email)
    console.log('role check toolbar', this.role);
    this.doSearh()
  }
  nameEventHander($event: any) {
    this.opened2 = $event;
    console.log("2", this.opened2);
  }
  doSearh() {
    let data = {
      name: this.email,
    };
    this.userService.SearchUser(data).subscribe((res:any) => {
      this.dataSource = res.obj;
       this.dataLisst=this.dataSource[0].orderBookDetails;
       for (let i=0;i<this.dataSource[0].orderBookDetails.length;i++){
        const obj = this.dataSource[0].orderBookDetails[i].booksList.reduce((acc, currentValue, index) => {
          acc[index] = currentValue;
          return acc;
        }, {});
        this.bookListdata.push(obj[0]);
      }
      console.log('data',JSON.stringify(this.bookListdata))
    });
  }
  getWishlistCount() {
    this.wishlistService.getWishlistCount().subscribe((response: any) => {
      this.wishlistLength = response.obj;
      console.log('total number wishBook are' + response.obj);
     });
  }
  getCartItemCount() {
    this.cartService.getCartItemCount().subscribe((response: any) => {
      this.length = response.obj;
      console.log('total number of itemes are' + response.obj);
     });
  }

}

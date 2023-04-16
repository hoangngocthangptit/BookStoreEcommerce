import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/Service/token.service";
import { Router } from "@angular/router";
import { BookService } from "src/app/Service/book.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BookModule } from "src/app/Model/book/book.module";
import { Order } from "src/app/Model/order.model";
import { AdminService } from "src/app/Service/admin.service";
import { Excel, ExcelService } from "src/app/Service/excel.service";
import { formatDate } from "@angular/common";
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-orderstatus",
  templateUrl: "./orderstatus.component.html",
  styleUrls: ["./orderstatus.component.scss"],
})
export class OrderstatusComponent implements OnInit {
  constructor(
    private service: BookService,
    private adminservice: AdminService,
    private dialog: MatDialog,
    private _exporHelperService: ExcelService,
    private matSnackBar: MatSnackBar,
    private sellerService: BookService
  ) {}
  bookSearch: any;
  name: string = null;
  books: any;
  status: string;
  orderedBooks: any;
  orderdetails = new Array<any>();

  animalControl = new FormControl("", Validators.required);
  selectFormControl = new FormControl("", Validators.required);

  selectedValue: string;

  role: string;
  isAdmin: boolean = false;
  isSeller: boolean = false;
  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    if (this.role === "admin") {
      this.isAdmin = true;
      this.isSeller = false;
      this.getallUserOrderedBooks();
    } else if (this.role === "seller") {
      this.isAdmin = false;
      this.isSeller = true;
      this.getallUserOrderedBooks();
    }

    this.adminservice.autoRefresh$.subscribe(() => {
      if (this.role === "admin") {
        this.getallUserOrderedBooks();
      } else if (this.role === "seller") {
        this.getallUserOrderedBooks();
      }
    });
  }

  getallUserOrderedBooks() {
    console.log("order status api called");
    this.adminservice.getAllOrderedBooks().subscribe((response) => {
      this.orderedBooks = response.obj;
      console.log("All orderbooks for order status= :  ", this.orderedBooks);
      console.log("no of orders " + response.obj.length);

      for (let i = 0; i < response.obj.length; i++) {
        console.log("Block statement execution no." + i);
        console.log("orderId : " + response.obj[i].orderId);
        console.log("orderStatus : " + response.obj[i].orderStatus);
        console.log("bookName : " + response.obj[i].booksList[0].bookName);
        console.log(
          "bookDetails : " + response.obj[i].booksList[0].bookDetails
        );
        console.log("authorName : " + response.obj[i].booksList[0].authorName);
        console.log("image : " + response.obj[i].booksList[0].image);
        console.log("bookprice : " + response.obj[i].booksList[0].price);
        console.log(
          "totalprice : " + response.obj[i].quantityOfBooks[0].totalprice
        );
        console.log(
          "quantityOfBook : " +
            response.obj[i].quantityOfBooks[0].quantityOfBook
        );

        var p = {
          orderId: response.obj[i].orderId,
          orderStatus: response.obj[i].orderStatus,
          bookName: response.obj[i].booksList[0].bookName,
          bookDetails: response.obj[i].booksList[0].bookDetails,
          authorName: response.obj[i].booksList[0].authorName,
          image: response.obj[i].booksList[0].image,
          totalprice: response.obj[i].quantityOfBooks[0].totalprice,
          quantityOfBook: response.obj[i].quantityOfBooks[0].quantityOfBook,
          address: response.obj[i].address,
          city: response.obj[i].city,
          ngayMua: response.obj[i].orderPlacedTime,
          name: response.obj[i].name,
          phone: response.obj[i].mobileNumber,
        };

        this.orderdetails.push(p);
        console.log("after push ", this.orderdetails);
      }
    });
  }

  no: any;

  updateOrderAdmin(orderId: any, status: any) {
    console.log("Order Id", orderId);
    console.log("Order status", status);
    this.adminservice.updateOrderStatus(orderId, status).subscribe(
      (response: any) => {
        this.matSnackBar.open("Order updated by Admin", "success", {
          duration: 5000,
        });
      },
      (error: any) => {
        this.matSnackBar.open(error.error.message, "failed", {
          duration: 5000,
        });
      }
    );
  }

  updateOrderSeller(orderId: any, status: any) {
    console.log("Order Id", orderId);
    console.log("Order status", status);
    this.adminservice.updateOrderStatus(orderId, status).subscribe(
      (response: any) => {
        this.matSnackBar.open("Order updated by Seller", "success", {
          duration: 5000,
        });
      },
      (error: any) => {
        this.matSnackBar.open(error.error.message, "failed", {
          duration: 5000,
        });
      }
    );
  }
  doExport() {
    this.getallUserOrderedBooks();

    let headerTTThietHai: any[] = [
      "STT",
      "Mã đơn",
      "Tên sách",
      "Số lượng",
      "Giá tiền",
      "Họ tên",
      "Số điện thoại",
      "Ngày mua",
      "Địa chỉ",
    ];
    let groupHeaderTTThietHai: any[] = [];
    let groupHeaderTTThietHai_row1: any[] = [];

    let groupMergerTTThietHai: any[] = [];
    let keyTTThietHai: any[] = [
      "TT",
      "MDH",
      "Tensach",
      "Soluong",
      "Giatien",
      "name",
      "phone",
      "NgayMua",
      "DiaCHi",
    ];

    let dataTemp: any[] = [];

    this.orderdetails.forEach((element, index) => {
      let item = {
        TT: index + 1,
        MDH: element.orderId,
        DiaCHi: element.address,
        Tensach: element.bookName,
        Soluong: element.quantityOfBook,
        name: element.name,
        phone: element.phone,
        NgayMua: formatDate(element.ngayMua, "dd/MM/yyyy", "en-US"),
        Giatien: element.totalprice + " " + "đ",
      };
      dataTemp.push(item);
    });

    let widthThietHai: any[] = [8, 10, 20, 8, 10, 40, 20, 20, 40];
    let excelTTThietHai: Excel = {
      title: "Thống kê hóa đơn",
      subTitle: null,
      workSheet: null,
      keys: keyTTThietHai,
      widths: widthThietHai,
      data: dataTemp,
      groupHeaders: null,
      groupMerge: null,
      sheetName: "Hóa đơn",
      headers: headerTTThietHai,
    };
    let arrayExcel = [];
    arrayExcel.push(excelTTThietHai);

    let timeSpan = new Date().toISOString();
    this._exporHelperService.generateExcel("Hoa-don" + timeSpan, arrayExcel);
  }

  // getInProgressOrderedBooks() {
  //   console.log('Get in progress order books -------------');
  //   this.sellerService.getInProgressOrderedBooks().subscribe( response => {
  //   this.orderedBooks = response.obj;
  //   console.log('In progress orderbooks for order status= :  ', this.orderedBooks);
  //   console.log("no of orders "+response.obj.length);

  //   for (let i = 0; i < response.obj.length; i++) {
  //     console.log ("Block statement execution no." + i);
  //     console.log("orderId : "+response.obj[i].orderId);
  //     console.log("orderStatus : "+response.obj[i].orderStatus);
  //     console.log("bookName : "+response.obj[i].booksList[0].bookName);
  //     console.log("bookDetails : "+response.obj[i].booksList[0].bookDetails);
  //     console.log("authorName : "+response.obj[i].booksList[0].authorName);
  //     console.log("image : "+response.obj[i].booksList[0].image);
  //     console.log("bookprice : "+response.obj[i].booksList[0].price);
  //     console.log("totalprice : "+response.obj[i].quantityOfBooks[0].totalprice);
  //     console.log("quantityOfBook : "+response.obj[i].quantityOfBooks[0].quantityOfBook);

  //     var p = {orderId:response.obj[i].orderId, orderStatus:response.obj[i].orderStatus, bookName:response.obj[i].booksList[0].bookName,
  //       bookDetails:response.obj[i].booksList[0].bookDetails, authorName:response.obj[i].booksList[0].authorName,
  //       image:response.obj[i].booksList[0].image,  totalprice:response.obj[i].quantityOfBooks[0].totalprice,
  //       quantityOfBook:response.obj[i].quantityOfBooks[0].quantityOfBook
  //     };

  //       this.orderdetails.push(p);
  //       console.log("after in progress order push ",this.orderdetails);
  //   }
  //   });
  // }
}

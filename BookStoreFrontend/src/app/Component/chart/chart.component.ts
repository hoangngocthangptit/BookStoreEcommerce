import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/Service/admin.service";
import { Title } from "@angular/platform-browser";
import { PeriodicElement } from "../admin-user/admin-user.component";
import { MatTableDataSource } from "@angular/material/table";
import { formatDate } from "@angular/common";
import { Excel, ExcelService } from "../../Service/excel.service";
import { stringify } from "querystring";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
  count1: number;
  count2: number;
  public opened2 = false;
  dataNB = [];
  count3: number;
  isUser = false;
  isSeller = false;
  isAdmin = false;
  orderedBooks: any;
  dataTemp: any[] = [];
  orderdetails = new Array<any>();
  role: string;
  isLogin = false;
  price4: number;
  dataPrice: any= [];
  dataSl: any = [
   
  ];
  dataQuanlity: any= [
    // { label: "Jan", y: 12 },
    // { label: "Feb", y: 12 },
    // { label: "Mar", y: 1233 },
    // { label: "Apr", y: 122 },
    // { label: "May", y: 222 },
    // { label: "Jun", y: 33 },
    // { label: "Jul", y: 1212 },
    // { label: "Aug", y: 12 },
    // { label: "Sep", y: 12 },
    // { label: "Oct", y: 12 },
    // { label: "Nov", y: 21 },
    // { label: "Dec", y: 12 },
  ];
  dataSource: any = [];
  displayedColumns: string[] = ["stt", "Thang", "Doanhthu"];
  discolum: string[] = ["stt", "Thang", "soDonhang"];
  constructor(
    private adminservice: AdminService,
    private _exporHelperService: ExcelService,
    private titleService: Title
  ) {}

  chart: any;
  chartOptions1 = {
    animationEnabled: true,

    data: [
      {
        type: "doughnut",
        yValueFormatString: "#,###.##'%'",
        // indexLabel: "{name}",
        dataPoints: [
          // { y: 28, name: "Labour" },
          // { y: 10, name: "Legal" },
          // { y: 20, name: "Production" },
          // { y: 15, name: "License" },
          // { y: 23, name: "Facilities" },
          // { y: 17, name: "Taxes" },
          // { y: 12, name: "Insurance" }
          { y: 28 },
          { y: 10 },
          { y: 10 },
          { y: 15 },
          { y: 23 },
          { y: 17 },
          { y: 12 },
        ],
      },
    ],
  };
  chartOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Phân tích doanh thu",
    },
    axisY: {
      title: "Số lượng đơn đặt hàng",
      includeZero: true,
    },
    axisY2: {
      title: "Tổng doanh thu",
      includeZero: true,
      labelFormatter: (e: any) => {
        var suffixes = ["", "K", "M", "B"];

        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if (order > suffixes.length - 1) order = suffixes.length - 1;

        var suffix = suffixes[order];
        return "đ" + e.value / Math.pow(1000, order) + suffix;
      },
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      itemclick: function (e: any) {
        if (
          typeof e.dataSeries.visible === "undefined" ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
    },
    data: [
      {
        type: "column",
        showInLegend: true,
        name: "Doanh thu",
        axisYType: "secondary",
        yValueFormatString: "đ#,###",
        dataPoints: this.dataPrice,
      },
      {
        type: "spline",
        showInLegend: true,
        name: "Số đơn đặt hàng",
        dataPoints: this.dataQuanlity
      },
    ],
  };

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    this.setTitle("Bookstore");
    this.getallUserOrderedBooks();
    if (this.role === "admin") {
      this.isAdmin = true;
      this.isLogin = true;
    }
    if (this.role === "seller") {
      this.isSeller = true;
      this.isLogin = true;
    }
    if (this.role === "user") {
      this.isUser = true;
      this.isLogin = true;
    }
  
  }

  nameEventHander($event: any) {
    this.opened2 = $event;
    console.log("2", this.opened2);
  }

  public setTitle(dashboard: string) {
    this.titleService.setTitle(dashboard);
  }

  doExport() {
    let headerTTThietHai: any[] = ["STT", "Tháng", "Doanh thu"];

    let keyTTThietHai: any[] = ["TT", "thang", "Doanhthu"];

    let dataTemp: any[] = [];

    this.dataSource.forEach((element, index) => {
      let item = {
        TT: index + 1,
        thang: element.label,
        Doanhthu: element.y + "đ",
      };
      dataTemp.push(item);
    });

    let widthThietHai: any[] = [8, 10, 40];
    let excelTTThietHai: Excel = {
      title: "Thống kê Doanh thu cả năm",
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
    this._exporHelperService.generateExcel("Doanh-thu" + timeSpan, arrayExcel);
  }
  doExport1() {
    let headerTTThietHai: any[] = ["STT", "Tháng", "Số lượng đơn"];
 
    let keyTTThietHai: any[] = ["TT", "thang", "SL"];

    let dataTemp: any[] = [];

    this.dataSl.forEach((element, index) => {
      let item = {
        TT: index + 1,
        thang: element.label,
        SL: element.y + " Đơn",
      };
      dataTemp.push(item);
    });

    let widthThietHai: any[] = [8, 10, 50];
    let excelTTThietHai: Excel = {
      title: "Thống kê Số lượng đơn cả năm",
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
    this._exporHelperService.generateExcel("Don-hang" + timeSpan, arrayExcel);
  }

  getallUserOrderedBooks() {
    console.log("order status api called");
    this.adminservice.getAllOrderedBooks().subscribe((response) => {
      this.orderedBooks = response.obj;
    

      for (let i = 0; i < response.obj.length; i++) {
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
          ngayMua:  formatDate(response.obj[i].orderPlacedTime, "dd/MM/yyyy", "en-US"),
          name: response.obj[i].name,
          phone: response.obj[i].mobileNumber,
        };

        this.orderdetails.push(p);
      }
      let x=0,x1=0,x2=0,x3=0,x4=0,x5=0,x6=0,x7=0,x8=0,x9=0,x10=0,x11=0,x12=0;
      let p1=0,p2=0,p3=0,p4=0,p5=0,p6=0,p7=0,p8=0,p9=0,p10=0,p11=0,p12=0;
      for (let i=0;i<this.orderdetails.length;i++){
        if(this.orderdetails[i].ngayMua.slice(3, 5)=='01'){
          x1+=this.orderdetails[i].totalprice;
          p1+=this.orderdetails[i].quantityOfBook
        }
        if(this.orderdetails[i].ngayMua.slice(3, 5)=='02'){
          x2+=this.orderdetails[i].totalprice;
          p2+=this.orderdetails[i].quantityOfBook
        }
          if(this.orderdetails[i].ngayMua.slice(3, 5)=='03'){
            x+=this.orderdetails[i].totalprice;
            p3+=this.orderdetails[i].quantityOfBook
          }
          if(this.orderdetails[i].ngayMua.slice(3, 5)=='04'){
            x4+=this.orderdetails[i].totalprice;
            p4+=this.orderdetails[i].quantityOfBook
          }
          if(this.orderdetails[i].ngayMua.slice(3, 5)=='05'){
            x5+=this.orderdetails[i].totalprice;
            p5+=this.orderdetails[i].quantityOfBook
          }
          if(this.orderdetails[i].ngayMua.slice(3, 5)=='06'){
            x6+=this.orderdetails[i].totalprice;
            p6+=this.orderdetails[i].quantityOfBook
          }
          if(this.orderdetails[i].ngayMua.slice(3, 5)=='07'){
            x7+=this.orderdetails[i].totalprice;
            p7+=this.orderdetails[i].quantityOfBook
          }
          if(this.orderdetails[i].ngayMua.slice(3, 5)=='08'){
            x8+=this.orderdetails[i].totalprice;
            p8+=this.orderdetails[i].quantityOfBook
          }
          if(this.orderdetails[i].ngayMua.slice(3, 5)=='09'){
            x9+=this.orderdetails[i].totalprice;
            p9+=this.orderdetails[i].quantityOfBook
          }
          if(this.orderdetails[i].ngayMua.slice(3, 5)=='10'){
            x10+=this.orderdetails[i].totalprice;
            p10+=this.orderdetails[i].quantityOfBook
          }
          if(this.orderdetails[i].ngayMua.slice(3, 5)=='11'){
            x11+=this.orderdetails[i].totalprice;
            p11+=this.orderdetails[i].quantityOfBook
          }
          if(this.orderdetails[i].ngayMua.slice(3, 5)=='02'){
            x12+=this.orderdetails[i].totalprice;
            p12+=this.orderdetails[i].quantityOfBook
          }
          
      }
      var data= [
        { label: "Jan", y: x1 },
        { label: "Feb", y: x2 },
        { label: "Mar", y: x },
        { label: "Apr", y: x4 },
        { label: "May", y: x5 },
        { label: "Jun", y: x6 },
        { label: "Jul", y: x7 },
        { label: "Aug", y: x8 },
        { label: "Sep", y: x9 },
        { label: "Oct", y: x10 },
        { label: "Nov", y: x11 },
        { label: "Dec", y: x12 },
      ]
      var data1=[
        { label: "Jan", y: p1 },
        { label: "Feb", y: p2 },
        { label: "Mar", y: p3 },
        { label: "Apr", y: p4 },
        { label: "May", y: p5 },
        { label: "Jun", y: p6 },
        { label: "Jul", y: p7 },
        { label: "Aug", y: p8 },
        { label: "Sep", y: p9 },
        { label: "Oct", y: p10 },
        { label: "Nov", y: p11 },
        { label: "Dec", y: p12 },
      ]
      var item1={label: "Jan", y:x1}
      let item2={label: "Feb", y:x2}
      let item3={ label: "Mar", y:x }
      let item4={ label: "Apr", y:x4 }
      let item5={ label: "May", y:x5 }
      let item6={ label: "Jun", y:x6 }
      let item7={ label: "Jul", y:x7 }
      let item8={ label: "Aug", y:x8 }
      let item9= { label: "Sep", y:x9 }
      let item10= { label: "Oct", y:x10 }
      let item11= { label: "Nov", y:x11 }
      let item12={ label: "Dec", y:x12 }

      var tem1={label: "Jan", y:p1}
      let tem2={label: "Feb", y:p2}
      let tem3={ label: "Mar", y:p3 }
      let tem4={ label: "Apr", y:p4 }
      let tem5={ label: "May", y:p5 }
      let tem6={ label: "Jun", y:p6 }
      let tem7={ label: "Jul", y:p7 }
      let tem8={ label: "Aug", y:p8 }
      let tem9= { label: "Sep", y:p9 }
      let tem10= { label: "Oct", y:p10 }
      let tem11= { label: "Nov", y:p11 }
      let tem12={ label: "Dec", y:p12 }
      this.dataSource=data
      this.dataSl=data1
      this.dataPrice.push(item1,item2,item3,item4,item5,item6,item7,item8,item9,item10,item11,item12);
      this.dataQuanlity.push(tem1,tem2,tem3,tem4,tem5,tem6,tem7,tem8,tem9,tem10,tem11,tem12)
    });
  }
}

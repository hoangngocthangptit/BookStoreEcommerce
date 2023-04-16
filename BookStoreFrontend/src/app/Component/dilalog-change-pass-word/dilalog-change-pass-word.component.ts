import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/Service/user.service";
import { Location } from "@angular/common";
@Component({
  selector: "app-dilalog-change-pass-word",
  templateUrl: "./dilalog-change-pass-word.component.html",
  styleUrls: ["./dilalog-change-pass-word.component.scss"],
})
export class DilalogChangePassWordComponent implements OnInit {
  userId: any;
  hide = true;
  private canGoBack: boolean = false;
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private readonly location: Location,
    private userService: UserService
  ) {
    this.canGoBack = !!this.router.getCurrentNavigation()?.previousNavigation;
  }

  formBCTKCC: FormGroup = this.fromBuilder.group({
    Password: [null, [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get("userId");
  }

  doUpdate() {
    if (this.formBCTKCC.invalid) {
      this.formBCTKCC.markAllAsTouched();
      this.matSnackBar.open("Kiểm tra thông tin đầu vào", "ok");
      return;
    } else {
      let data = {
        password: this.formBCTKCC.get("Password").value,
      };
      this.userService
        .UpdatepassWord(this.userId, data)
        .subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.matSnackBar.open(res.message, "ok", {
              duration: 4000,
            });
            this.router.navigateByUrl("books");
          }
        });
    }
  }

  goBack(): void {
    if (this.canGoBack) {
      this.location.back();
    }
  }
}

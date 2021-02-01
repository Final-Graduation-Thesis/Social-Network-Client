import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/service/user.service';

@Component({
	selector: 'apps-profile-view',
	templateUrl: './profile.view.html',
	styleUrls: ['./profile.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsProfileView implements OnInit{

    @ViewChild('picker') datePicker: ElementRef;
    user: any;
    avatar: any;
    form: FormGroup;
    dateChange: boolean = false;
    genders: any[] = [
        {
            value: 1,
            name: "Nam"
        },
        {
            value: 0,
            name: "Nữ"
        }
    ]
    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
           this.user = this.userService.getInfo();
           this.user.gender = parseInt(this.user.gender);
           this.form = this.formBuilder.group({
			avatar: [""],
			gender: [""],
			username: ["", Validators.required],
			email: ["", Validators.required],
            hometown: [""],
            address: [""],
            birthday: [""]
        });
    }

    onFileChanged(event: any) {
        this.avatar = event.target.files[0];
        console.log(event);
        let file = event.target.files[0];
        let pattern = /image-*/;
        let reader = new FileReader();
        if (!file.type.match(pattern)) {
            alert('Định dạng không hợp lệ');
            return;
        }
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }

    _handleReaderLoaded(e) {
        let reader = e.target;
        this.user.avatar = reader.result;
    }

    onChangeBirthday(event: any): void {
        this.dateChange = true;
    }

    onChangeGender(): void {

    }

    submit(): void {
        let body = new FormData();
        console.log(this.form.value);
        body.append("username", this.form.value.username);
        body.append("email", this.form.value.email);
        body.append("gender", this.form.value.gender);
        body.append("file", this.avatar ? this.avatar : localStorage.getItem('avatar'));
        if (this.dateChange) {
            let birthday = `${this.form.value.birthday.getDate()}-${this.form.value.birthday.getMonth() + 1}-${this.form.value.birthday.getFullYear()}`;
            body.append("birthday", birthday);
        } else {
            let bdConvert = new Date(this.user.birthday);
            let birthday = `${bdConvert.getDate()}-${bdConvert.getMonth() + 1}-${bdConvert.getFullYear()}`;
            body.append("birthday", birthday);
        }
        body.append("address", this.form.value.address != "null" ? this.form.value.address : "");
        body.append("hometown", this.form.value.hometown != "undefined" ? this.form.value.hometown : "");
        if (!this.form.valid) {
			this.snackBar.open("Vui lòng nhập thông tin", null, {
				duration: 1000,
				panelClass: 'error'
			});
		} else {
            this.userService.put(parseInt(localStorage.getItem("user_id")), body).subscribe(
                {
                    next: (res) => {
                        this.userService.setSession(res);
                        this.snackBar.open("Cập nhật thông tin thành công", null, {
                            duration: 1000,
                            panelClass: 'success'
                        });
                    },
                    error : (err) => {
                        this.snackBar.open("Đã xảy ra lỗi, vui lòng thử lại sau.", null, {
                            duration: 1000,
                            panelClass: 'error'
                        });
                    }
            })
        }
        
    }
}
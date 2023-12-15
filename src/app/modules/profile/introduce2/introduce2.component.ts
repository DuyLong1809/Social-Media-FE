import { Component, Input } from '@angular/core';
import { IgetAllPostImage } from '../../handle/interface';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-introduce2',
  templateUrl: './introduce2.component.html',
  styleUrls: ['./introduce2.component.scss']
})
export class Introduce2Component {

  @Input() address!: string;
  @Input() phone!: number
  @Input() workplace!: string
  @Input() education!: string;
  @Input() birthdate!: string;
  @Input() userIdFromStorage: number | null | undefined;
  @Input() userId: number | null | undefined;

  configUrl = environment.ApiUrl;

  ngOnInit(): void {
  }

  public tabs = [
    { title: "Tổng quan", link: "", active: true },
    { title: "Công việc học vấn", link: "", active: false },
    { title: "Nơi từng sống", link: "", active: false },
    { title: "Thông tin hiên hệ và cơ bản", link: "", active: false },
    { title: "Gia đình và các mối quan hệ", link: "", active: false },
    { title: "Chi tiết về bạn", link: "", active: false },
    { title: "Sự kiện trong đời", link: "", active: false },
  ];

  public overviews = [
    {
      title: "Thêm nơi làm việc",
      type: 1,
      icon: 'apartment',
      data: `Đang làm việc tại: ${this.workplace}`,
    },
    {
      title: "Thêm trường cao đẳng/đại học",
      type: 2,
      icon: 'school',
      data: `Đang theo học tại: ${this.education}`,
    },
    {
      title: "Thêm tỉnh/thành phố hiện tại",
      type: 3,
      icon: 'location_on',
      data: `Thành phố: ${this.address}`,
    },
    {
      title: "Thêm quê quán",
      type: 4,
      icon: 'location_on',
      data: `Sống tại: ${this.address}`,
    },
    {
      title: "Thêm số điện thoại",
      type: 5,
      icon: 'phone',
      data: `Số điện thoại: ${this.phone}`,
    },
  ]

}

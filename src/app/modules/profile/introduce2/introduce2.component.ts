import { Component } from '@angular/core';

@Component({
  selector: 'app-introduce2',
  templateUrl: './introduce2.component.html',
  styleUrls: ['./introduce2.component.scss']
})
export class Introduce2Component {
  public tabs = [
    {title: "Tổng quan", link: "", active: true},
    {title: "Công việc học vấn", link: "", active: false},
    {title: "Nơi từng sống", link: "", active: false},
    {title: "Thông tin hiên hệ và cơ bản", link: "", active: false},
    {title: "Gia đình và các mối quan hệ", link: "", active: false},
    {title: "Chi tiết về bạn", link: "", active: false},
    {title: "Sự kiện trong đời", link: "", active: false},
  ];

  public overviews = [
    {
      title: "Thêm nơi làm việc",
      type: 1,
    },
    {
      title: "Thêm trường trung học",
      type: 2,
    },
    {
      title: "Thêm trường cao đẳng/đại học",
      type: 3,
    },
    {
      title: "Thêm tỉnh/thành phố hiện tại",
      type: 4,
    },
    {
      title: "Thêm quê quán",
      type: 5,
      data: "Hà Nội",
    },
    {
      title: "Thêm tình tạng mối quan hệ",
      type: 6,
    },
  ]

}

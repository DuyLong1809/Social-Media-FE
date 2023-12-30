import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-image2',
  templateUrl: './image2.component.html',
  styleUrls: ['./image2.component.scss']
})
export class Image2Component {
  @Input() images: any[] = [];

  configUrl = environment.ApiUrl;

}

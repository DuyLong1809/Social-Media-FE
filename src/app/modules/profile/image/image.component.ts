import { Component, Input } from '@angular/core';
import { IgetAllPostImage } from '../../handle/interface';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() images!: IgetAllPostImage[];
  configUrl = environment.ApiUrl;

}

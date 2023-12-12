import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.scss']
})
export class IntroduceComponent {
  
  @Input() bio!: string
  @Input() address!: string;
  @Input() phone!: number
  @Input() website!: string;
  @Input() workplace!: string
  @Input() education!: string;
  @Input() birthdate!: string;
  @Input() userIdFromStorage: number | null | undefined;
  @Input() userId: number | null | undefined;

  public isStory: boolean = false;

  handleStory(){
    this.isStory = !this.isStory;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.scss']
})
export class IntroduceComponent {
  public isStory: boolean = false;

  handleStory(){
    this.isStory = !this.isStory;
  }
}

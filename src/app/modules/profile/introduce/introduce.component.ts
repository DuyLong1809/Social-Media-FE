import { Component } from '@angular/core';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.scss']
})
export class IntroduceComponent {
  public isStory: boolean = false;
  // public isSuccessStory: boolean = false;
  public textStory: string = "Thêm tiểu sử";
  public storyValue: string = '';
  public isButtonActive: boolean = false;

  handleStory(){
    this.isStory = !this.isStory;
  }

  saveStory(){
    console.log(123);
    
    // this.isSuccessStory = true
    this.isStory = false;
    this.textStory = "Chỉnh sửa tiểu sử"
  }

  onTextareaChange(){
    this.isButtonActive = this.storyValue.trim() !== "";
  }
  show(){
    
  }
}

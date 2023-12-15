import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  public isBio: boolean = false;
  public isButtonActive: boolean = false;
  bioForm!: FormGroup;

  handleBio() {
    this.isBio = !this.isBio;
  }

  saveBio() {
    this.isBio = false;
  }

  onTextareaChange() {
    this.isButtonActive = this.bio.trim() !== "";
  }
  
  show() {

  }
}

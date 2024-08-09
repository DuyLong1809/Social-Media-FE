import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.scss']
})
export class IntroduceComponent {

  @Input() bio!: string
  @Input() address!: string;
  @Input() website!: string;
  @Input() workplace!: string
  @Input() education!: string;
  @Input() userIdFromStorage: number | null | undefined;
  @Input() userId: number | null | undefined;

  public isBio: boolean = false;
  public isButtonActive: boolean = false;
  bioForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.bioForm = this.fb.group({
      bio: ['', Validators.required],
    });
  }

  handleBio() {
    this.isBio = !this.isBio;
  }

  saveBio() {
    this.isBio = false;
  }

  onTextareaChange() {
    this.isButtonActive = this.bio.trim() !== "";
  }

  openEditProfile() {

  }
}

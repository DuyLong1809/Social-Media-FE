import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, background: string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = [background];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'right';
    this._snackBar.open(message, undefined, config);
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pat',
  imports: [FormsModule],
  templateUrl: './pat.component.html',
  styleUrl: './pat.component.scss',
  standalone: true
})
export class PatComponent {
  protected patValue:string = "";

  ngOnInit() {
    this.patValue = sessionStorage.getItem('pat') || '';
  }

  onSetPat() {
    sessionStorage.setItem('pat', this.patValue);
  }
}


import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerService } from '@app/_services/spinner.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  imports: [
    MatProgressSpinner,
  ],
})
export class SpinnerComponent implements OnInit {
  displaySpinner = false;

  constructor(
    private spinnerService: SpinnerService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit() {
    this.spinnerService.spinnerState$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state: boolean) => {
        this.displaySpinner = state;
      });
  }
}

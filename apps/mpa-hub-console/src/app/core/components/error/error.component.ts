import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mpa-hub-core-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit, OnChanges {
  reason = 'Something went wrong';
  reasonDesc = 'We\'re sorry. Please try again leter.';
  title = 'Something Went Wrong';

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  initReason(): void {
    const queryReason = this.activatedRoute.snapshot.queryParams?.['reason'];
    if (queryReason) {
      switch (queryReason) {
        case '404':
          this.reason = 'Resource Not Found';
          this.reasonDesc = 'We\'re sorry. The resource you are looking for cannot be found.';
          this.title = 'Page not found';
          break;
        case '401':
          this.reason = 'Login Required';
          this.reasonDesc = 'We\'re sorry. The resource you are looking need authentication credentials.';
          this.title = 'Unauthorized';
          break;
        case '403':
          this.reason = 'Limited access';
          this.reasonDesc = 'We\'re sorry. The resource you are looking for cannot be show.';
          this.title = 'Forbidden';
          break;
        case 'permission':
          this.reason = 'Permission Denied';
          this.reasonDesc = 'We\'re sorry. You don\'t have any permission to access this page.';
          this.title = 'Forbidden access';
          break;
        default:
          break;
      }
    }
  }

  ngOnChanges(): void {
    this.initReason();
  }

  ngOnInit(): void {
    this.initReason();
  }
}

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, SortDirection } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, debounceTime, distinctUntilChanged, merge, startWith, switchMap, map, catchError, of } from 'rxjs';
import { UserResponse, UniversalPaginationParameters } from '../../../core/models';
import { LoadingAnimation, queryParamBuilder } from '../../../core/utils';
import { UsersService } from './users.service';

@Component({
  selector: 'mpa-hub-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    ...LoadingAnimation
  ]
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resultsLength = 0;
  isLoadingResults = true;
  isLoadingAction = false;

  pageSize = 10;
  pageIndex = 0;
  sortBy = 'no';
  sortByDirection: SortDirection = 'asc';
  contentSearchActive = false;
  searchSubscription!: Subscription;
  searchControl = new FormControl('');

  displayedColumns: string[] = ['no', 'username', 'email'];
  dataSource: UserResponse[] = [];
  dataSourceSubscription!: Subscription;
  dataSortSubscription!: Subscription;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private router: Router,
  ) { }

  runInitTableQuery(): void {
    const queryInitTable = this.activatedRoute.snapshot.queryParams?.['initTable'];
    if (queryInitTable) {
      const parseTable = queryInitTable.split(',');
      if (parseTable.length === 5) {
        this.pageSize = Number(parseTable[0]);
        this.pageIndex = Number(parseTable[1]);

        this.sortBy = parseTable[2];
        this.sortByDirection = parseTable[3];
        if (parseTable[4] !== 'null') {
          this.contentSearchActive = true;
          this.searchControl.setValue(parseTable[4]);
        }
      }

      this.router.navigate([], {
        queryParams: {
          initTable: null
        },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    }
  }

  actionRefresh(): void {
    this.runTable();
  }

  actionSearch(): void {
    this.contentSearchActive = !this.contentSearchActive;

    if (this.contentSearchActive && !this.searchSubscription) {
      this.searchSubscription = this.searchControl.valueChanges
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(() => this.actionSearchHandle());
    }

    if (!this.contentSearchActive) {
      this.searchControl.setValue('');
    }
  }

  actionSearchHandle(): void {
    this.paginator.pageIndex = 0;
    this.runTable();
  }

  runTable(): void {
    this.getDataTableDestroy();
    this.dataSourceSubscription = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          const params: UniversalPaginationParameters = {
            pageSize: this.paginator.pageSize,
            pageIndex: this.paginator.pageIndex,
            orderBy: this.sort.active,
            orderByDirection: this.sort.direction,
          };
          if (this.searchControl.value.toString().length > 0) {
            params.query = this.searchControl.value;
          }

          return this.usersService.getList(params);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.data?.total ?? 0;

          return data.data?.list.map((item, idx) => {
            return {
              ...item,
              no: (this.paginator.pageIndex * this.paginator.pageIndex) + idx + 1,
            };
          }) ?? [];
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return of([]);
        })
      ).subscribe(data => this.dataSource = data);
  }

  tableAction(element: UserResponse, type: string): void {

    const generateParam = queryParamBuilder([
      this.paginator.pageSize.toString(),
      this.paginator.pageIndex.toString(),
      this.sort.active,
      this.sort.direction.toString(),
      this.searchControl.value.length > 0 ? this.searchControl.value : `null`,
    ]);
    this.router.navigate([`/${type}/${element.ID}`],
      {
        queryParams: {
          returnInitTable: generateParam
        }
      }
    );
  }

  ngOnInit(): void {
    console.log();
  }

  ngAfterViewInit(): void {
    this.dataSortSubscription = this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.runTable();
  }

  ngOnDestroy(): void {
    this.getDataTableDestroy();

    if (this.dataSortSubscription) {
      this.dataSortSubscription.unsubscribe();
    }

    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  getDataTableDestroy(): void {
    if (this.dataSourceSubscription) {
      this.dataSourceSubscription.unsubscribe();
    }
  }

}

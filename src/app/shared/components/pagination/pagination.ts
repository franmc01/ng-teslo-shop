import { Component, input, computed, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss'
})
export class Pagination {
  currentPage = input<number>(1)
  totalPages = input<number>(0)

  activePage = linkedSignal(() => {
    return this.currentPage();
  })

  pagesList = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  })
}

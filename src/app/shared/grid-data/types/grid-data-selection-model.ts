import {SelectionModel} from '@angular/cdk/collections';

export class GridDataSelectionModel<T> extends SelectionModel<T> {
  constructor(multiple: boolean = false, initiallySelectedValues?: T[]) {
    super(multiple, initiallySelectedValues);
  }

  public selectAll(items: T[]) {
    items.forEach(item => this.select(item));
  }

  public getSelected(): T[] {
    return this.selected;
  }

  public clearSelection(): void {
    this.clear();
  }
}

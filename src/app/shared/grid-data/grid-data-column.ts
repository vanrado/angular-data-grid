import {TemplateRef} from '@angular/core';

export interface GridDataColumn { columnDef: string; header: string; cellTemplate?: TemplateRef<any> | null; }

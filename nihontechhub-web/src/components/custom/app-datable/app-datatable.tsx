'use client';

import { AppDataTableContent } from './app-datatable-content';
import { AppDataTableFilter } from './app-datatable-filter';
import { AppDataTablePagination } from './app-datatable-pagination';

type TAppDataTableProps = {
  headerLabel?: string;
  searchKey?: string;
};

export function AppDataTable({ headerLabel, searchKey }: TAppDataTableProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-hidden rounded-sm border border-muted p-4">
      {headerLabel && <h2 className="scroll-m-20 pt-4 text-3xl font-semibold">{headerLabel}</h2>}
      <AppDataTableFilter searchKey={searchKey} />
      <AppDataTableContent />
      <AppDataTablePagination />
    </div>
  );
}

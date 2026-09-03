'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ChevronDown } from 'lucide-react';

type TAppDatatableFilterProps = {
  searchKey?: string;
};

export function AppDataTableFilter({ searchKey }: TAppDatatableFilterProps) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder={`Search by ${searchKey || ''} ...`}
        // value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
        // onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
        className="max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem className="capitalize" checked={true}>
            Colume A
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem className="capitalize" checked={false}>
            Colume B
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem className="capitalize" checked={false}>
            Colume C
          </DropdownMenuCheckboxItem>
          {/* {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })} */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

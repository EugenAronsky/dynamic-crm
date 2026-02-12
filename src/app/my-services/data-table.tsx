'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  ArrowBigDownDash,
  ArrowBigUpDash,
  CheckCheck,
  CheckCheckIcon,
  EyeOff,
  ListRestart,
  MousePointerClick,
  Plus,
  SquareDashedMousePointer,
  Trash2,
} from 'lucide-react';
import { useMotionValue } from 'motion/react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const ref = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState(0);

  useLayoutEffect(() => {
    setMaxH(ref.current?.clientHeight ?? 0);
    const controller = new AbortController();
    window.addEventListener('resize', () => setMaxH(ref.current?.clientHeight ?? 0), {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, [ref]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<VisibilityState>({});

  const reset = useCallback(() => {
    setColumnVisibility({});
    setColumnFilters([]);
    setRowSelection({});
    setSorting([]);
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const isSelected = Object.keys(rowSelection).length > 0;

  return (
    <div ref={ref} className="relative flex h-full w-full flex-col gap-2 overflow-hidden p-2">
      <div className="flex justify-between gap-2 *:shadow-[0_0_4px_0] *:shadow-black/15">
        <Button className="cursor-pointer bg-blue-500! hover:brightness-95">
          <span>Add new</span>
          <Plus />
        </Button>

        <Input
          placeholder="Filter service..."
          className="max-w-96 border-none"
          value={(table.getColumn('service')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('service')?.setFilterValue(event.target.value)}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="cursor-pointer">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    className="cursor-pointer capitalize"
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size={'icon'} className="cursor-pointer" onClick={() => reset()}>
          <ListRestart />
        </Button>

        <Button variant="ghost" className="ml-auto cursor-pointer border-green-200 text-green-500!">
          <span>Export XLS</span>
          <ArrowBigDownDash />
        </Button>

        <Button variant="ghost" className="cursor-pointer border-blue-200 text-blue-500!">
          <span>Import XLS</span>
          <ArrowBigUpDash />
        </Button>
      </div>

      <div
        className={cn(
          'relative h-full w-full',
          '*:h-full *:max-h-full *:overflow-hidden *:rounded-md *:shadow-[0_0_4px_0] *:shadow-black/15'
        )}
      >
        <Table className="relative table-fixed">
          <TableHeader className="flex w-full border-b bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="table w-full table-fixed border-none bg-transparent! *:text-center last:mr-2.75"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{ width: header.getSize() }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody
            style={{
              maxHeight: `${maxH - (isSelected ? 151 : 101)}px`,
              minHeight: `${maxH - (isSelected ? 151 : 101)}px`,
            }}
            className="custom-scrollbar flex w-full min-w-full flex-col overflow-y-scroll transition-all"
          >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="table w-full table-fixed *:text-center"
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="table w-full table-fixed">
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex h-full max-h-fit items-center justify-between gap-2 rounded-md bg-white p-1 shadow-[0_0_4px_0] shadow-black/15">
        <span className="text-muted-foreground flex items-center justify-center gap-2 pl-2 text-xs">
          <SquareDashedMousePointer size={18} />
          Selected items • {Object.keys(rowSelection).length}/{data.length}
        </span>

        <div className="grid grid-cols-3 gap-2 *:cursor-pointer">
          <Button size={'sm'} className="bg-emerald-100! text-emerald-500 hover:brightness-95">
            <CheckCheck /> Activate
          </Button>

          <Button size={'sm'} className="bg-slate-100! text-slate-500 hover:brightness-95">
            <EyeOff /> Hide
          </Button>

          <Button size={'sm'} variant={'destructive'} className="hover:brightness-95">
            <Trash2 /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { SelectValue } from '@radix-ui/react-select';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Ellipsis, Settings } from 'lucide-react';
import { useState } from 'react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const SERVICE_STATUS = ['Active', 'Hidden', 'Draft'] as const;
const SERVICE_CATEGORY_META: Record<ServiceCategory, { icon: string; color: string }> = {
  Beauty: { icon: '💄', color: 'bg-pink-100 text-pink-600' },
  Repair: { icon: '🛠️', color: 'bg-amber-100 text-amber-600' },
  Cleaning: { icon: '🧹', color: 'bg-sky-100 text-sky-600' },
  Consulting: { icon: '💼', color: 'bg-indigo-100 text-indigo-600' },
  Creative: { icon: '🎨', color: 'bg-purple-100 text-purple-600' },
  'IT & Digital': { icon: '💻', color: 'bg-blue-100 text-blue-600' },
  Coaching: { icon: '📚', color: 'bg-emerald-100 text-emerald-600' },
  Fitness: { icon: '🏋️', color: 'bg-green-100 text-green-600' },
  Events: { icon: '🎉', color: 'bg-fuchsia-100 text-fuchsia-600' },
  Logistics: { icon: '🚚', color: 'bg-orange-100 text-orange-600' },
  Automotive: { icon: '🚗', color: 'bg-red-100 text-red-600' },
  'Home Services': { icon: '🏠', color: 'bg-yellow-100 text-yellow-700' },
  'Pet Care': { icon: '🐾', color: 'bg-lime-100 text-lime-600' },
  Childcare: { icon: '👶', color: 'bg-rose-100 text-rose-600' },
  'Food & Catering': { icon: '🍽️', color: 'bg-teal-100 text-teal-600' },
  'Real Estate': { icon: '🏢', color: 'bg-cyan-100 text-cyan-600' },
  Tourism: { icon: '✈️', color: 'bg-sky-100 text-sky-700' },
  Security: { icon: '🛡️', color: 'bg-slate-200 text-slate-700' },
  Manufacturing: { icon: '🏭', color: 'bg-gray-200 text-gray-700' },
  Other: { icon: '📦', color: 'bg-neutral-200 text-neutral-700' },
};

export const SERVICE_CATEGORIES = [
  'Beauty',
  'Repair',
  'Cleaning',
  'Consulting',
  'Creative',
  'IT & Digital',
  'Coaching',
  'Fitness',
  'Events',
  'Logistics',
  'Automotive',
  'Home Services',
  'Pet Care',
  'Childcare',
  'Food & Catering',
  'Real Estate',
  'Tourism',
  'Security',
  'Manufacturing',
  'Other',
] as const;

type ServiceStatus = (typeof SERVICE_STATUS)[number];
type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export type Service = {
  service: string;
  category: ServiceCategory;
  price: number;
  duration: string;
  availability: string;
  status: ServiceStatus;
};

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: 'service',
    header: 'Service',
    cell: ({ getValue }) => {
      return <div className="w-full overflow-hidden px-2 text-ellipsis">{getValue<string>()}</div>;
    },
  },
  {
    size: 100,

    header: ({ column }) => {
      const [value, setValue] = useState<ServiceCategory | undefined>();

      return (
        <Select value={value} key={`status-select-${value}`}>
          <SelectTrigger
            className={cn(
              'max-h-7 w-full min-w-17.5 cursor-pointer justify-center rounded-sm border-none bg-white px-2 py-0 shadow-xs shadow-black/20 [&>svg]:hidden',
              value ? (SERVICE_CATEGORY_META[value]?.color ?? '') : 'text-black!',
              'transition-all hover:brightness-95'
            )}
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent align="center" position="popper">
            <SelectGroup>
              {SERVICE_CATEGORIES.map((categorie) => (
                <SelectItem
                  value={categorie}
                  key={`status-${categorie}`}
                  onPointerDown={() => {
                    column.setFilterValue(value === categorie ? undefined : categorie);
                    setValue((curr) => (curr === categorie ? undefined : categorie));
                  }}
                >
                  {SERVICE_CATEGORY_META[categorie]?.icon} {categorie}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
    accessorKey: 'category',
    cell: ({ getValue }) => {
      const value = getValue<ServiceCategory>();
      return (
        <Badge className={cn('rounded-sm', SERVICE_CATEGORY_META[value]?.color ?? '')}>
          {`${SERVICE_CATEGORY_META[value]?.icon} ${value}`}
        </Badge>
      );
    },
  },
  {
    size: 60,
    header: ({ column }) => (
      <Button
        size={'sm'}
        variant={'ghost'}
        className="cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        💵 Price
        <ArrowUpDown />
      </Button>
    ),
    accessorKey: 'price',
    cell: ({ getValue }) => {
      const amount = parseFloat(getValue<string>());
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return formatted;
    },
  },
  {
    size: 80,
    header: 'Duration',
    accessorKey: 'duration',
  },
  {
    size: 80,
    header: 'Availability',
    accessorKey: 'availability',
  },
  {
    size: 45,
    header: ({ column }) => {
      const [value, setValue] = useState<string | undefined>();

      return (
        <Select value={value} key={`status-select-${value}`}>
          <SelectTrigger
            className={cn(
              'max-h-7 w-full min-w-17.5 cursor-pointer justify-center rounded-full border-none bg-white px-2 py-0 text-black! shadow-xs shadow-black/20 [&>svg]:hidden',
              value === 'Active' && 'bg-emerald-100 text-emerald-500!',
              value === 'Draft' && 'bg-amber-100 text-amber-500!',
              value === 'Hidden' && 'bg-slate-100 text-slate-500!',
              'transition-all hover:brightness-95'
            )}
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent align="center" position="popper" className="min-w-0">
            <SelectGroup>
              {SERVICE_STATUS.map((status) => (
                <SelectItem
                  value={status}
                  key={`status-${status}`}
                  onPointerDown={() => {
                    column.setFilterValue(value === status ? undefined : status);
                    setValue((curr) => (curr === status ? undefined : status));
                  }}
                >
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
    accessorKey: 'status',
    cell: ({ getValue }) => {
      const value = getValue<ServiceStatus>();
      return (
        <Badge
          className={cn(
            value === 'Active' && 'bg-emerald-100 text-emerald-500',
            value === 'Draft' && 'bg-amber-100 text-amber-500',
            value === 'Hidden' && 'bg-slate-100 text-slate-500'
          )}
        >
          {value}
        </Badge>
      );
    },
  },
  {
    size: 28,
    header: '',
    accessorKey: 'actions',
    cell: ({ column }) => {
      return (
        <Button size={'icon-sm'} variant={'secondary'}>
          <Ellipsis />
        </Button>
      );
    },
  },
];

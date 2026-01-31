import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Separator } from '../../ui/separator';
import { Tabs, TabsContent } from '../../ui/tabs';

const chunkArray = ({
  size,
  minYear,
  maxYear,
}: {
  size: number;
  minYear: number;
  maxYear: number;
}) => {
  const result = [];
  const array = Array.from({ length: maxYear - minYear + 1 })
    .map((_, index) => minYear + index)
    .reverse();
  for (let i = 0; i < array.length; i += size) result.push(array.slice(i, i + size));
  return result;
};

export default function YearPicker({
  defaultYear,
  onChange,
}: {
  defaultYear?: number;
  onChange?: (year: number) => void;
}) {
  const minYear = 2000;
  const maxYear = new Date().getFullYear();
  const yearChunkArray = chunkArray({ size: 12, maxYear: maxYear, minYear: minYear });
  const tabs = yearChunkArray.map((page) => `${page.at(0)}-${page.at(page.length - 1)}`);

  const [open, setOpen] = React.useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [year, setYear] = React.useState<number | undefined>(maxYear);

  useEffect(() => {
    if (defaultYear) {
      setYear(defaultYear);
      onChange && onChange(defaultYear);
    }
  }, [defaultYear]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          className="w-fit cursor-pointer justify-between font-sans! font-normal"
        >
          {year ?? 'Select year'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0 **:font-sans!" align="center">
        <header className="flex items-center p-3">
          <Button
            size={'icon'}
            variant={'outline'}
            disabled={tabIndex === 0}
            className="cursor-pointer"
            onClick={() => tabIndex > 0 && setTabIndex((curr) => curr - 1)}
          >
            <ChevronLeft />
          </Button>
          <div className="mx-auto">{tabs[tabIndex]}</div>
          <Button
            size={'icon'}
            variant={'outline'}
            className="cursor-pointer"
            disabled={tabIndex === yearChunkArray.length - 1}
            onClick={() => tabIndex < yearChunkArray.length - 1 && setTabIndex((curr) => curr + 1)}
          >
            <ChevronRight />
          </Button>
        </header>

        <Separator />

        <Tabs value={tabs[tabIndex]}>
          {yearChunkArray.map((page, index) => (
            <TabsContent
              key={tabs[index]}
              value={tabs[index]}
              className="grid grid-cols-3 gap-1 p-3"
            >
              {page.map((x) => (
                <Button
                  onClick={() => {
                    setYear(x);
                    onChange && onChange(x);
                    setTimeout(() => setOpen(false), 150);
                  }}
                  className={cn('cursor-pointer', x === year && 'bg-primary! text-white!')}
                  variant={'ghost'}
                  key={x}
                >
                  {x}
                </Button>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}

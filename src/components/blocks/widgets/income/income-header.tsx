'use client';
import MonthPicker, { months } from '@/components/blocks/pickers/month-picker';
import YearPicker from '@/components/blocks/pickers/year-picker';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Item, ItemContent, ItemFooter, ItemHeader } from '@/components/ui/item';
import { differenceInCalendarDays, getMonth, getYear } from 'date-fns';
import { Ellipsis, Undo2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { RangeDatePicker } from '../../pickers/range-date-picker';
import { IncomeContext } from './income';
import { getPeriodData } from './income-halpers';

function IncomeHeader() {
  const { setter, getter } = useContext(IncomeContext);
  const [range, setRange] = useState<DateRange | undefined>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <ItemHeader className="w-full basis-0">
      <span className="font-semibold">Overview Income</span>
      <div className="flex gap-2">
        <Button
          size={'icon'}
          variant="outline"
          className="cursor-pointer"
          disabled={!Boolean(getter.history.length > 1)}
          onClick={() => {
            const prev = getter.history.splice(getter.history.length - 2)[0];
            setter.setHistory(getter.history);

            if (prev) {
              setter.setYear(getYear(prev.date));
              setter.setMonth(getMonth(prev.date));
              setter.setDataAndHistory(prev.valuse);
            }
          }}
        >
          <Undo2 />
        </Button>

        <YearPicker onChange={setter.setYear} defaultYear={getter.year} />
        <MonthPicker
          defaultYear={getter.year}
          defaultMonth={getter.month}
          onChange={(m, y) => {
            setter.setYear(y);
            setter.setMonth(m);
          }}
        />

        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={'icon'} className="cursor-pointer">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-fit p-0"
            onInteractOutside={(e) => {
              const t = e.target as HTMLElement;
              if (pickerOpen) e.preventDefault();
            }}
          >
            <Item className="w-68.5 gap-2 p-3">
              <ItemHeader>Choose a range</ItemHeader>
              <ItemContent className="*:flex *:items-center">
                <RangeDatePicker
                  open={pickerOpen}
                  defaultRange={range}
                  onOpenChange={setPickerOpen}
                  onChange={(value) => setRange(value)}
                />
              </ItemContent>
              <ItemFooter>
                <Button
                  className="w-full cursor-pointer"
                  disabled={!Boolean(range?.from)}
                  onClick={() => {
                    setMenuOpen(false);
                    const length =
                      range?.from && range.to
                        ? Math.abs(differenceInCalendarDays(range.from, range.to)) + 1
                        : 1;

                    setter.setDataAndHistory({
                      type: length > 7 ? 'month' : 'week',
                      value: getPeriodData(length),
                    });

                    if (range?.from) {
                      setter.setYear(getYear(range?.from));
                      setter.setMonth(getMonth(range?.from));
                    }
                  }}
                >
                  Show
                </Button>
              </ItemFooter>
            </Item>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ItemHeader>
  );
}

export default IncomeHeader;

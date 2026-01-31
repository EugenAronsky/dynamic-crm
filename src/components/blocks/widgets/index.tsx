import { Item, ItemContent } from '@/components/ui/item';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { TrendingUpDown } from 'lucide-react';
import { ComponentProps, useState } from 'react';
import { AnimatedNumberChange } from '../motion/animated-number-change';
import { TypographyExtraSmall } from '../typography/typography-extra-small';

type Props = ComponentProps<typeof Item> & { isResizing: boolean };
type TabsValue = 'month' | 'week' | 'day';

const stats = new Map([
  [
    'month',
    [
      {
        name: 'PnL',
        value: 18.2,
        prev: 9.45,
        tip: 'Profit and Loss',
      },
      {
        name: 'CI',
        prev: 13,
        value: 8,
        tip: 'Cancellation Index',
      },
      {
        name: 'WI',
        prev: 17.25,
        value: 12.15,
        tip: 'Workload Index',
      },
    ],
  ],
  [
    'week',
    [
      {
        name: 'PnL',
        value: 10,
        prev: 8.3,
        tip: 'Profit and Loss',
      },
      {
        name: 'CI',
        value: 7.75,
        prev: 14,
        tip: 'Cancellation Index',
      },
      {
        name: 'WI',
        value: 10.05,
        prev: 5.25,
        tip: 'Workload Index',
      },
    ],
  ],
  [
    'day',
    [
      {
        name: 'PnL',
        value: 11,
        prev: 8.35,
        tip: 'Profit and Loss',
      },
      {
        name: 'CI',
        value: 9.75,
        prev: 14,
        tip: 'Cancellation Index',
      },
      {
        name: 'WI',
        value: 6.05,
        prev: 8.25,
        tip: 'Workload Index',
      },
    ],
  ],
]);

function Index({ isResizing, ...rest }: Props) {
  const [value, setValue] = useState<TabsValue>('week');
  const [prevValue, setPrevValue] = useState<TabsValue | null>(null);

  return (
    <Item
      {...rest}
      className={cn(
        'h-full min-w-fit flex-col items-start justify-center py-0 shadow-[0_0_4px_0] shadow-black/15',
        rest.className
      )}
    >
      <ItemContent className="flex min-h-fit w-full basis-0 flex-row items-center justify-between">
        <span className="flex items-center gap-4 text-xs">
          <TrendingUpDown size={14} />

          <div className="flex gap-6">
            {stats.get(value)?.map((stat) => {
              const difference = stat.value - stat.prev;
              const prev = prevValue
                ? stats.get(prevValue)?.find(({ name }) => name === stat.name)
                : null;

              return (
                <Tooltip key={stat.name}>
                  <TooltipTrigger>
                    <span className="font-semibold">{stat.name}: </span>
                    <span>
                      <AnimatedNumberChange
                        postfix="%"
                        fixed={2}
                        value={stat.value}
                        Component={TypographyExtraSmall}
                        startValue={prev?.value || 0}
                      />
                    </span>
                    <span
                      className={cn(
                        'align-super text-[10px] opacity-50',
                        difference > 0 ? 'text-green-600' : 'text-red-600'
                      )}
                    >
                      ({difference > 0 ? '↑ +' : '↓ '}
                      <AnimatedNumberChange
                        postfix="%"
                        fixed={2}
                        value={difference}
                        Component={TypographyExtraSmall}
                        startValue={prev ? prev.value - prev.prev : 0}
                      />
                      )
                    </span>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>{stat.tip}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </span>

        <Select
          value={value}
          onValueChange={(newValue: TabsValue) => {
            setPrevValue(value);
            setValue(newValue);
          }}
        >
          <SelectTrigger
            size="sm"
            className="hover:bg-accent min-w-fit cursor-pointer border-b border-none text-xs underline underline-offset-1 shadow-none transition-all [&>svg]:size-4"
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent position="popper" side="bottom" align="end">
            <SelectGroup>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </ItemContent>
    </Item>
  );
}

export default Index;

import { Item, ItemContent } from '@/components/ui/item';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { TrendingUpDown } from 'lucide-react';
import { ComponentProps, useState } from 'react';
import IncomeBlock from './income-block';
import BookingsBlock from './bookings-block';
import CancelationBlock from './cancelation-block';
import ConversionBlock from './сonversion-block';
import ExpectedBlock from './expected-block';

type Props = ComponentProps<typeof Item> & { isResizing: boolean };

function Statistics({ isResizing, ...rest }: Props) {
  return (
    <Item
      {...rest}
      className={cn(
        'h-full min-h-fit min-w-fit flex-col items-start justify-center p-0',
        rest.className
      )}
    >
      <ItemContent className="flex h-full min-h-fit w-full basis-0 flex-row items-center justify-between">
        <div className="grid h-full w-full grid-cols-5 gap-2 *:grow *:shadow-[0_0_4px_0] *:shadow-black/15">
          <IncomeBlock prev={1800} value={4050} title={`Income`} />
          <ExpectedBlock prev={800} value={1020} title={`Expected`} />
          <BookingsBlock prev={8} value={10} title="Bookings" />
          <CancelationBlock prev={1} value={2} title="Cancelations" />
          <ConversionBlock title={`Conversion `} bookings={17} leads={42} />
        </div>
      </ItemContent>
    </Item>
  );
}

export default Statistics;

import { Item, ItemContent } from '@/components/ui/item';
import { cn } from '@/lib/utils';
import React, { ComponentProps } from 'react';
import AverageProfitBlock from './average-profit-block';
import OrdersBlock from './orders-block';
import CancelationBlock from './cancelation-block';
import ExpectedBlock from './expected-block';
import IncomeBlock from './income-block';
import TopServiceBlock from './top-service-block';
import UnpopularServicBlock from './unpopular-service-block';
import ConversionBlock from './сonversion-block';
import UtilizationBlock from './utilization-block';

const BLOCKS_LIST = {
  Income: IncomeBlock,
  Orders: OrdersBlock,
  Cancelation: CancelationBlock,
  Conversion: ConversionBlock,
  Expected: ExpectedBlock,
  TopServiceBlock: TopServiceBlock,
  AverageProfitBlock: AverageProfitBlock,
  UnpopularServicBlock: UnpopularServicBlock,
  UtilizationBlock: UtilizationBlock,
} as const;

type StatisticsBlocks = keyof typeof BLOCKS_LIST;

type BlockPropsMap = {
  [K in StatisticsBlocks]: React.ComponentProps<(typeof BLOCKS_LIST)[K]>;
};

type AnyBlockConfig = {
  [K in StatisticsBlocks]: {
    type: K;
    props: BlockPropsMap[K];
  };
}[StatisticsBlocks];

type Props = ComponentProps<typeof Item> & {
  blocks: AnyBlockConfig[];
  isResizing: boolean;
};

function Statistics({ blocks, isResizing, ...rest }: Props) {
  return (
    <Item
      {...rest}
      className={cn(
        'h-full min-h-fit min-w-fit flex-col items-start justify-center p-0',
        rest.className
      )}
    >
      <ItemContent className="flex h-full min-h-fit w-full basis-0 flex-row items-center justify-between">
        <div
          style={{ gridTemplateColumns: `repeat(${blocks.length}, minmax(0, 1fr))` }}
          className="grid h-full w-full gap-2 *:grow *:shadow-[0_0_4px_0] *:shadow-black/15"
        >
          {blocks.map((block) => {
            const Component = BLOCKS_LIST[block.type] as React.ComponentType<typeof block.props>;
            return <Component key={block.type} {...block.props} />;
          })}
        </div>
      </ItemContent>
    </Item>
  );
}

export default Statistics;

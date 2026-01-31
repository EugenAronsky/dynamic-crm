'use client';
import { Item, ItemContent, ItemHeader } from '@/components/ui/item';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Square } from 'lucide-react';
import { ComponentProps, useRef, useState } from 'react';
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { AnimatedNumberChange } from '../../motion/animated-number-change';
import { TypographySmall } from '../../typography/typography-small';
import { AnimatePresence, motion } from 'motion/react';
import WorkloadSkeleton from './workload-skeleton';
import WorkloadTooltip from './workload-tooltip';

const workloadPieData: WorkloadDataProps = new Map([
  [
    'month',
    [
      {
        name: 'leisure',
        value: 10,
        color: '#a1a1a1',
      },

      {
        name: 'planned',
        value: 50,
        color: '#fc8a38',
      },
      {
        name: 'completed',
        value: 40,
        color: '#fa3434',
      },
    ],
  ],
  [
    'week',
    [
      {
        name: 'leisure',
        value: 20,
        color: '#a1a1a1',
      },

      {
        name: 'planned',
        value: 50,
        color: '#fc8a38',
      },
      {
        name: 'completed',
        value: 30,
        color: '#fa3434',
      },
    ],
  ],
  [
    'day',
    [
      {
        name: 'leisure',
        value: 60,
        color: '#a1a1a1',
      },

      {
        name: 'planned',
        value: 30,
        color: '#fc8a38',
      },
      {
        name: 'completed',
        value: 10,
        color: '#fa3434',
      },
    ],
  ],
]);

type Props = ComponentProps<typeof Item> & { isResizing: boolean };
type TabsValue = 'month' | 'week' | 'day';
type WorkloadDataProps = Map<TabsValue, PieDataProps[]>;
type PieDataProps = {
  name: 'leisure' | 'planned' | 'completed';
  value: number;
  color: string;
};

function Workload({ isResizing, ...rest }: Props) {
  const [value, setValue] = useState<TabsValue>('week');
  const [prevValue, setPrevValue] = useState<TabsValue | null>(null);

  return (
    <Item
      {...rest}
      className={cn(
        'h-full min-h-75 min-w-fit flex-col items-start shadow-[0_0_4px_0] shadow-black/15',
        rest.className
      )}
    >
      <ItemHeader className="min-h-fit w-full basis-0">
        <span className="font-semibold">Workload</span>
        <Select
          value={value}
          onValueChange={(newValue: TabsValue) => {
            setPrevValue(value);
            setValue(newValue);
          }}
        >
          <SelectTrigger className="hover:bg-accent min-w-20.75 cursor-pointer transition-all">
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
      </ItemHeader>
      <ItemContent className={cn('flex w-full flex-1 transition-all', isResizing && 'blur-xs')}>
        <AnimatePresence mode="wait">
          {!isResizing ? (
            <motion.div
              key={'pie-workload'}
              className="flex flex-1"
              animate={{ opacity: isResizing ? 0 : 1 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <Tabs value={value} className="flex flex-1">
                {Array.from(workloadPieData).map(([tab, data], index) => (
                  <TabsContent
                    value={tab}
                    key={`${tab}-${index}`}
                    className="flex flex-1 flex-col gap-4 **:outline-none!"
                  >
                    <ResponsiveContainer className="flex flex-1">
                      <PieChart>
                        <WorkloadTooltip />
                        <Pie
                          data={data}
                          dataKey="value"
                          startAngle={-10}
                          innerRadius="80%"
                          outerRadius="100%"
                          paddingAngle={5}
                        >
                          {data.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={entry.color} />
                          ))}
                          <AnimatedNumberChange
                            postfix="%"
                            position="center"
                            Component={Label}
                            className="**:font-space-grotesk -translate-y-1 text-2xl font-semibold"
                            fill="#000"
                            value={data.find((entry) => entry.name === 'completed')?.value || 0}
                            startValue={
                              prevValue
                                ? workloadPieData
                                    .get(prevValue)
                                    ?.find((entry) => entry.name === 'completed')?.value || 0
                                : 0
                            }
                          />
                          <Label position={'center'} className="translate-y-4 text-xs">
                            Compleated
                          </Label>
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="relative flex h-fit w-full flex-wrap gap-x-3 gap-y-2">
                      {data.map((entry) => (
                        <span
                          key={`square-${entry.name}`}
                          className="flex min-w-32 items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Square size={12} fill={entry.color} stroke={entry.color} />
                            <span className="text-muted-foreground text-xs capitalize">
                              {entry.name}
                            </span>
                          </div>
                          <AnimatedNumberChange
                            postfix="%"
                            value={entry.value}
                            Component={TypographySmall}
                            startValue={
                              prevValue
                                ? workloadPieData
                                    .get(prevValue)
                                    ?.find(({ name }) => name === entry.name)?.value || 0
                                : 0
                            }
                          />
                        </span>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-1"
              key={'pie-workload-skeleton'}
              animate={{ opacity: isResizing ? 1 : 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <WorkloadSkeleton />
            </motion.div>
          )}
        </AnimatePresence>
      </ItemContent>
    </Item>
  );
}

export default Workload;

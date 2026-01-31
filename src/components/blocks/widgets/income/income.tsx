'use client';
import { months } from '@/components/blocks/pickers/month-picker';
import { Item, ItemContent } from '@/components/ui/item';
import { xTickFormatterByMode } from '@/lib/func/chart-helpers/xTickFormatterByMode';
import { cn } from '@/lib/utils';
import { getMonth, getYear } from 'date-fns';
import { Square } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ComponentProps,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { AnimatedNumberChange } from '../../motion/animated-number-change';
import { TypographySmall } from '../../typography/typography-small';
import { getDayData, getMonthData, getYearData, сalculateLoss } from './income-halpers';
import IncomeHeader from './income-header';
import IncomeSkeleton from './income-skeleton';
import IncomeTooltip from './income-tooltip';

type Props = ComponentProps<typeof Item> & { isResizing: boolean };
type BarTypeValue = 'year' | 'month' | 'week' | 'day';
type IncomeDataProps = { type: BarTypeValue; value: BarDataProps[] };
type BarDataProps = {
  x: string;
  expected: number;
  income: number;
};

interface IncomeContextProps {
  getter: {
    year: number | undefined;
    month: number | undefined;
    data: Record<string, any> | null;
    history: Array<{ date: string; valuse: IncomeDataProps }>;
  };
  setter: {
    setYear: Dispatch<SetStateAction<number>>;
    setData: Dispatch<SetStateAction<IncomeDataProps>>;
    setMonth: Dispatch<SetStateAction<number | undefined>>;
    setDataAndHistory: (data: IncomeDataProps) => void;
    setHistory: Dispatch<
      SetStateAction<
        {
          date: string;
          valuse: IncomeDataProps;
        }[]
      >
    >;
  };
}

export const IncomeContext = createContext<IncomeContextProps>({
  getter: {
    data: null,
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    history: [],
  },
  setter: {
    setData: () => null,
    setYear: () => null,
    setMonth: () => null,
    setHistory: () => null,
    setDataAndHistory: () => null,
  },
});

const pieData = [
  {
    name: 'income',
    value: 30,
    color: '#fa3434',
  },
  {
    name: 'loss',
    value: 20,
    color: '#a1a1a1',
  },
];

function Income({ isResizing, ...rest }: Props) {
  const ref = useRef(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState<number | undefined>(0);
  const [history, setHistory] = useState<Array<{ date: string; valuse: IncomeDataProps }>>([]);
  const prevHistory = useRef(history.length);

  const [data, setData] = useState<IncomeDataProps>({
    type: 'month',
    value: getMonthData(getYear(new Date()), new Date().getMonth()),
  });

  const shownValue = сalculateLoss(data.value);
  const shownXAxios = xTickFormatterByMode(data.type);

  const setDataAndHistory = (data: IncomeDataProps) => {
    if (history.at(-1)?.date !== data.value[data.value.length - 1].x)
      setHistory([...history, { date: data.value[data.value.length - 1].x, valuse: data }]);
    setData(data);
  };

  const upadetDate = (x: string) => {
    if (data.type === 'day') return;

    setYear(getYear(x));
    setMonth(getMonth(x));

    if (data.type === 'month' || data.type === 'week') {
      setDataAndHistory({
        type: 'day',
        value: getDayData(),
      });
    }
  };

  useEffect(() => {
    if (prevHistory.current !== history.length) return;
    const y = year ?? getYear(new Date());
    if (month === undefined || month < 0) {
      setDataAndHistory({ type: 'year', value: getYearData(y, 12) });
      return;
    }

    setDataAndHistory({
      type: 'month',
      value: getMonthData(y, month),
    });
  }, [year, month, months, history]);

  useEffect(() => {
    prevHistory.current = history.length;
  }, [history]);

  return (
    <IncomeContext.Provider
      value={{
        getter: { data: data, year: year, month: month, history: history },
        setter: {
          setData: setData,
          setYear: setYear,
          setMonth: setMonth,
          setHistory: setHistory,
          setDataAndHistory: setDataAndHistory,
        },
      }}
    >
      <Item
        {...rest}
        ref={ref}
        className={cn(
          'h-full min-h-75 min-w-96 flex-col items-start shadow-[0_0_4px_0] shadow-black/15',
          rest.className
        )}
      >
        <IncomeHeader />
        <ItemContent
          className={cn(
            'flex w-full flex-1 transition-all **:outline-none!',
            isResizing && 'blur-xs'
          )}
        >
          <AnimatePresence>
            {!isResizing ? (
              <motion.div
                key={'bar'}
                className="flex flex-1 flex-col"
                animate={{ opacity: isResizing ? 0 : 1 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <ResponsiveContainer className="flex flex-1" width="100%" height="100%">
                  <BarChart data={shownValue} maxBarSize={64}>
                    <XAxis tickFormatter={shownXAxios} dataKey="x" />
                    <YAxis width="auto" />
                    <IncomeTooltip type={data.type} />
                    <Bar
                      stroke="0"
                      stackId="a"
                      background
                      fill="#fa3434"
                      dataKey="income"
                      onClick={(event) => upadetDate(event.payload.x)}
                      activeBar={{ fill: '#fc8a38aa', stroke: '#fc8a38', strokeWidth: 1.5 }}
                    />
                    <Bar
                      stroke="0"
                      stackId="a"
                      background
                      fill="#a1a1a1"
                      dataKey="loss"
                      onClick={(event) => upadetDate(event.payload.x)}
                      activeBar={{ fill: '#fc8a3850', stroke: '#fc8a38', strokeWidth: 1.5 }}
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <div className="gap-4 pl-8">
                  {/* <ResponsiveContainer className="flex flex-1">
                    <PieChart>
                      <Pie
                        data={pieData}
                        endAngle={0}
                        dataKey="value"
                        innerRadius="0%"
                        startAngle={180}
                        outerRadius="200%"
                        className="translate-y-2.5"
                      >
                        {pieData.map((entry) => (
                          <Cell key={`cell-${entry.name}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer> */}

                  <div className="relative my-auto flex h-fit w-fit flex-wrap gap-x-3 gap-y-2">
                    {pieData.map((entry) => (
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
                          //  startValue={
                          //    prevValue
                          //      ? workloadPieData
                          //          .get(prevValue)
                          //          ?.find(({ name }) => name === entry.name)?.value || 0
                          //      : 0
                          //  }
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={'bar'}
                className="flex flex-1"
                animate={{ opacity: isResizing ? 1 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <IncomeSkeleton length={shownValue.length} />
              </motion.div>
            )}
          </AnimatePresence>
        </ItemContent>
      </Item>
    </IncomeContext.Provider>
  );
}

export default Income;

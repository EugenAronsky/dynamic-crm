import { Button } from '@/components/ui/button';
import { Item, ItemContent, ItemFooter, ItemHeader } from '@/components/ui/item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Activity,
  AlertTriangle,
  Bot,
  BrainCircuit,
  CalendarCheck,
  CalendarX,
  Clock,
  LucideIcon,
  Repeat,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  UserPlus,
  Users,
} from 'lucide-react';
import { ComponentProps, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

type Props = ComponentProps<typeof Item> & { isResizing: boolean };

type TipColor =
  | 'text-green-600 bg-green-50'
  | 'text-blue-600 bg-blue-50'
  | 'text-orange-600 bg-orange-50'
  | 'text-red-600 bg-red-50'
  | 'text-violet-600 bg-violet-50'
  | 'text-amber-600 bg-amber-50';

type Tip = {
  icon: LucideIcon;
  title: string;
  tips: string[];
  color: TipColor;
};

const aiSecretaryTips: Tip[] = [
  {
    icon: CalendarCheck,
    title: 'Balanced Day Ahead',
    color: 'text-blue-600 bg-blue-50',
    tips: [
      'Your schedule is **over 70% booked** — steady workflow today.',
      'You still have *at least one free slot* that could bring extra revenue.',
      'A good day to focus on **client experience** and service quality.',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Revenue Opportunity',
    color: 'text-green-600 bg-green-50',
    tips: [
      'Some appointments are *not confirmed yet* — confirming them secures income.',
      'Filling today’s gaps could **maximize your daily earnings**.',
      '*Evening hours* tend to generate higher revenue.',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Attention Needed',
    color: 'text-red-600 bg-red-50',
    tips: [
      'You have **unconfirmed appointments** today.',
      'One client has a *history of cancellations*.',
      'There’s an *unpaid visit* from a previous day.',
    ],
  },
  {
    icon: Sparkles,
    title: 'Fully Booked Momentum',
    color: 'text-violet-600 bg-violet-50',
    tips: [
      'Your schedule is *almost full* — strong demand today.',
      'Great moment to **offer add-on services**.',
      'Consider *pre-booking* clients for their next visit.',
    ],
  },
  {
    icon: CalendarX,
    title: 'Light Schedule Today',
    color: 'text-orange-600 bg-orange-50',
    tips: [
      'You have **multiple open slots** today.',
      'Good time to message *inactive clients*.',
      'You could run a *small promotion* to fill gaps.',
    ],
  },
  {
    icon: Users,
    title: 'Client Growth Day',
    color: 'text-blue-600 bg-blue-50',
    tips: [
      'You have **new clients** scheduled today.',
      'Opportunity to turn *first visits* into repeat bookings.',
      'Make sure to collect **preferences and notes**.',
    ],
  },
  {
    icon: UserPlus,
    title: 'Retention Opportunity',
    color: 'text-amber-600 bg-amber-50',
    tips: [
      'Some regular clients haven’t visited in *a long time*.',
      'A good moment to send a **follow-up message**.',
      'Re-engaging old clients is *cheaper than acquiring new ones*.',
    ],
  },
  {
    icon: Repeat,
    title: 'Cancellation Risk',
    color: 'text-red-600 bg-red-50',
    tips: [
      'There are clients who previously *rescheduled or canceled*.',
      'Sending reminders could **reduce no-shows**.',
      'Consider confirming high-risk appointments *manually*.',
    ],
  },
  {
    icon: Clock,
    title: 'Optimization Suggestion',
    color: 'text-orange-600 bg-orange-50',
    tips: [
      'You have **small gaps between appointments**.',
      'Filling short gaps can *noticeably increase revenue*.',
      'Regular clients are more likely to accept *last-minute offers*.',
    ],
  },
  {
    icon: Activity,
    title: 'Strong Booking Flow',
    color: 'text-green-600 bg-green-50',
    tips: [
      'Booking activity is **higher than usual**.',
      'Conversion from inquiries to bookings looks *strong*.',
      'Maintain *fast response times* to keep momentum.',
    ],
  },
];

function AITip({ isResizing, ...rest }: Props) {
  const [maxH, setMaxH] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [useful, setUseful] = useState<1 | 0 | -1>(0);

  const today_tip = useMemo(() => {
    const max = aiSecretaryTips.length - 1;
    return aiSecretaryTips.at(Math.floor(Math.random() * max))!;
  }, []);

  useLayoutEffect(() => {
    setMaxH(ref.current?.clientHeight ?? 0);
    const controller = new AbortController();
    window.addEventListener('resize', () => setMaxH(ref.current?.clientHeight ?? 0), {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, [ref]);

  return (
    <Item
      {...rest}
      className={cn(
        'h-full min-w-fit flex-col items-start justify-center shadow-[0_0_4px_0] shadow-black/15',
        rest.className
      )}
    >
      <ItemHeader className="w-full shrink-0 basis-0">
        <div className="flex items-center gap-2">
          <Bot size={18} /> <span>AI Secretary</span>
        </div>
      </ItemHeader>
      <ItemContent
        ref={ref}
        className="flex min-h-fit w-full basis-0 flex-row items-center justify-between"
      >
        <ScrollArea
          style={{ height: `${maxH}px` }}
          className={cn(
            'relative min-h-full w-full rounded-sm px-3 py-2 shadow-[inset_0_0_4px_0] shadow-black/10',
            today_tip.color
          )}
        >
          <article className="flex size-full flex-col gap-1.75">
            <h2 className="mt-px flex items-center gap-2 text-base font-semibold uppercase">
              <today_tip.icon size={16} /> {today_tip?.title}
            </h2>
            <Separator className={cn('h-0.5! mix-blend-multiply brightness-95', today_tip.color)} />

            <ul className="flex list-disc flex-col gap-2 pl-5.25">
              {today_tip?.tips.map((tip) => {
                return (
                  <li key={`tip-${tip}`}>
                    <ReactMarkdown>{tip}</ReactMarkdown>
                  </li>
                );
              })}
            </ul>
          </article>
        </ScrollArea>
      </ItemContent>

      <ItemFooter className="flex w-full shrink-0 basis-0 justify-start *:cursor-pointer">
        <Button
          size={'sm'}
          variant={'secondary'}
          onClick={() => setUseful((cur) => (cur === 1 ? 0 : 1))}
          className={cn(
            'hover:bg-emerald-100 hover:text-emerald-600 hover:brightness-95',
            useful === 1 && 'bg-emerald-100 text-emerald-600'
          )}
        >
          <ThumbsUp />
        </Button>

        <Button
          size={'sm'}
          variant={'secondary'}
          onClick={() => setUseful((cur) => (cur === -1 ? 0 : -1))}
          className={cn(
            'hover:bg-rose-100 hover:text-rose-600 hover:brightness-95',
            useful === -1 && 'bg-rose-100 text-rose-600'
          )}
        >
          <ThumbsDown />
        </Button>

        <Button
          size={'sm'}
          variant={'secondary'}
          className="hover:bg-fuchsia-100 hover:text-fuchsia-600"
        >
          <BrainCircuit />
          <span>Generate new tip</span>
        </Button>
      </ItemFooter>
    </Item>
  );
}

export default AITip;

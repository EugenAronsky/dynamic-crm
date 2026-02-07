'use client';
import { AnimatedNumberChange } from '@/components/blocks/motion/animated-number-change';
import { TypographyExtraSmall } from '@/components/blocks/typography/typography-extra-small';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Item, ItemDescription, ItemFooter, ItemHeader } from '@/components/ui/item';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  AtSign,
  BellDot,
  BellRing,
  CalendarCheck,
  CalendarX,
  Circle,
  Hammer,
  HatGlasses,
  LucideIcon,
  Mail,
  MailOpen,
  RotateCcw,
  Settings,
  SortAsc,
  SortDesc,
  Tag,
  TriangleAlert,
} from 'lucide-react';
import { useMemo, useState } from 'react';

function MessagesCard({ status, description, title, type, createdAt }: Message) {
  const { icon: Icon, color } = messageTypeMeta[type];
  return (
    <Item
      className={cn(
        'relative flex cursor-pointer flex-row flex-nowrap items-start justify-between overflow-hidden border-none bg-white shadow-[0_0_4px_0] shadow-black/15 transition-all *:basis-auto hover:brightness-97',
        status === 'seen' && 'opacity-50 hover:brightness-95'
      )}
    >
      <div
        className={cn(
          'absolute -top-0.5 left-0 h-6 w-2 -skew-x-45 bg-transparent',
          status === 'new' && 'bg-red-400'
        )}
      />
      <ItemHeader className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <Avatar className="size-9">
            <AvatarImage
              className="object-cover"
              src={
                'https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
              }
            />
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
          <span className="text-base font-semibold">Steven Spielberg</span>
        </div>
        <span>{title}</span>
        <ItemDescription className="flex flex-row items-center gap-2 text-xs">
          <Circle size={4} className="fill-muted-foreground stroke-muted-foreground" />
          {description}
        </ItemDescription>
      </ItemHeader>
      <ItemFooter className="h-full flex-col items-end justify-between text-xs">
        <div className={cn('flex items-end gap-2 capitalize', color && color)}>
          {type}
          <Icon className="stroke-[1.25]" size={18} />
        </div>

        <span className="">{format(createdAt, 'dd/MM/yyyy')}</span>
      </ItemFooter>
    </Item>
  );
}

type Message = {
  id: string;
  title: string;
  description: string;

  status: MessageStatus;
  type: MessageType;
  priority?: MessagePriority;

  createdAt: Date;
  updatedAt?: Date;
  readAt?: Date;

  sender: {
    id: string;
    name: string;
    avatar?: string;
    role?: 'user' | 'admin' | 'system';
  };
};

type MessagePriority = 'low' | 'normal' | 'high' | 'urgent';

const MessageTypeArray = [
  'reservation',
  'cancellation',
  'renovation',
  'alert',
  'system',
  'reminder',
  'promotion',
] as const;

const MessageStatusArray = ['new', 'unread', 'seen'] as const;

type MessageType = (typeof MessageTypeArray)[number];
type MessageStatus = (typeof MessageStatusArray)[number];

const messageStatusIcons: Record<MessageStatus, LucideIcon> = {
  new: BellDot,
  seen: MailOpen,
  unread: Mail,
} as const;

const messageTypeMeta: Record<MessageType, { icon: LucideIcon; color: string }> = {
  reservation: {
    icon: CalendarCheck,
    color: 'text-emerald-600',
  },
  cancellation: {
    icon: CalendarX,
    color: 'text-rose-600',
  },
  renovation: {
    icon: Hammer,
    color: 'text-amber-600',
  },
  alert: {
    icon: TriangleAlert,
    color: 'text-orange-600',
  },
  system: {
    icon: Settings,
    color: 'text-slate-500',
  },
  reminder: {
    icon: BellRing,
    color: 'text-blue-600',
  },
  promotion: {
    icon: Tag,
    color: 'text-fuchsia-600',
  },
} as const;

const testMessages: Message[] = [
  {
    id: 'msg_001',
    title: 'New reservation request',
    description: 'Room 204 booked for March 12–15.',
    status: 'new',
    type: 'reservation',
    priority: 'high',
    createdAt: new Date('2026-02-05T09:15:00'),
    sender: { id: 'u_12', name: 'Olivia Brown', avatar: '/avatars/olivia.png', role: 'user' },
  },
  {
    id: 'msg_002',
    title: 'Maintenance alert',
    description: 'AC issue in Room 118.',
    status: 'unread',
    type: 'alert',
    priority: 'urgent',
    createdAt: new Date('2026-02-04T18:40:00'),
    updatedAt: new Date('2026-02-04T19:05:00'),
    sender: { id: 'sys_1', name: 'System', role: 'system' },
  },
  {
    id: 'msg_003',
    title: 'Renovation update',
    description: 'Lobby renovation moved to Monday.',
    status: 'seen',
    type: 'renovation',
    priority: 'normal',
    createdAt: new Date('2026-02-03T11:20:00'),
    readAt: new Date('2026-02-03T11:45:00'),
    sender: { id: 'admin_2', name: 'Michael Scott', avatar: '/avatars/michael.png', role: 'admin' },
  },
  {
    id: 'msg_004',
    title: 'Reservation confirmed',
    description: 'Booking #4831 confirmed.',
    status: 'seen',
    type: 'reservation',
    createdAt: new Date('2026-02-02T14:10:00'),
    sender: { id: 'sys_1', name: 'System', role: 'system' },
  },
  {
    id: 'msg_005',
    title: 'Booking cancellation',
    description: 'Guest cancelled Room 302.',
    status: 'new',
    type: 'cancellation',
    priority: 'high',
    createdAt: new Date('2026-02-05T11:40:00'), // было 02-02
    sender: { id: 'u_77', name: 'James Lee', role: 'user' },
  },
  {
    id: 'msg_006',
    title: 'System update',
    description: 'Server maintenance tonight.',
    status: 'seen',
    type: 'system',
    createdAt: new Date('2026-02-01T22:00:00'),
    sender: { id: 'sys_1', name: 'System', role: 'system' },
  },
  {
    id: 'msg_007',
    title: 'Payment reminder',
    description: 'Invoice #992 unpaid.',
    status: 'unread',
    type: 'reminder',
    priority: 'normal',
    createdAt: new Date('2026-02-01T10:30:00'),
    sender: { id: 'sys_1', name: 'System', role: 'system' },
  },
  {
    id: 'msg_008',
    title: 'Special offer',
    description: '20% off weekend bookings.',
    status: 'seen',
    type: 'promotion',
    createdAt: new Date('2026-01-31T16:20:00'),
    sender: { id: 'marketing_1', name: 'Marketing Team', role: 'admin' },
  },
  {
    id: 'msg_009',
    title: 'Room service alert',
    description: 'Late delivery in Room 210.',
    status: 'new',
    type: 'alert',
    priority: 'high',
    createdAt: new Date('2026-02-05T07:55:00'), // было 01-30
    sender: { id: 'staff_3', name: 'Emma Davis', role: 'admin' },
  },
  {
    id: 'msg_010',
    title: 'Renovation notice',
    description: 'Pool closed for repairs.',
    status: 'seen',
    type: 'renovation',
    createdAt: new Date('2026-01-29T08:00:00'),
    sender: { id: 'admin_5', name: 'Robert King', role: 'admin' },
  },
  {
    id: 'msg_011',
    title: 'Reservation modified',
    description: 'Dates updated for booking #5521.',
    status: 'seen',
    type: 'reservation',
    createdAt: new Date('2026-01-28T13:45:00'),
    sender: { id: 'u_44', name: 'Sophia Turner', role: 'user' },
  },
  {
    id: 'msg_012',
    title: 'Cancellation request',
    description: 'Pending approval.',
    status: 'unread',
    type: 'cancellation',
    createdAt: new Date('2026-01-27T17:25:00'),
    sender: { id: 'u_91', name: 'Daniel Moore', role: 'user' },
  },
  {
    id: 'msg_013',
    title: 'Fire drill alert',
    description: 'Drill at 3 PM.',
    status: 'new',
    type: 'alert',
    priority: 'urgent',
    createdAt: new Date('2026-02-05T06:20:00'), // было 01-26
    sender: { id: 'sys_1', name: 'System', role: 'system' },
  },
  {
    id: 'msg_014',
    title: 'Reminder: Check-in',
    description: 'Guest arriving today.',
    status: 'seen',
    type: 'reminder',
    createdAt: new Date('2026-01-25T09:10:00'),
    sender: { id: 'sys_1', name: 'System', role: 'system' },
  },
  {
    id: 'msg_015',
    title: 'Promo campaign',
    description: 'New seasonal discounts live.',
    status: 'seen',
    type: 'promotion',
    createdAt: new Date('2026-01-24T18:40:00'),
    sender: { id: 'marketing_1', name: 'Marketing Team', role: 'admin' },
  },
  {
    id: 'msg_016',
    title: 'System reboot',
    description: 'Completed successfully.',
    status: 'seen',
    type: 'system',
    createdAt: new Date('2026-01-23T02:15:00'),
    sender: { id: 'sys_1', name: 'System', role: 'system' },
  },
  {
    id: 'msg_017',
    title: 'Late checkout request',
    description: 'Room 410 requested extension.',
    status: 'unread',
    type: 'reservation',
    createdAt: new Date('2026-01-22T11:50:00'),
    sender: { id: 'u_62', name: 'Liam Wilson', role: 'user' },
  },
  {
    id: 'msg_018',
    title: 'Renovation completed',
    description: 'Gym reopened.',
    status: 'seen',
    type: 'renovation',
    createdAt: new Date('2026-01-21T15:30:00'),
    sender: { id: 'admin_3', name: 'Sarah Johnson', role: 'admin' },
  },
  {
    id: 'msg_019',
    title: 'Security alert',
    description: 'Unusual login detected.',
    status: 'new',
    type: 'alert',
    priority: 'urgent',
    createdAt: new Date('2026-02-05T03:10:00'), // было 01-20
    sender: { id: 'sys_1', name: 'System', role: 'system' },
  },
  {
    id: 'msg_020',
    title: 'Payment received',
    description: 'Invoice #1042 settled.',
    status: 'seen',
    type: 'system',
    createdAt: new Date('2026-01-19T19:20:00'),
    sender: { id: 'sys_1', name: 'System', role: 'system' },
  },
];

export default function Inbox() {
  const [sorted, setSorted] = useState(false);
  const [type, setType] = useState<Message['type'] | undefined>();
  const [status, setStatus] = useState<Message['status'] | undefined>();

  const filteredList = useMemo(() => {
    const sortedList = testMessages.sort((a, b) =>
      sorted
        ? a.createdAt.getTime() - b.createdAt.getTime()
        : b.createdAt.getTime() - a.createdAt.getTime()
    );

    const statusList = status
      ? sortedList.filter((message) => message.status === status)
      : sortedList;
    return type ? statusList.filter((message) => message.type === type) : statusList;
  }, [status, type, sorted]);

  return (
    <section className="flex flex-1 flex-col">
      <div className="w-full p-2">
        <Item className="flex w-full flex-row flex-nowrap justify-between bg-white p-2 shadow-[0_0_4px_0] shadow-black/15">
          <ItemHeader className="w-fit basis-auto items-end gap-1.25 pl-1.5">
            <div className="flex items-center gap-2 font-semibold">
              <AtSign size={16} />
              <span className="capitalize">{status ?? 'All'}</span>
              {type && <span className="capitalize">{type}</span>}
              <span>messages</span>
            </div>
            <span className="-translate-y-1 text-xs">
              (
              <AnimatedNumberChange
                value={filteredList.length}
                startValue={0}
                fixed={0}
                postfix=""
                Component={TypographyExtraSmall}
              />
              )
            </span>
          </ItemHeader>
          <ItemFooter className="basis-auto">
            <Button onClick={() => setSorted((cur) => !cur)} variant={'outline'} size={'icon'}>
              {sorted ? <SortAsc /> : <SortDesc />}
            </Button>

            <Select value={status} key={`status-select-${status}`}>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent align="end" position="popper">
                <SelectGroup>
                  {MessageStatusArray.map((status) => {
                    const Icon = messageStatusIcons[status];
                    return (
                      <SelectItem
                        value={status}
                        className="capitalize"
                        key={`select-item-${status}`}
                        onPointerDown={() =>
                          setStatus((curr) => (curr === status ? undefined : status))
                        }
                      >
                        <Icon />
                        <span>{status}</span>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={type} key={`type-select-${type}`}>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder={'Type'} />
              </SelectTrigger>
              <SelectContent align="end" position="popper">
                <SelectGroup>
                  {MessageTypeArray.map((type) => {
                    const { icon: Icon } = messageTypeMeta[type];
                    return (
                      <SelectItem
                        value={type}
                        className="capitalize"
                        key={`select-item-${type}`}
                        onPointerDown={() => setType((curr) => (curr === type ? undefined : type))}
                      >
                        <Icon />
                        <span>{type}</span>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              size={'icon'}
              variant={'outline'}
              disabled={!Boolean(status || type)}
              onClick={() => {
                setSorted(false);
                setType(undefined);
                setStatus(undefined);
              }}
            >
              <RotateCcw />
            </Button>
          </ItemFooter>
        </Item>
      </div>

      <div className="w-full px-2">
        <Separator className="" />
      </div>

      <ScrollArea className="relative h-full max-h-[calc(100%-63px)] pb-2">
        <div className="flex h-fit w-full flex-col gap-3 p-2">
          {filteredList.length ? (
            filteredList.map((message, index) => (
              <MessagesCard {...message} key={`message-${message.id}-${index}`} />
            ))
          ) : (
            <div className="text-muted-foreground absolute flex size-full flex-col items-center justify-center gap-2">
              <HatGlasses size={100} className="stroke-1" />
              <span>Nothing founded.</span>
            </div>
          )}
        </div>
      </ScrollArea>
    </section>
  );
}

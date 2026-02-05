'use client';
import { AnimatedNumberChange } from '@/components/blocks/motion/animated-number-change';
import { TypographyExtraSmall } from '@/components/blocks/typography/typography-extra-small';
import { TypographySmall } from '@/components/blocks/typography/typography-small';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Item, ItemDescription, ItemFooter, ItemHeader } from '@/components/ui/item';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { format } from 'date-fns';
import {
  AlertCircle,
  AtSign,
  BellDot,
  BellRing,
  Bot,
  CalendarCheck,
  CalendarX,
  Circle,
  Crown,
  EllipsisVertical,
  Hammer,
  HatGlasses,
  LucideIcon,
  Mail,
  MailOpen,
  Notebook,
  PenBox,
  PenToolIcon,
  Pin,
  Plus,
  RotateCcw,
  Search,
  Settings,
  ShieldAlert,
  SortAsc,
  SortDesc,
  Tag,
  Trash2,
  TriangleAlert,
  UploadCloud,
  UserPlus,
  UserPlus2,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type StatusColors = 'blue' | 'amber' | 'emerald' | 'fuchsia' | 'red';
type ClientStatus = 'regular' | 'new' | 'demanding' | 'VIP';
type RadioCategories = ClientStatus | 'all';

const StatusColorsObject: Record<RadioCategories, StatusColors> = {
  all: 'blue',
  VIP: 'fuchsia',
  new: 'emerald',
  demanding: 'red',
  regular: 'blue',
};

const radio_categories: { value: RadioCategories; icon: LucideIcon; color: StatusColors }[] = [
  {
    value: 'all',
    icon: Notebook,
    color: 'blue',
  },
  {
    value: 'regular',
    icon: Pin,
    color: 'amber',
  },
  {
    value: 'new',
    icon: UserPlus,
    color: 'emerald',
  },
  {
    value: 'VIP',
    icon: Crown,
    color: 'fuchsia',
  },
  {
    value: 'demanding',
    icon: ShieldAlert,
    color: 'red',
  },
];

type Client = {
  name: string;
  phone: string;
  income: number;
  lastVisit: Date;
  totalVisits: number;
  description: string;
  status: ClientStatus;
  isAIAssists: boolean;
};

const clientsList: Client[] = [
  {
    name: 'Olivia Brown',
    phone: '+1 202 555 0147',
    description: 'Prefers quiet rooms, morning check-in.',
    status: 'VIP',
    lastVisit: new Date('2026-02-01'),
    totalVisits: 12,
    income: 8420,
    isAIAssists: true,
  },
  {
    name: 'James Lee',
    phone: '+1 202 555 0192',
    description: 'Business traveler.',
    status: 'regular',
    lastVisit: new Date('2026-01-20'),
    isAIAssists: false,
    totalVisits: 6,
    income: 3120,
  },
  {
    name: 'Sophia Turner',
    phone: '+1 202 555 0113',
    description: 'Late checkout often.',
    status: 'regular',
    isAIAssists: false,
    lastVisit: new Date('2026-01-28'),
    totalVisits: 8,
    income: 4210,
  },
  {
    name: 'Daniel Moore',
    phone: '+1 202 555 0188',
    description: 'Family bookings.',
    isAIAssists: false,
    status: 'VIP',
    lastVisit: new Date('2026-01-10'),
    totalVisits: 15,
    income: 10550,
  },
  {
    name: 'Emma Davis',
    phone: '+1 202 555 0135',
    description: 'Spa services frequent.',
    isAIAssists: false,
    status: 'regular',
    lastVisit: new Date('2026-02-03'),
    totalVisits: 9,
    income: 5360,
  },
  {
    name: 'Liam Wilson',
    phone: '+1 202 555 0174',
    description: 'Prefers high floor rooms.',
    status: 'new',
    lastVisit: new Date('2026-02-04'),
    totalVisits: 1,
    income: 420,
    isAIAssists: true,
  },
  {
    name: 'Ava Martinez',
    phone: '+1 202 555 0121',
    description: 'Weekend stays.',
    status: 'regular',
    isAIAssists: false,
    lastVisit: new Date('2026-01-15'),
    totalVisits: 5,
    income: 2100,
  },
  {
    name: 'Noah Anderson',
    phone: '+1 202 555 0163',
    description: 'Business suite bookings.',
    status: 'VIP',
    isAIAssists: false,
    lastVisit: new Date('2026-02-02'),
    totalVisits: 18,
    income: 13400,
  },
  {
    name: 'Mia Thompson',
    phone: '+1 202 555 0142',
    description: 'Allergic to feathers.',
    isAIAssists: false,
    status: 'regular',
    lastVisit: new Date('2026-01-25'),
    totalVisits: 7,
    income: 3670,
  },
  {
    name: 'William Harris',
    phone: '+1 202 555 0181',
    isAIAssists: false,
    description: 'Gym and bar frequent.',
    status: 'regular',
    lastVisit: new Date('2026-01-30'),
    totalVisits: 10,
    income: 5900,
  },
  {
    name: 'Isabella Clark',
    phone: '+1 202 555 0159',
    description: 'Romantic weekend packages.',
    status: 'VIP',
    lastVisit: new Date('2026-02-01'),
    totalVisits: 14,
    isAIAssists: true,
    income: 11200,
  },
  {
    name: 'Benjamin Lewis',
    phone: '+1 202 555 0119',
    description: 'Conference attendee.',
    status: 'demanding',
    isAIAssists: false,
    lastVisit: new Date('2025-11-12'),
    totalVisits: 3,
    income: 1200,
  },
  {
    name: 'Charlotte Walker',
    phone: '+1 202 555 0178',
    description: 'Early check-in requests.',
    isAIAssists: false,
    status: 'regular',
    lastVisit: new Date('2026-01-19'),
    totalVisits: 6,
    income: 2840,
  },
  {
    name: 'Elijah Hall',
    phone: '+1 202 555 0104',
    description: 'Prefers sea view.',
    status: 'VIP',
    lastVisit: new Date('2026-02-04'),
    isAIAssists: false,
    totalVisits: 16,
    income: 12560,
  },
  {
    name: 'Amelia Young',
    phone: '+1 202 555 0138',
    description: 'Spa & wellness packages.',
    status: 'regular',
    lastVisit: new Date('2026-01-22'),
    totalVisits: 7,
    isAIAssists: true,
    income: 3890,
  },
  {
    name: 'Lucas King',
    phone: '+1 202 555 0199',
    description: 'Frequent room service.',
    status: 'regular',
    lastVisit: new Date('2026-01-18'),
    isAIAssists: false,
    totalVisits: 8,
    income: 4520,
  },
  {
    name: 'Harper Scott',
    phone: '+1 202 555 0166',
    description: 'Travel blogger.',
    status: 'VIP',
    lastVisit: new Date('2026-02-02'),
    totalVisits: 11,
    isAIAssists: false,
    income: 9780,
  },
  {
    name: 'Evelyn Green',
    phone: '+1 202 555 0126',
    description: 'Quiet floors only.',
    status: 'regular',
    lastVisit: new Date('2026-01-14'),
    totalVisits: 5,
    isAIAssists: true,
    income: 2400,
  },
  {
    name: 'Henry Adams',
    phone: '+1 202 555 0155',
    description: 'Business loyalty member.',
    status: 'VIP',
    lastVisit: new Date('2026-02-03'),
    totalVisits: 20,
    isAIAssists: true,
    income: 15800,
  },
  {
    name: 'Grace Nelson',
    phone: '+1 202 555 0186',
    description: 'Occasional stays.',
    status: 'demanding',
    lastVisit: new Date('2025-12-01'),
    totalVisits: 2,
    isAIAssists: false,
    income: 760,
  },
];

function ClientCard({
  name,
  phone,
  status,
  income,
  lastVisit,
  totalVisits,
  description,
  isAIAssists,
}: Client) {
  return (
    <Card className="gap-3 overflow-hidden border-none p-0 shadow-[0_0_4px_0] shadow-black/15">
      <CardHeader className="flex justify-between p-3 pb-0">
        <div className="flex items-center gap-3">
          <Avatar
            className={cn(
              StatusColorsObject[status] === 'blue' && 'text-blue-600 *:bg-blue-100',
              StatusColorsObject[status] === 'amber' && 'text-amber-600 *:bg-amber-100',
              StatusColorsObject[status] === 'emerald' && 'text-emerald-600 *:bg-emerald-100',
              StatusColorsObject[status] === 'fuchsia' && 'text-fuchsia-600 *:bg-fuchsia-100',
              StatusColorsObject[status] === 'red' && 'text-red-600 *:bg-red-100',
              'size-12'
            )}
          >
            <AvatarImage />
            <AvatarFallback className="text-lg">
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-sm">{name}</CardTitle>
            <Link href={`tel:${phone}`} className="cursor-pointer">
              <CardDescription className="text-sm">{phone}</CardDescription>
            </Link>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={'icon'} className="cursor-pointer" variant={'ghost'}>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup className="*:cursor-pointer">
              <DropdownMenuItem>
                <PenBox />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <Trash2 />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="flex grow flex-col gap-3 px-3">
        <span
          className={cn(
            'bg-muted border-border flex grow flex-col gap-1 rounded-sm border p-2 text-xs',
            status === 'demanding' && 'text-destructive bg-destructive/10 border-destructive/10',
            isAIAssists && 'border-sky-600/10 bg-sky-600/10 text-sky-600'
          )}
        >
          {isAIAssists && (
            <b className="flex items-center gap-1 uppercase">
              <Bot size={14} />
              AI Note
            </b>
          )}
          {status === 'demanding' && (
            <b className="flex items-center gap-1 uppercase">
              <AlertCircle size={14} /> Requires Attention
            </b>
          )}
          {!isAIAssists && status !== 'demanding' && (
            <b className="flex items-center gap-1 uppercase">
              <PenToolIcon size={14} /> Note
            </b>
          )}
          <p className="grow rounded-sm">"{description}"</p>
        </span>
        <Separator />
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col justify-between gap-2">
            <span className="text-muted-foreground text-xs">Last Visit</span>
            <TypographySmall className="h-[18.4px]">
              {format(lastVisit, 'dd MMM yyyy')}
            </TypographySmall>
          </div>

          <div className="flex flex-col gap-0.75">
            <span className="text-muted-foreground text-xs">Total Visits</span>
            <span className="">
              <AnimatedNumberChange
                fixed={0}
                startValue={0}
                value={totalVisits}
                Component={TypographySmall}
              />{' '}
              (
              <AnimatedNumberChange
                fixed={0}
                prefix="$"
                startValue={0}
                value={income}
                Component={TypographySmall}
              />
              )
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-border flex items-end justify-between border-t p-3!">
        <Badge
          className={cn(
            StatusColorsObject[status] === 'blue' && 'bg-blue-200 text-blue-600',
            StatusColorsObject[status] === 'amber' && 'bg-amber-200 text-amber-600',
            StatusColorsObject[status] === 'emerald' && 'bg-emerald-200 text-emerald-600',
            StatusColorsObject[status] === 'fuchsia' && 'bg-fuchsia-200 text-fuchsia-600',
            StatusColorsObject[status] === 'red' && 'bg-red-200 text-red-600',
            'rounded-sm text-xs capitalize'
          )}
        >
          {status}
        </Badge>

        <Button
          size={'sm'}
          variant={'link'}
          className="h-auto cursor-pointer text-xs font-semibold"
        >
          History 👉
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Clients() {
  const [status, setStatus] = useState<RadioCategories>('all');

  const filterdList = useMemo(
    () =>
      status !== 'all' ? clientsList.filter((client) => client.status === status) : clientsList,
    [status]
  );

  return (
    <section className="flex flex-1 flex-col">
      <div className="w-full p-2">
        <Item className="flex w-full flex-row flex-nowrap justify-between bg-white p-2 shadow-[0_0_4px_0] shadow-black/15">
          <ItemHeader className="w-fit basis-auto items-end gap-1.25 pl-1.5">
            <div className="flex items-center gap-2 font-semibold">
              <Users size={16} />
              <span>Client base</span>
            </div>
            <span className="-translate-y-1 text-xs">
              (
              <AnimatedNumberChange
                fixed={0}
                postfix=""
                value={12}
                startValue={0}
                Component={TypographyExtraSmall}
              />
              )
            </span>
          </ItemHeader>
          <ItemFooter className="basis-auto flex-col gap-2">
            <div className="flex gap-2">
              <Label className="relative">
                <Search size={20} className="text-muted-foreground absolute left-2" />
                <Input className="w-68 pl-9" placeholder="Search by name or number..." />
              </Label>
              <Button className="cursor-pointer bg-blue-500! hover:brightness-95">
                <span>Add new</span>
                <Plus />
              </Button>
            </div>
          </ItemFooter>
        </Item>
      </div>

      <div className="flex w-full justify-start px-2">
        <RadioGroup
          defaultValue="all"
          className="flex gap-2 *:cursor-pointer"
          onValueChange={(value) => setStatus(value as RadioCategories)}
        >
          {radio_categories.map((category) => (
            <Label key={`radio-category-${category.value}`}>
              <RadioGroupItem className="peer sr-only" value={category.value} />
              <span
                className={cn(
                  'flex h-6.5 items-center gap-1 rounded-full border py-1 pr-1.75 pl-3 text-xs hover:brightness-95',

                  category.color === 'blue' &&
                    'peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-100 peer-data-[state=checked]:text-blue-600',
                  category.color === 'amber' &&
                    'peer-data-[state=checked]:border-amber-600 peer-data-[state=checked]:bg-amber-100 peer-data-[state=checked]:text-amber-600',
                  category.color === 'emerald' &&
                    'peer-data-[state=checked]:border-emerald-600 peer-data-[state=checked]:bg-emerald-100 peer-data-[state=checked]:text-emerald-600',
                  category.color === 'fuchsia' &&
                    'peer-data-[state=checked]:border-fuchsia-600 peer-data-[state=checked]:bg-fuchsia-100 peer-data-[state=checked]:text-fuchsia-600',
                  category.color === 'red' &&
                    'peer-data-[state=checked]:border-red-600 peer-data-[state=checked]:bg-red-100 peer-data-[state=checked]:text-red-600'
                )}
              >
                <span className="capitalize">{category.value}</span>
                <category.icon className="h-full" />
              </span>
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="w-full p-2">
        <Separator className="" />
      </div>

      <ScrollArea className="relative h-full max-h-[calc(100%-105px)] pb-2">
        <div className="grid h-fit w-full grid-cols-3 gap-3 p-2">
          {filterdList.length ? (
            filterdList.map((client, index) => (
              <ClientCard {...client} key={`message-${client.name}-${index}`} />
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

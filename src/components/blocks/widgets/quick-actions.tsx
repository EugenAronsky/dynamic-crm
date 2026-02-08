import { Button } from '@/components/ui/button';
import { Item, ItemContent, ItemHeader } from '@/components/ui/item';
import { cn } from '@/lib/utils';
import {
  Bell,
  CalendarPlus,
  LucideIcon,
  Megaphone,
  SendToBack,
  Shredder,
  UserPlus,
  Zap,
} from 'lucide-react';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof Item> & { isResizing: boolean };

type Action = {
  icon: LucideIcon;
  title: string;
  action: () => void;
  color: { text: string; bg: string };
};

const actions: Action[] = [
  {
    icon: CalendarPlus,
    title: 'New Booking',
    action: () => console.log('trigger'),
    color: { text: 'text-green-500', bg: 'bg-green-100!' },
  },
  {
    icon: UserPlus,
    title: 'Add client',
    action: () => console.log('trigger'),
    color: { text: 'text-blue-500', bg: 'bg-blue-100!' },
  },
  {
    icon: SendToBack,
    title: 'Transfer',
    action: () => console.log('trigger'),
    color: { text: 'text-violet-500', bg: 'bg-violet-100!' },
  },
  {
    icon: Megaphone,
    title: 'Fill gap',
    action: () => console.log('trigger'),
    color: { text: 'text-orange-500', bg: 'bg-orange-100!' },
  },
  {
    icon: Bell,
    title: 'Remind',
    action: () => console.log('trigger'),
    color: { text: 'text-amber-500', bg: 'bg-amber-100!' },
  },
  {
    icon: Shredder,
    title: 'Cancellation',
    action: () => console.log('trigger'),
    color: { text: 'text-red-500', bg: 'bg-red-100!' },
  },
];

function QuickActions({ isResizing, ...rest }: Props) {
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
          <Zap size={18} /> <span>Quick Actions</span>
        </div>
      </ItemHeader>
      <ItemContent className="flex min-h-fit w-full basis-0 flex-row items-center justify-between">
        <div className="grid size-full grid-cols-3 gap-2">
          {actions.map(({ action, title, icon: Icon, color }, index) => {
            return (
              <Button
                onClick={action}
                variant={'secondary'}
                key={`action-${title}-${index}`}
                className={cn(
                  'h-full cursor-pointer flex-col hover:brightness-98 active:brightness-96',
                  color.bg,
                  color.text
                )}
              >
                <Icon className="size-6" />
                <span>{title}</span>
              </Button>
            );
          })}
        </div>
      </ItemContent>
    </Item>
  );
}

export default QuickActions;

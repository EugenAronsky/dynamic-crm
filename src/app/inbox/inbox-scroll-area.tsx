'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HatGlasses } from 'lucide-react';
import MessagesCard from './messages-card';
import { Message } from './page';

function InboxScrollArea({ list }: { list: Message[] }) {
  return (
    <ScrollArea className="relative h-full max-h-[calc(var(--widget-content-height)-2px)] w-full">
      <div className="flex h-fit w-full flex-col gap-3 p-2">
        {list.length ? (
          list.map((message, index) => (
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
  );
}

export default InboxScrollArea;

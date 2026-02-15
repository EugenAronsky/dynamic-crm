import { cn } from '@/lib/utils';
import Widget, { WidgetProps } from '../widget';
import IndexBody from './index-body';

function Index({ ...rest }: WidgetProps) {
  return (
    <Widget {...rest} className={cn('min-h-fit p-1 pl-3.5', rest.className)}>
      <Widget.Header className="flex min-h-fit w-full basis-0 flex-row items-center justify-between">
        <IndexBody />
        <Widget.PeriodSelect />
      </Widget.Header>
    </Widget>
  );
}

export default Index;

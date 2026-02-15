import { Receipt } from 'lucide-react';
import Widget, { WidgetProps } from '../widget';
import ServicesRevenueBody from './services-revenue-body';

function ServicesRevenue({ ...rest }: WidgetProps) {
  return (
    <Widget {...rest}>
      <Widget.Header className="w-full basis-0">
        <Widget.Title>
          <Receipt size={18} /> Revenue by Services
        </Widget.Title>
        <Widget.PeriodSelect />
      </Widget.Header>
      <Widget.Content skeleton={<div className="bg-muted h-4 rounded" />}>
        <ServicesRevenueBody />
      </Widget.Content>
    </Widget>
  );
}

export default ServicesRevenue;

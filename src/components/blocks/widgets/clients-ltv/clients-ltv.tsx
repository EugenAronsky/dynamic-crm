import { UserStar } from 'lucide-react';
import Widget, { WidgetProps } from '../widget';
import ClientsLTVBody from './clients-ltv-body';

function ClintsLTV({ ...rest }: WidgetProps) {
  return (
    <Widget {...rest}>
      <Widget.Header className="w-full basis-0">
        <Widget.Title>
          <UserStar size={18} /> Top Clients by LTV
        </Widget.Title>
      </Widget.Header>
      <Widget.Content skeleton={<div className="bg-muted h-4 rounded" />}>
        <ClientsLTVBody />
      </Widget.Content>
    </Widget>
  );
}

export default ClintsLTV;

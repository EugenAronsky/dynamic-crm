'use client';
import ClintsLTV from '@/components/blocks/widgets/clients-ltv/clients-ltv';
import Income from '@/components/blocks/widgets/income/income';
import Index from '@/components/blocks/widgets/index';
import ServicesRevenue from '@/components/blocks/widgets/services-revenue/services-revenue';
import Workload from '@/components/blocks/widgets/workload/workload';

export default function Statistics() {
  return (
    <div className="grid h-full min-h-0 min-w-0 flex-1 grid-cols-27 grid-rows-[auto_1fr_1fr] gap-2 p-2 will-change-[wight]">
      <Index className="col-span-27" />
      <Workload className="col-span-9" />
      <ServicesRevenue className="col-span-9" />
      <ClintsLTV className="col-span-9" />
      <Income className="col-span-16" />
    </div>
  );
}

import { AnimatedNumberChange } from '@/components/blocks/motion/animated-number-change';
import { TypographyExtraSmall } from '@/components/blocks/typography/typography-extra-small';
import { Button } from '@/components/ui/button';
import { Item, ItemFooter, ItemHeader } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { BriefcaseBusiness, Plus } from 'lucide-react';
import { columns, Service } from './columns';
import { DataTable } from './data-table';
import { ScrollArea } from '@/components/ui/scroll-area';

async function getData(): Promise<any> {
  // Fetch data from your API here.
  return [
    {
      service: 'Women’s Haircut',
      category: 'Beauty',
      price: 45,
      duration: '1 h',
      availability: 'Mon–Sat',
      status: 'Active',
    },
    {
      service: 'Massage Therapy',
      category: 'Beauty',
      price: 80,
      duration: '1 h 30 min',
      availability: 'Weekends',
      status: 'Active',
    },
    {
      service: 'Pipe Leak Repair',
      category: 'Repair',
      price: 95,
      duration: '1 h',
      availability: 'On request',
      status: 'Active',
    },
    {
      service: 'Apartment Deep Cleaning',
      category: 'Cleaning',
      price: 150,
      duration: '3 h',
      availability: 'Mon–Sun',
      status: 'Active',
    },
    {
      service: 'Business Consultation',
      category: 'Consulting',
      price: 200,
      duration: '2 h',
      availability: 'Mon–Fri',
      status: 'Draft',
    },
    {
      service: 'Logo & Branding Kit',
      category: 'Creative',
      price: 300,
      duration: '5 days',
      availability: 'Remote',
      status: 'Active',
    },
    {
      service: 'Website Development',
      category: 'IT & Digital',
      price: 900,
      duration: '10 days',
      availability: 'Remote',
      status: 'Active',
    },
    {
      service: 'English Tutoring',
      category: 'Coaching',
      price: 40,
      duration: '1 h',
      availability: 'Evenings',
      status: 'Active',
    },
    {
      service: 'Personal Training Session',
      category: 'Fitness',
      price: 60,
      duration: '1 h',
      availability: 'Weekends',
      status: 'Active',
    },
    {
      service: 'Wedding Photography',
      category: 'Events',
      price: 1200,
      duration: 'Full day',
      availability: 'By booking',
      status: 'Active',
    },
    {
      service: 'Furniture Moving Help',
      category: 'Logistics',
      price: 250,
      duration: '4 h',
      availability: 'Weekends',
      status: 'Hidden',
    },
    {
      service: 'Car Engine Diagnostics',
      category: 'Automotive',
      price: 110,
      duration: '1 h',
      availability: 'Mon–Sat',
      status: 'Active',
    },
    {
      service: 'Air Conditioner Installation',
      category: 'Home Services',
      price: 350,
      duration: '3 h',
      availability: 'On request',
      status: 'Draft',
    },
    {
      service: 'Dog Grooming',
      category: 'Pet Care',
      price: 55,
      duration: '1 h',
      availability: 'By appointment',
      status: 'Active',
    },
    {
      service: 'Babysitting (Evening)',
      category: 'Childcare',
      price: 35,
      duration: '3 h',
      availability: 'Evenings',
      status: 'Active',
    },
    {
      service: 'Event Catering',
      category: 'Food & Catering',
      price: 2000,
      duration: 'Full day',
      availability: 'By booking',
      status: 'Draft',
    },
    {
      service: 'Property Consultation',
      category: 'Real Estate',
      price: 150,
      duration: '1 h',
      availability: 'Mon–Fri',
      status: 'Active',
    },
    {
      service: 'Travel Itinerary Planning',
      category: 'Tourism',
      price: 180,
      duration: '2 days',
      availability: 'Remote',
      status: 'Active',
    },
    {
      service: 'CCTV Installation',
      category: 'Security',
      price: 600,
      duration: '5 h',
      availability: 'On request',
      status: 'Hidden',
    },
    {
      service: 'Custom Furniture Production',
      category: 'Manufacturing',
      price: 1200,
      duration: '14 days',
      availability: 'By order',
      status: 'Draft',
    },
    {
      service: 'Custom Service Package',
      category: 'Other',
      price: 300,
      duration: 'Varies',
      availability: 'Flexible',
      status: 'Active',
    },
  ];
}

export default async function MyServices() {
  const data: Service[] = await getData();

  return (
    <section className="flex flex-1 flex-col">
      <div className="w-full p-2">
        <Item className="flex w-full flex-row flex-nowrap justify-between bg-white p-2 shadow-[0_0_4px_0] shadow-black/15">
          <ItemHeader className="w-fit basis-auto items-end gap-1.25 pl-1.5">
            <div className="flex items-center gap-2 font-semibold">
              <BriefcaseBusiness size={16} />
              <span>
                <span className="capitalize">{'status'}</span> services
              </span>
            </div>
            <span className="-translate-y-1 text-xs">
              (
              {/* <AnimatedNumberChange
                fixed={0}
                value={0} // filterdList?.length
                postfix=""
                startValue={0}
                Component={TypographyExtraSmall}
              /> */}
              )
            </span>
          </ItemHeader>
          <ItemFooter className="basis-auto flex-col gap-2">
            <div className="flex gap-2">
              <Button className="cursor-pointer bg-blue-500! hover:brightness-95">
                <span>Add new</span>
                <Plus />
              </Button>
            </div>
          </ItemFooter>
        </Item>
      </div>

      <div className="w-full p-2">
        <Separator className="" />
      </div>

      <DataTable columns={columns} data={data} />
    </section>
  );
}

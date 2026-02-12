'use client';
import {
  BadgeCheck,
  BadgeQuestionMark,
  Bell,
  BookMarked,
  BookUser,
  Cable,
  CalendarRange,
  ChartArea,
  ChevronRight,
  ChevronsUpDown,
  ClipboardClock,
  Contact,
  CreditCard,
  FolderClock,
  FolderKanban,
  HandPlatter,
  HatGlasses,
  Inbox,
  LogOut,
  LucideProps,
  PanelsTopLeft,
  Play,
  Settings,
  Slack,
  Sparkles,
  Wrench,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

interface SidebarGroupProps {
  label: string;
  menu: Array<MenuPops>;
}

interface MenuItemProps {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}

interface MenuPops extends MenuItemProps {
  messages?: number;
  submenu?: Array<MenuItemProps>;
}

const sidebar_groups: SidebarGroupProps[] = [
  {
    label: 'Platform',
    menu: [
      {
        title: 'Overview',
        url: '/overview',
        icon: FolderKanban,
        submenu: [
          { title: 'Dashboard', url: '/dashboard', icon: PanelsTopLeft },
          { title: 'Calendar', url: '/calendar', icon: CalendarRange },
          { title: 'Statistics', url: '/statistics', icon: ChartArea },
          { title: 'Activity', url: '/activity', icon: ClipboardClock },
        ],
      },
      {
        title: 'Inbox',
        url: '/inbox',
        icon: Inbox,
        messages: 12,
      },
      {
        title: 'Clients',
        url: '/clients',
        icon: BookUser,
      },
      {
        title: 'My Services',
        url: '/my-services',
        icon: HandPlatter,
      },
      {
        title: 'Documentation',
        url: '/docs',
        icon: BookMarked,
        submenu: [
          { title: 'Introduction', url: '/introduction', icon: Cable },
          { title: 'Getting Started', url: '/getting-started', icon: Play },
          { title: 'FAQ', url: '/faq', icon: BadgeQuestionMark },
          { title: 'Changelog', url: '/changelog', icon: FolderClock },
          { title: 'Privacy Policy', url: '/privacy-policy', icon: HatGlasses },
          //   { title: 'Terms of Use', url: '/terms-of-use' },
        ],
      },
      {
        title: 'Settings',
        url: '/settings',
        icon: Settings,
        submenu: [
          { title: 'General', url: '/general', icon: Wrench },
          { title: 'Account', url: '/account', icon: BadgeCheck },
          { title: 'Billing', url: '/billing', icon: CreditCard },
          { title: 'Notifications', url: '/notifications', icon: Bell },
        ],
      },
    ],
  },

  //   {
  //     label: 'Features',
  //     menu: [],
  //   },
];

export function AppSidebar() {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center gap-3 overflow-hidden">
        <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-sky-400 text-white">
          <Slack />
        </div>
        <AnimatePresence>
          {open ? (
            <motion.div key="logo-open" exit={{ opacity: 0 }} className="font-semibold text-nowrap">
              Dynamic CRM
            </motion.div>
          ) : null}
        </AnimatePresence>
      </SidebarHeader>
      <SidebarSeparator className="m-0" />
      <SidebarContent>
        {sidebar_groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.menu.map((item) => (
                  <Collapsible className="group/collapsible" key={item.title}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          {item.submenu?.length ? (
                            <div className="cursor-pointer">
                              <item.icon />
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=closed]/collapsible:rotate-0 group-data-[state=open]/collapsible:rotate-90" />
                            </div>
                          ) : (
                            <Link href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {item.messages && (
                        <SidebarMenuBadge className="aspect-square rounded-full bg-red-400 p-0 text-white!">
                          {item.messages}
                        </SidebarMenuBadge>
                      )}
                      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all">
                        {item.submenu?.length && (
                          <SidebarMenuSub>
                            {item.submenu.map((subitem) => (
                              <SidebarMenuSubItem key={subitem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link
                                    href={item.url + subitem.url}
                                    className="**:text-muted-foreground"
                                  >
                                    <subitem.icon />
                                    <span>{subitem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        )}
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <SidebarMenuButton className="h-auto transition-all data-[state=open]:bg-white data-[state=open]:shadow-md">
                  <Avatar className="rounded-lg">
                    <AvatarImage src={'https://ui.shadcn.com/avatars/shadcn.jpg'} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Item className="p-0">
                    <ItemContent className="gap-0">
                      <ItemTitle>Jhon Cruse</ItemTitle>
                      <ItemDescription className="text-xs">exemple@mail.com</ItemDescription>
                    </ItemContent>
                  </Item>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="end"
                className="w-(--radix-popper-anchor-width)"
              >
                <Item className="gap-2 px-1 py-1.5">
                  <ItemMedia>
                    <Avatar className="rounded-lg">
                      <AvatarImage src={'https://ui.shadcn.com/avatars/shadcn.jpg'} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent className="gap-0">
                    <ItemTitle>Jhon Cruse</ItemTitle>
                    <ItemDescription className="text-xs">exemple@mail.com</ItemDescription>
                  </ItemContent>
                </Item>

                <DropdownMenuSeparator />

                <Link href="/upgrade">
                  <DropdownMenuItem className="cursor-pointer text-amber-500! hover:bg-amber-100!">
                    <Sparkles className="text-amber-500" />
                    <span>Upgrade to Pro</span>
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <DropdownMenuGroup className="*:cursor-pointer">
                  <Link href="/settings/account">
                    <DropdownMenuItem>
                      <BadgeCheck />
                      <span>Account</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings/billing">
                    <DropdownMenuItem>
                      <CreditCard />
                      <span>Billing</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings/notifications">
                    <DropdownMenuItem>
                      <Bell />
                      <span>Notifications</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem variant="destructive" className="cursor-pointer">
                  <LogOut />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

<script lang="ts" setup>
import {
  LucideActivity,
  LucideLayoutDashboard,
  LucideChartColumn,
  LucideSettings,
  LucideChevronsUpDown,
} from 'lucide-vue-next';

const data = {
  app: {
    logo: LucideActivity,
    title: 'Pulse',
    subTitle: 'Real-Time Aggregation Dashboard',
  },
  user: {
    name: 'John Doe',
    email: 'john.doe@email.com',
  },
  menu: [
    {
      name: 'Dashboard',
      url: '/',
      icon: LucideLayoutDashboard,
    },
    // {
    //   name: 'Analytics',
    //   url: '#',
    //   icon: LucideChartColumn,
    // },
    // {
    //   name: 'Settings',
    //   url: '#',
    //   icon: LucideSettings,
    // },
  ],
};

const userStore = useUserStore();
</script>

<template>
  <SidebarProvider class="h-svh overflow-hidden">
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div
                class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <component :is="data.app.logo" class="size-4" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ data.app.title }}</span>
                <span class="truncate text-xs">{{ data.app.subTitle }}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup class="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in data.menu" :key="item.name">
              <SidebarMenuButton as-child>
                <NuxtLink
                  :to="item.url"
                  active-class="font-medium shadow-sm bg-secondary text-foreground">
                  <component :is="item.icon" />
                  <span>{{ item.name }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarFallback class="rounded-lg">
                      {{ getInitials(userStore.account.name) }}
                    </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{ userStore.account.name }}</span>
                    <span class="truncate text-xs">{{ userStore.account.email }}</span>
                  </div>
                  <LucideChevronsUpDown class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                :side-offset="4">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <LucideUserCog />
                    Account
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LucideLogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset class="overflow-hidden">
      <header class="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2">
        <div class="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="line-clamp-1">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Separator orientation="vertical" class="ml-auto data-[orientation=vertical]:h-4" />
          <ThemeToggle />
        </div>
      </header>
      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style></style>

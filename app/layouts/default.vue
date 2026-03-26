<script lang="ts" setup>
import {
  LucideActivity,
  LucideLayoutDashboard,
  LucideChartColumn,
  LucideSettings,
  LucideChevronsUpDown,
} from "lucide-vue-next";

const data = {
  app: {
    logo: LucideActivity,
    title: "Pulse",
    subTitle: "Real-Time Aggregation Dashboard",
  },
  user: {
    name: "John Doe",
    email: "john.doe@email.com",
  },
  menu: [
    {
      name: "Dashboard",
      url: "/",
      icon: LucideLayoutDashboard,
    },
    {
      name: "Analytics",
      url: "#",
      icon: LucideChartColumn,
    },
    {
      name: "Settings",
      url: "#",
      icon: LucideSettings,
    },
  ],
};

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                class="flex justify-center items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground aspect-square size-8"
              >
                <component :is="data.app.logo" class="size-4" />
              </div>
              <div class="grid flex-1 text-sm leading-tight text-left">
                <span class="font-semibold truncate">{{ data.app.title }}</span>
                <span class="text-xs truncate">{{ data.app.subTitle }}</span>
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
                  active-class="font-medium shadow-sm bg-secondary text-foreground"
                >
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
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar class="w-8 h-8 rounded-lg">
                    <AvatarFallback class="rounded-lg">
                      {{ getInitials(data.user.name) }}
                    </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-sm leading-tight text-left">
                    <span class="font-semibold truncate">{{
                      data.user.name
                    }}</span>
                    <span class="text-xs truncate">{{ data.user.email }}</span>
                  </div>
                  <LucideChevronsUpDown class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                :side-offset="4"
              >
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
    <SidebarInset>
      <header class="flex gap-2 items-center px-4 h-16 shrink-0">
        <!-- Left side -->
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <!-- Right side -->
        <div class="flex gap-2 items-center ml-auto">
          <Separator orientation="vertical" class="mr-2 h-4" />
          <ThemeToggle />
        </div>
      </header>
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>

<style></style>

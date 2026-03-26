
<script lang="ts" setup>
const items = [
  {
    id: 'recents',
    label: 'Recents',
  },
  {
    id: 'home',
    label: 'Home',
  },
  {
    id: 'applications',
    label: 'Applications',
  },
  {
    id: 'desktop',
    label: 'Desktop',
  },
  {
    id: 'downloads',
    label: 'Downloads',
  },
  {
    id: 'documents',
    label: 'Documents',
  },
] as const
</script>

<template>
  <div class="flex flex-col gap-2 items-start p-4">
    <header>
      <h1 class="mb-2 text-3xl font-bold">Styleguide</h1>
      <p class="max-w-3xl leading-relaxed text-muted-foreground">
        Ce styleguide référence les principaux composants utilisés dans l'application.
        Il complète la documentation de 
        <a href="https://radix.shadcn-vue.com/" target="_blank" class="underline hover:text-primary">shadcn-vue</a> 
        en présentant nos variantes personnalisées et sert à aider à l'intégration des composants dans l'application.
      </p>
    </header>

    <br>

    <h2 class="text-2xl font-bold">Buttons</h2>
    <div class="flex flex-wrap gap-2">
      <Button>Button</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>

    <br>

    <h2 class="text-2xl font-bold">Accordion</h2>
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <br>

    <h2 class="text-2xl font-bold">Alert dialog</h2>
    <!-- <Alert class="w-auto">
      <LucideTerminal class="size-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
    <Alert variant="destructive" class="w-auto">
      <LucideAlertCircle class="size-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert> -->
    <br>

    <div class="text-red-700">Alert dialog bug on import!</div>
    <br>

    <h2 class="text-2xl font-bold">Avatar</h2>
    <Avatar>
      <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>

    <br>

    <h2 class="text-2xl font-bold">Checkbox</h2>
    <form @submit="">
      <FormField name="items">
        <FormItem>
          <div class="mb-4">
            <FormLabel class="text-base">
              Sidebar
            </FormLabel>
            <FormDescription>
              Select the items you want to display in the sidebar.
            </FormDescription>
          </div>

          <FormField v-for="item in items" v-slot="{ value, handleChange }" :key="item.id" type="checkbox" :value="item.id" :unchecked-value="false" name="items">
            <FormItem class="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  :checked="value.includes(item.id)"
                  @update:checked="handleChange"
                />
              </FormControl>
              <FormLabel class="font-normal">
                {{ item.label }}
              </FormLabel>
            </FormItem>
          </FormField>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex justify-start mt-4">
        <Button type="submit">
          Submit
        </Button>
      </div>
    </form>

    <br>

    <h2 class="text-2xl font-bold">Badges</h2>
    <div class="flex flex-wrap gap-2">
      <Badge variant="default">
        Default
      </Badge>
      <Badge variant="secondary">
        Secondary
      </Badge>
      <Badge variant="destructive">
        Destructive
      </Badge>
      <Badge variant="outline">
        Outline
      </Badge>
    </div>
  </div>
</template>

<style>

</style>

import type { Meta, StoryObj } from '@storybook/react';
import { ConsumableInventoryEntries } from './ConsumableInventoryEntries';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { Theme } from '@radix-ui/themes';
import { InventoryJoined } from '../lib/clientGetters';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } },
});


const meta = {
  component: ConsumableInventoryEntries,
} satisfies Meta<typeof ConsumableInventoryEntries>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockData: InventoryJoined[] = [{
  inventory: { id: 1, inventoryType: 'consumable', purchaseBagIndex: 0, purchaseId: 1, status: 'inprogress' },
  products: { id: 1, createdDate: new Date(), originCountry: "Denmark", originRegion: "Kokkedal", productName: 'Jakke kaf', rating: 2, supplier: 'dorkob' },
  purchases: { id: 1, productId: 1, cost: 50, createdDate: new Date(), numberOfBags: 1, purchaseDate: new Date().toDateString(), weightPerBag: 250 }
}]

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => {
      queryClient.setQueryData(['inventory', 'consumable'], mockData);
      return (
        <Theme appearance="dark" accentColor="brown" grayColor="sand" radius="large" scaling="95%">
          <MantineProvider>
            <QueryClientProvider client={queryClient}>
              <Story />
            </QueryClientProvider>
          </MantineProvider>
        </Theme>
      );

    }]
};
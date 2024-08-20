
import type { Meta, StoryObj } from '@storybook/react';
import { PurchaseForm } from './PurchaseForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } },
});


const meta = {
  component: PurchaseForm,
} satisfies Meta<typeof PurchaseForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => {
      queryClient.setQueryData(["cash-key"], {
        //... set your mocked data here
      });
      return (
        <Theme appearance="dark" accentColor="brown" grayColor="sand" radius="large" scaling="95%">
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </Theme>
      );

    }]
};
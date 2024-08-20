
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import { Overview } from './Overview';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } },
});


const meta = {
  component: Overview,
} satisfies Meta<typeof Overview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => {
      // queryClient.setQueryData(["purchases"], {
      //   inventory: { id: 1 }
      // });
      return (
        <Theme appearance="dark" accentColor="brown" grayColor="sand" radius="large" scaling="95%">
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </Theme>
      );

    }]
};
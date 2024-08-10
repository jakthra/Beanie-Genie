'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import type * as React from 'react'
import { getQueryClient } from './lib/getQueryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { MantineProvider } from '@mantine/core'

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient()

    return (
        <MantineProvider defaultColorScheme="dark">
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools />
            </QueryClientProvider>
        </MantineProvider>
    )
}

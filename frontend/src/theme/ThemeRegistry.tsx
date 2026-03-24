'use client'

import * as React from 'react'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import { useServerInsertedHTML } from 'next/navigation'
import type { EmotionCache } from '@emotion/cache'

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const [{ cache, inserted }] = React.useState(() => {
    const cache = createCache({ key: 'mui', prepend: true })
    cache.compat = true

    const inserted: string[] = []

    const prevInsert = cache.insert

    // 👇 aqui corrigimos os tipos
    cache.insert = (...args: Parameters<EmotionCache['insert']>) => {
      const serialized = args[1]

      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }

      return prevInsert(...args)
    }

    return { cache, inserted }
  })

  useServerInsertedHTML(() => (
    <style
      data-emotion={`mui ${inserted.join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ))

  const theme = createTheme()

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
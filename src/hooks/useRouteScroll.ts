import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
export function useRouteScroll() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash)
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches
            ? 'instant'
            : 'smooth',
        })
    else {
      window.scrollTo(0, 0)
      document.getElementById('main')?.focus({ preventScroll: true })
    }
  }, [pathname, hash])
}

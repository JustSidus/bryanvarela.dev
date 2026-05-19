import { useState } from 'react'

function detectMobile() {
  // pointer: coarse = dedo, no se ve afectado por "Request Desktop Site"
  if (window.matchMedia('(pointer: coarse)').matches) return true
  // User Agent Client Hints (Chromium) — no cambia aunque se active "desktop site"
  if (navigator.userAgentData?.mobile) return true
  // Fallback: regex sobre UA string
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export function useIsMobileDevice() {
  const [isMobile] = useState(detectMobile)
  return isMobile
}

export function whatsappLink(
  number: string | null,
  message = '',
): string | null {
  const digits = number?.replace(/\D/g, '') ?? ''
  if (!/^55[1-9]\d{9,10}$/.test(digits)) return null
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}
export function safeUrl(value: string | null | undefined): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}

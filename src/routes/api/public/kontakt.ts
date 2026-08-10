import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const schema = z.object({
  namn: z.string().trim().min(1).max(120),
  telefon: z.string().trim().min(4).max(40),
  epost: z.string().trim().email().max(160).optional().or(z.literal('')),
  regnummer: z.string().trim().min(2).max(12),
  bil: z.string().trim().max(160).optional().or(z.literal('')),
  meddelande: z.string().trim().max(4000).optional().or(z.literal('')),
  // honeypot
  webbplats: z.string().max(0).optional().or(z.literal('')),
})

const hits = new Map<string, number[]>()
const LIMIT = 5
const WINDOW = 10 * 60 * 1000

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > LIMIT
}

export const Route = createFileRoute('/api/public/kontakt')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get('cf-connecting-ip') ||
          request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
          'unknown'
        if (rateLimited(ip)) {
          return Response.json({ error: 'För många förfrågningar' }, { status: 429 })
        }

        let parsed
        try {
          parsed = schema.safeParse(await request.json())
        } catch {
          return Response.json({ error: 'Ogiltig förfrågan' }, { status: 400 })
        }
        if (!parsed.success) {
          return Response.json({ error: 'Kontrollera fälten' }, { status: 400 })
        }
        const data = parsed.data
        if (data.webbplats) {
          return Response.json({ ok: true })
        }

        const { sendTemplateEmail } = await import('@/lib/email-templates/send-email')
        try {
          await sendTemplateEmail('contact-request', 'Tuningcenter59@gmail.com', {
            templateData: {
              namn: data.namn,
              telefon: data.telefon,
              epost: data.epost || '',
              regnummer: data.regnummer.toUpperCase(),
              bil: data.bil || '',
              meddelande: data.meddelande || '',
            },
            idempotencyKey: `contact-request-${crypto.randomUUID()}`,
            ...(data.epost ? { replyTo: data.epost } : {}),
          })
        } catch (error) {
          console.error('contact send failed', error)
          return Response.json({ error: 'Kunde inte skicka just nu' }, { status: 502 })
        }

        return Response.json({ ok: true })
      },
    },
  },
})

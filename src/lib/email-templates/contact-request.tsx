import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  namn?: string
  telefon?: string
  epost?: string
  bil?: string
  meddelande?: string
}

const Email = ({ namn, telefon, epost, bil, meddelande }: Props) => (
  <Html lang="sv" dir="ltr">
    <Head />
    <Preview>{`Ny förfrågan från ${namn || 'hemsidan'}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={kicker}>Tuning Center Örebro</Text>
        <Heading style={heading}>Ny förfrågan från hemsidan</Heading>
        <Section>
          <Row label="Namn" value={namn} />
          <Row label="Telefon" value={telefon} />
          <Row label="E-post" value={epost} />
          <Row label="Bil" value={bil} />
        </Section>
        <Hr style={hr} />
        <Text style={label}>Meddelande</Text>
        <Text style={message}>{meddelande || '(inget meddelande)'}</Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label: l, value }: { label: string; value?: string | undefined }) => (
  <Text style={row}>
    <span style={label}>{l}: </span>
    <span style={rowValue}>{value || '-'}</span>
  </Text>
)

export const template = {
  component: Email,
  subject: 'Ny förfrågan från hemsidan',
  displayName: 'Kontaktförfrågan',
  previewData: {
    namn: 'Anders Svensson',
    telefon: '070 000 00 00',
    epost: 'anders@example.com',
    bil: 'BMW 320d, 2018',
    meddelande: 'Hej! Jag vill boka steg 1 optimering.',
  },
  to: 'Tuningcenter59@gmail.com',
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '24px', maxWidth: '560px' }
const kicker = {
  fontSize: '11px',
  letterSpacing: '2px',
  textTransform: 'uppercase' as const,
  color: '#ea580c',
  margin: '0 0 4px',
  fontWeight: 700,
}
const heading = { fontSize: '24px', color: '#111827', margin: '0 0 16px' }
const row = { margin: '0 0 6px', fontSize: '14px', color: '#111827' }
const label = { fontSize: '12px', color: '#6b7280', fontWeight: 700 }
const rowValue = { fontSize: '14px', color: '#111827' }
const hr = { borderColor: '#e5e7eb', margin: '18px 0' }
const message = { fontSize: '14px', color: '#111827', whiteSpace: 'pre-wrap' as const }

export default Email

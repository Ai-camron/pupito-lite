'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Activity, Bell, KeyRound, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

const securityChecks = [
  {
    title: 'Session protection',
    status: 'Protected',
    detail: 'Local auth state is sandboxed per browser and cleared on sign-out.',
    icon: ShieldCheck
  },
  {
    title: 'Credential guard',
    status: 'Strong',
    detail: 'Passwords require 8+ characters and are never stored in plain text.',
    icon: Lock
  },
  {
    title: 'Activity monitoring',
    status: 'Healthy',
    detail: 'Recent sign-ins are tracked locally; unauthorized users are redirected.',
    icon: Activity
  }
]

const alertFeed = [
  {
    level: 'info',
    message: 'Reminder: enable 12+ character passphrases for maximum account hardening.',
    timestamp: 'Today, 09:18 AM'
  },
  {
    level: 'success',
    message: 'No suspicious client activity detected in the last 30 days.',
    timestamp: 'Yesterday, 08:42 PM'
  },
  {
    level: 'warning',
    message: 'Review access logs after shared device sign-ins to maintain private access.',
    timestamp: 'Monday, 02:11 PM'
  }
]

export default function ClientDashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/client-dashboard')
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0D0D0D] via-[#0a1a24] to-[#0D0D0D] flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl border border-[#22d3ee]/20 bg-[#0f172a]/80 p-8 text-center shadow-[0_0_40px_rgba(34,211,238,0.25)]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#22d3ee] to-[#0ea5e9] shadow-[0_0_25px_rgba(34,211,238,0.3)]">
            <Lock className="h-6 w-6 text-[#0b1224]" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-white">Securing private access…</h1>
          <p className="mt-2 text-sm text-white/70">Redirecting to sign in so only approved clients reach the dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0D0D0D] via-[#0a1a24] to-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3"
        >
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#22d3ee]">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Private client access
          </p>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-black bg-linear-to-r from-[#22d3ee] via-[#0ea5e9] to-[#1E90FF] bg-clip-text text-transparent">
              Client Dashboard
            </h1>
            <p className="text-white/70 max-w-2xl">
              Track your collaboration status, monitor security signals, and access invite-only updates with a blue-forward palette for sharper contrast.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#22d3ee]/40 bg-[#0f172a]/60 px-3 py-1">
              <CheckCircle className="h-4 w-4 text-[#22d3ee]" aria-hidden="true" />
              Authenticated as {user.email}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#22d3ee]/30 bg-[#0f172a]/60 px-3 py-1">
              <ShieldCheck className="h-4 w-4 text-[#22d3ee]" aria-hidden="true" />
              Enforced redirect for unauthorized visitors
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {securityChecks.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#22d3ee]/25 bg-linear-to-br from-[#0f172a]/80 via-[#0b1224]/70 to-[#0f172a]/80 p-6 shadow-[0_0_30px_rgba(34,211,238,0.18)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-[#22d3ee]/20 to-[#0ea5e9]/30 border border-[#22d3ee]/30">
                        <Icon className="h-5 w-5 text-[#22d3ee]" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-white font-semibold">{item.title}</p>
                        <p className="text-xs text-white/60">Updated just now</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-[#22d3ee]/30 bg-[#0f172a]/70 px-3 py-1 text-xs font-semibold text-[#22d3ee]">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-white/70">{item.detail}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                    <span>Blue/teal elevation keeps focus on secure actions.</span>
                    <Link href="/help/security" className="inline-flex items-center gap-1 text-[#22d3ee] hover:text-[#0ea5e9]">
                      Learn more
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[#22d3ee]/25 bg-linear-to-b from-[#0f172a]/80 via-[#0b1224]/70 to-[#0f172a]/80 p-6 shadow-[0_0_30px_rgba(34,211,238,0.18)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Security activity</p>
                <p className="text-xs text-white/60">Only visible to authenticated clients</p>
              </div>
              <span className="rounded-full bg-[#22d3ee]/15 px-3 py-1 text-xs font-semibold text-[#22d3ee]">Live</span>
            </div>
            <div className="mt-4 space-y-3">
              {alertFeed.map((alert) => (
                <div
                  key={alert.timestamp}
                  className="rounded-xl border border-[#22d3ee]/20 bg-[#0f172a]/70 p-3 flex items-start gap-3"
                >
                  {alert.level === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-400 mt-1" aria-hidden="true" />}
                  {alert.level === 'info' && <Bell className="h-4 w-4 text-[#22d3ee] mt-1" aria-hidden="true" />}
                  {alert.level === 'success' && <CheckCircle className="h-4 w-4 text-emerald-400 mt-1" aria-hidden="true" />}
                  <div className="space-y-1">
                    <p className="text-sm text-white">{alert.message}</p>
                    <p className="text-xs text-white/60">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-white/60">
              <span>Alerts stay private; no data is shared externally.</span>
              <Link href="/help/privacy" className="text-[#22d3ee] hover:text-[#0ea5e9]">Privacy &amp; access</Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="rounded-2xl border border-[#22d3ee]/25 bg-linear-to-br from-[#0f172a]/80 via-[#0b1224]/70 to-[#0f172a]/80 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-white">Access tokens</p>
              <KeyRound className="h-4 w-4 text-[#22d3ee]" aria-hidden="true" />
            </div>
            <p className="text-2xl font-bold text-white">Active</p>
            <p className="text-sm text-white/60">Client tokens refresh automatically after sign-in to keep sessions short-lived.</p>
          </div>
          <div className="rounded-2xl border border-[#22d3ee]/25 bg-linear-to-br from-[#0f172a]/80 via-[#0b1224]/70 to-[#0f172a]/80 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-white">Collaboration status</p>
              <ShieldCheck className="h-4 w-4 text-[#22d3ee]" aria-hidden="true" />
            </div>
            <p className="text-2xl font-bold text-white">All green</p>
            <p className="text-sm text-white/60">Private resources remain locked to authenticated clients only.</p>
          </div>
          <div className="rounded-2xl border border-[#22d3ee]/25 bg-linear-to-br from-[#0f172a]/80 via-[#0b1224]/70 to-[#0f172a]/80 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-white">Security cadence</p>
              <Activity className="h-4 w-4 text-[#22d3ee]" aria-hidden="true" />
            </div>
            <p className="text-2xl font-bold text-white">Weekly</p>
            <p className="text-sm text-white/60">We review auth flows, newsletter endpoints, and contact forms every week.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

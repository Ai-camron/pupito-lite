import nodemailer from 'nodemailer'

type EmailProvider = 'gmail' | 'outlook' | 'outlook-basic' | 'hostinger'

export type EmailEnvironment = {
  provider: EmailProvider
  user: string
  appPassword?: string
  password?: string
  host: string
  port: number
  secure: boolean
  notificationEmail: string
  hasEmailConfig: boolean
  missingEnvVars: string[]
}

export function getJwtSecret(env: NodeJS.ProcessEnv = process.env): string {
  const secret = env.JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required for authentication.')
  }

  return secret
}

export function resolveEmailEnv(env: NodeJS.ProcessEnv = process.env): EmailEnvironment {
  const provider = (env.EMAIL_PROVIDER || 'outlook') as EmailProvider
  const missingEnvVars: string[] = []

  if (!env.EMAIL_USER) {
    missingEnvVars.push('EMAIL_USER')
  }

  const needsAppPassword = provider === 'gmail'
  const password = env.EMAIL_PASSWORD
  const appPassword = env.EMAIL_APP_PASSWORD
  const hasPassword = needsAppPassword ? Boolean(appPassword) : Boolean(appPassword || password)

  if (!hasPassword) {
    missingEnvVars.push(needsAppPassword ? 'EMAIL_APP_PASSWORD' : 'EMAIL_APP_PASSWORD or EMAIL_PASSWORD')
  }

  if (provider === 'hostinger') {
    if (!env.EMAIL_HOST) missingEnvVars.push('EMAIL_HOST')
    if (!env.EMAIL_PORT) missingEnvVars.push('EMAIL_PORT')
  }

  const host = env.EMAIL_HOST || 'smtp.hostinger.com'
  const port = parseInt(env.EMAIL_PORT || '587', 10)
  const secure = env.EMAIL_SECURE === 'true'
  const notificationEmail = env.NOTIFICATION_EMAIL || env.EMAIL_USER || ''

  return {
    provider,
    user: env.EMAIL_USER || '',
    appPassword,
    password,
    host,
    port,
    secure,
    notificationEmail,
    hasEmailConfig: missingEnvVars.length === 0,
    missingEnvVars,
  }
}

export function createEmailTransporter(emailEnv: EmailEnvironment = resolveEmailEnv()) {
  if (!emailEnv.user) {
    throw new Error('EMAIL_USER environment variable is required to configure the email transporter.')
  }

  const basePassword = emailEnv.appPassword || emailEnv.password

  const emailConfigs: Record<EmailProvider, Parameters<typeof nodemailer.createTransport>[0]> = {
    gmail: {
      service: 'gmail',
      auth: {
        user: emailEnv.user,
        pass: emailEnv.appPassword,
      },
    },
    outlook: {
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: emailEnv.user,
        pass: basePassword,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
        starttls: true,
      },
      requireTLS: true,
      authMethod: 'PLAIN',
    },
    'outlook-basic': {
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: emailEnv.user,
        pass: basePassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
    hostinger: {
      host: emailEnv.host,
      port: emailEnv.port,
      secure: emailEnv.secure,
      auth: {
        user: emailEnv.user,
        pass: basePassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
  }

  const config = emailConfigs[emailEnv.provider]

  if (!config) {
    throw new Error(`Unsupported email provider: ${emailEnv.provider}`)
  }

  return nodemailer.createTransport(config)
}

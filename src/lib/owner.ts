import { OWNER_ACCESS } from './constants'

export const isOwnerEmail = (email?: string | null) => {
  if (!email) {
    return false
  }

  return OWNER_ACCESS.emails.some(
    (ownerEmail) => ownerEmail.toLowerCase() === email.toLowerCase()
  )
}

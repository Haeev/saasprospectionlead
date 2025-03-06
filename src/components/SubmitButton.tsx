'use client'

import { useFormStatus } from 'react-dom'
import { ReactNode } from 'react'

interface SubmitButtonProps {
  children: ReactNode
  className?: string
  pendingText?: string
  formAction?: string
}

export function SubmitButton({
  children,
  className,
  pendingText,
  formAction,
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      className={className}
      type="submit"
      formAction={formAction}
      disabled={pending}
    >
      {pending ? pendingText || 'Chargement...' : children}
    </button>
  )
} 
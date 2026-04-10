import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface StepInsideModalProps {
  open: boolean
  onClose: () => void
  onKeepExploring: () => void
}

export default function StepInsideModal({ open, onClose, onKeepExploring }: StepInsideModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  /* Lock body scroll + focus panel on open */
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  return createPortal(
    <div
      className="si-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="si-title"
    >
      <div className="si-panel" ref={panelRef} tabIndex={-1}>
        <button className="si-close" onClick={onClose} aria-label="Close modal">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <span className="si-eyebrow">HIDDEN LAYER</span>

        <h2 className="si-title" id="si-title">You found the hidden layer.</h2>

        <div className="si-body">
          <p>
            This portfolio was built with a second layer for people who pay attention.
            Hidden throughout the site are clickable client rewards: a 10% project perk,
            a deeper rotating 20% perk, and a Priority Project Slot.
          </p>
          <p>
            Some are easier to notice. Others are intentionally harder to find.
            Step Inside does not unlock them for you — it simply makes the hidden
            layer a little easier to read.
          </p>
        </div>

        <button className="si-cta" onClick={onKeepExploring}>
          Keep Exploring
        </button>
      </div>
    </div>,
    document.body
  )
}

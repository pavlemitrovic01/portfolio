import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { ReactNode, RefObject } from 'react'

interface StoryModalCard {
  year: string
  headline: string
  fullBody: string
  tags: readonly string[]
  icon: ReactNode
}

interface StoryModalProps {
  isOpen: boolean
  onClose: () => void
  card: StoryModalCard | null
  anchorSide: 'left' | 'right'
  triggerRef?: RefObject<HTMLButtonElement | null>
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function StoryModal({ isOpen, onClose, card, anchorSide, triggerRef }: StoryModalProps) {
  const reduceMotion = useReducedMotion() === true
  const modalRef = useRef<HTMLDivElement>(null)
  const savedFocusRef = useRef<HTMLElement | null>(null)

  // Save focused element on open; restore on close
  useEffect(() => {
    if (isOpen) {
      savedFocusRef.current = document.activeElement as HTMLElement
    } else {
      const target = triggerRef?.current ?? savedFocusRef.current
      // Delay so the exit animation doesn't fight focus
      requestAnimationFrame(() => target?.focus())
    }
  }, [isOpen, triggerRef])

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Focus first element + tab trap + escape
  useEffect(() => {
    if (!isOpen || !modalRef.current) return
    const modal = modalRef.current

    const getEls = () => Array.from(modal.querySelectorAll<HTMLElement>(FOCUSABLE))
    getEls()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return

      const els = getEls()
      if (!els.length) return
      const first = els[0]
      const last  = els[els.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus() }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Scrim: always opacity-only
  const scrimAnim = {
    initial:    { opacity: 0 },
    animate:    { opacity: 1 },
    exit:       { opacity: 0 },
    transition: { duration: 0.4 },
  }

  // On mobile the modal uses position:fixed + left/top:50%, so FM's transform must
  // include the centering offset; otherwise FM's inline style overrides the CSS transform.
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

  // Modal panel: full cinematic entry unless prefers-reduced-motion
  const modalAnim = reduceMotion
    ? {
        initial:    { opacity: 0 },
        animate:    { opacity: 1 },
        exit:       { opacity: 0 },
        transition: { duration: 0.2 },
      }
    : {
        initial:    { opacity: 0, scale: 0.94, y: 20, x: anchorSide === 'right' ? -20 : 20 },
        animate:    { opacity: 1, scale: 1,    y: 0,  x: 0 },
        exit:       { opacity: 0, scale: 0.96, y: 10 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
      }

  return createPortal(
    <AnimatePresence>
      {isOpen && card && (
        <motion.div
          className="story-modal-scrim"
          onClick={onClose}
          {...scrimAnim}
        >
          <motion.div
            className="story-modal"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="story-modal-title"
            onClick={e => e.stopPropagation()}
            transformTemplate={isMobile
              ? (_, generated) => `translate(-50%, -50%) ${generated}`
              : undefined
            }
            {...modalAnim}
          >
            <button
              className="story-modal-close"
              aria-label="Close"
              onClick={onClose}
            >
              ×
            </button>

            <div className="story-modal-year">{card.year}</div>
            <div className="story-modal-icon" aria-hidden="true">{card.icon}</div>

            <h2 id="story-modal-title" className="story-modal-headline">
              {card.headline}
            </h2>

            <p className="story-modal-body">{card.fullBody}</p>

            <div className="story-modal-tags">
              {card.tags.map(t => (
                <span key={t} className="story-modal-tag">{t}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

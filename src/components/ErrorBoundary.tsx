import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[cl3menza] Runtime error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <div className="error-fallback-inner">
            <div className="error-fallback-brand">
              <span className="error-fallback-dot" />
              <span>cl3menza</span>
            </div>
            <h2>Something broke.</h2>
            <p>An unexpected error occurred. This shouldn't happen — but when it does, refreshing usually fixes it.</p>
            <button onClick={() => window.location.reload()}>
              Reload page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

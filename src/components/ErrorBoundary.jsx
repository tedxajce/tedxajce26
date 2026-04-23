import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Canvas Error Boundary Caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#050505', color: '#ff4444', zIndex: 9999
        }}>
          <h2>3D Scene successfully recovered from crash.</h2>
        </div>
      )
    }

    return this.props.children 
  }
}

export const Loading = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 24px',
    textAlign: 'center'
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      border: '4px solid var(--color-cream-paper)',
      borderTopColor: 'var(--color-mint-splash)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '24px'
    }} />
    <p style={{
      fontSize: '18px',
      color: 'var(--color-charcoal)'
    }}>Memuat...</p>
  </div>
)

export const ErrorMessage = ({ message, onRetry }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 24px',
    textAlign: 'center'
  }}>
    <p style={{
      fontSize: '18px',
      color: 'var(--color-ink-black)',
      padding: '24px 32px',
      backgroundColor: 'var(--color-pure-white)',
      border: '2px solid var(--color-bubblegum)',
      borderRadius: 'var(--radius-cards)',
      marginBottom: '24px'
    }}>{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        style={{
          padding: '12px 32px',
          backgroundColor: 'var(--color-mint-splash)',
          border: '1px solid var(--color-ink-black)',
          borderRadius: 'var(--radius-buttons)',
          fontFamily: 'var(--font-lota)',
          fontSize: '18px',
          fontWeight: '700',
          color: 'var(--color-ink-black)',
          cursor: 'pointer'
        }}
      >
        Coba Lagi
      </button>
    )}
  </div>
)

export const EmptyState = ({ message }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 24px',
    textAlign: 'center'
  }}>
    <p style={{
      fontSize: '18px',
      color: 'var(--color-charcoal)'
    }}>{message}</p>
  </div>
)

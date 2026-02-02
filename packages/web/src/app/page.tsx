export default function Home() {
  return (
    <main style={{ padding: '24px' }}>
      <h1 style={{ 
          fontFamily: 'var(--md-sys-typescale-display-large-font)',
          fontSize: 'var(--md-sys-typescale-display-large-size)',
          color: 'var(--md-sys-color-primary)'
      }}>
        Welcome to Super Repo
      </h1>
      <div style={{
          backgroundColor: 'var(--md-sys-color-primary-container)',
          color: 'var(--md-sys-color-on-primary-container)',
          padding: '16px',
          borderRadius: '16px',
          display: 'inline-block'
      }}>
        Using Material Design 3 Tokens
      </div>
    </main>
  )
}

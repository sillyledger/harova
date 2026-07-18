export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="footer-col-title">Harova</div>
          <a href="/">Browse</a>
          <a href="/">Categories</a>
          <a href="/submit">Submit a tool</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Company</div>
          <a href="/about">About</a>
          <a href="/creator">Creator</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/affiliate-disclosure">Affiliate disclosure</a>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Ryoka projects</div>
          {/* TODO: real URL */}
          <a href="#" target="_blank" rel="noopener noreferrer">
            TWO Docs
          </a>
          {/* TODO: real URL */}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Sorano
          </a>
          {/* TODO: real URL */}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Aegos Intel
          </a>
          {/* TODO: real URL */}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Kira
          </a>
          {/* TODO: real URL */}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Kiroka
          </a>
          <a
            href="https://ryoka.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ryoka.xyz
          </a>
        </div>
      </div>
      <span>Harova — a Ryoka project</span>
    </footer>
  )
}

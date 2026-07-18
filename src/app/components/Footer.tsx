export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="footer-col-title">Harova</div>
          <a href="/">Browse</a>
          <a href="/categories">Categories</a>
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
          <div className="footer-col-title">Built by Ryoka</div>
          <a href="https://www.two.so" target="_blank" rel="noopener noreferrer">
            TWO Docs
          </a>
          <a href="https://www.kiroka.xyz" target="_blank" rel="noopener noreferrer">
            Kiroka Free Subscription Tracker
          </a>
          <a href="https://www.liyo.dev" target="_blank" rel="noopener noreferrer">
            Liyo Developer Shelf
          </a>
          <a href="https://www.sorano.space" target="_blank" rel="noopener noreferrer">
            Sorano Public Roadmap
          </a>
          <a href="https://www.indiehacker.blog" target="_blank" rel="noopener noreferrer">
            Indie Hacker Blog
          </a>
        </div>
      </div>
      <span>Harova — a Ryoka project</span>
    </footer>
  )
}

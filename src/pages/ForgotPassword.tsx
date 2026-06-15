import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import { authService } from '../services/authService'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!email.trim()) { setError('Vui lòng nhập email'); return }
    setLoading(true); setError('')
    try {
      await authService.forgotPassword(email.trim())
      setSent(true)
    } catch {
      setError('Có lỗi xảy ra, vui lòng thử lại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f5f8', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", padding: 20 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: 40, width: '100%', maxWidth: 420, boxShadow: '0 24px 60px rgba(20,23,40,.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 32 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#3b82f6,#2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-.4px', color: '#13152b' }}>TaskFlow</span>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
            <h2 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, color: '#13152b' }}>Kiểm tra email của bạn</h2>
            <p style={{ color: '#6b7089', fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>
              Chúng tôi đã gửi link đặt lại mật khẩu đến <strong>{email}</strong>. Link có hiệu lực trong 15 phút.
            </p>
            <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#2563eb', fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>
              <ArrowLeft size={16} /> Quay lại đăng nhập
            </Link>
          </div>
        ) : (
          <>
            <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#13152b' }}>Quên mật khẩu?</h2>
            <p style={{ margin: '0 0 28px', fontSize: 14, color: '#8a8fa3', fontWeight: 500, lineHeight: 1.6 }}>
              Nhập email của bạn và chúng tôi sẽ gửi link để đặt lại mật khẩu.
            </p>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13.5, fontWeight: 700, color: '#13152b', marginBottom: 7 }}>Email</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', background: '#f9f9fb', border: '1.5px solid #e8eaf0', borderRadius: 11 }}>
                <Mail size={16} color="#9499ad" />
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="you@example.com"
                  style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', padding: '13px 0', fontFamily: 'inherit', fontSize: 14, color: '#13152b' }} />
              </div>
            </div>

            {error && (
              <div style={{ fontSize: 13, color: '#dc2626', fontWeight: 600, marginBottom: 16, padding: '10px 14px', background: '#fde8e8', borderRadius: 10 }}>
                {error}
              </div>
            )}

            <button onClick={handleSubmit} disabled={loading}
              style={{ width: '100%', padding: 14, borderRadius: 11, background: 'linear-gradient(135deg,#3b82f6,#2563eb)', color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 8px 22px rgba(37,99,235,.38)', opacity: loading ? 0.7 : 1, marginBottom: 20 }}>
              {loading ? 'Đang gửi...' : 'Gửi link đặt lại mật khẩu'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#8a8fa3', fontWeight: 600, textDecoration: 'none', fontSize: 13.5 }}>
                <ArrowLeft size={15} /> Quay lại đăng nhập
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

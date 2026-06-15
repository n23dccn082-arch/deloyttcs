import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { authService } from '../services/authService'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!token) setError('Token không hợp lệ')
  }, [token])

  async function handleSubmit() {
    if (!password || password.length < 6) { setError('Mật khẩu phải có ít nhất 6 ký tự'); return }
    if (password !== confirm) { setError('Mật khẩu xác nhận không khớp'); return }
    setLoading(true); setError('')
    try {
      await authService.resetPassword(token, password)
      setDone(true)
      setTimeout(() => navigate('/login'), 2500)
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Token không hợp lệ hoặc đã hết hạn')
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

        {done ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h2 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, color: '#13152b' }}>Đặt lại thành công!</h2>
            <p style={{ color: '#6b7089', fontSize: 14 }}>Đang chuyển về trang đăng nhập...</p>
          </div>
        ) : (
          <>
            <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#13152b' }}>Đặt lại mật khẩu</h2>
            <p style={{ margin: '0 0 28px', fontSize: 14, color: '#8a8fa3', fontWeight: 500 }}>Nhập mật khẩu mới cho tài khoản của bạn.</p>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 13.5, fontWeight: 700, color: '#13152b', marginBottom: 7 }}>Mật khẩu mới</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', background: '#f9f9fb', border: '1.5px solid #e8eaf0', borderRadius: 11 }}>
                <Lock size={16} color="#9499ad" />
                <input type={showPw ? 'text' : 'password'} value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="Tối thiểu 6 ký tự"
                  style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', padding: '13px 0', fontFamily: 'inherit', fontSize: 14, color: '#13152b' }} />
                <button onClick={() => setShowPw(!showPw)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                  {showPw ? <EyeOff size={16} color="#9499ad" /> : <Eye size={16} color="#9499ad" />}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13.5, fontWeight: 700, color: '#13152b', marginBottom: 7 }}>Xác nhận mật khẩu</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', background: '#f9f9fb', border: '1.5px solid #e8eaf0', borderRadius: 11 }}>
                <Lock size={16} color="#9499ad" />
                <input type="password" value={confirm}
                  onChange={e => { setConfirm(e.target.value); setError('') }}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="Nhập lại mật khẩu"
                  style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', padding: '13px 0', fontFamily: 'inherit', fontSize: 14, color: '#13152b' }} />
              </div>
            </div>

            {error && (
              <div style={{ fontSize: 13, color: '#dc2626', fontWeight: 600, marginBottom: 16, padding: '10px 14px', background: '#fde8e8', borderRadius: 10 }}>
                {error}
              </div>
            )}

            <button onClick={handleSubmit} disabled={loading || !token}
              style={{ width: '100%', padding: 14, borderRadius: 11, background: 'linear-gradient(135deg,#3b82f6,#2563eb)', color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 8px 22px rgba(37,99,235,.38)', opacity: loading ? 0.7 : 1, marginBottom: 20 }}>
              {loading ? 'Đang cập nhật...' : 'Đặt lại mật khẩu'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <Link to="/login" style={{ color: '#8a8fa3', fontWeight: 600, textDecoration: 'none', fontSize: 13.5 }}>
                Quay lại đăng nhập
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

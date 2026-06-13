import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'
import { authService } from '../services/authService'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleLogin() {
    if (!email.trim() || !password) { setError('Vui lòng nhập email và mật khẩu'); return }
    setLoading(true); setError('')
    try {
      const res = await authService.login(email.trim(), password)
      login(res.token, res.user)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Email hoặc mật khẩu không đúng')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* LEFT: Brand panel */}
      <div style={{ flex: 1.05, position: 'relative', overflow: 'hidden', background: 'linear-gradient(150deg,#1e2150 0%,#2b3aa0 45%,#3b82f6 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px 52px', color: '#fff' }}>
        <div style={{ position: 'absolute', top: -90, right: -70, width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, rgba(139,92,246,.55), transparent 70%)', animation: 'float1 9s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: -120, left: -80, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, rgba(56,189,248,.45), transparent 70%)', animation: 'float2 11s ease-in-out infinite' }} />
        <style>{`@keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(18px,-22px)}}@keyframes float2{0%,100%{transform:translate(0,0)}50%{transform:translate(-20px,16px)}}`}</style>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(255,255,255,.16)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,.25)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-.4px' }}>TaskFlow</span>
        </div>

        <div style={{ position: 'relative', maxWidth: 440 }}>
          <h1 style={{ margin: '0 0 18px', fontSize: 42, lineHeight: 1.12, fontWeight: 800, letterSpacing: '-1.4px' }}>
            Mọi task, mọi sprint — gọn trong một nơi.
          </h1>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,.82)', fontWeight: 500 }}>
            Theo dõi tiến độ, phân chia công việc và về đích đúng hạn cùng cả nhóm — trực quan với bảng Kanban và biểu đồ burndown.
          </p>
        </div>

        <div style={{ position: 'relative', fontSize: 13.5, fontWeight: 600, color: 'rgba(255,255,255,.82)' }}>
          Hệ thống Quản lý Yêu cầu &amp; Tiến Độ
        </div>
      </div>

      {/* RIGHT: Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 36 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#3b82f6,#2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(59,130,246,.4)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-.4px', color: '#13152b' }}>TaskFlow</span>
          </div>

          <h2 style={{ margin: '0 0 6px', fontSize: 26, fontWeight: 800, letterSpacing: '-.6px', color: '#13152b' }}>Chào mừng trở lại 👋</h2>
          <p style={{ margin: '0 0 28px', fontSize: 14.5, color: '#8a8fa3', fontWeight: 500 }}>Đăng nhập để tiếp tục với TaskFlow</p>

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13.5, fontWeight: 700, color: '#13152b', marginBottom: 7 }}>Email</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', background: '#f9f9fb', border: '1.5px solid #e8eaf0', borderRadius: 11 }}>
              <Mail size={16} color="#9499ad" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', padding: '13px 0', fontFamily: 'inherit', fontSize: 14, color: '#13152b' }} />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13.5, fontWeight: 700, color: '#13152b', marginBottom: 7 }}>Mật khẩu</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', background: '#f9f9fb', border: '1.5px solid #e8eaf0', borderRadius: 11 }}>
              <Lock size={16} color="#9499ad" />
              <input type={showPassword ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="••••••••"
                style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', padding: '13px 0', fontFamily: 'inherit', fontSize: 14, color: '#13152b' }} />
              <button onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                {showPassword ? <EyeOff size={16} color="#9499ad" /> : <Eye size={16} color="#9499ad" />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ fontSize: 13, color: '#dc2626', fontWeight: 600, marginBottom: 16, padding: '10px 14px', background: '#fde8e8', borderRadius: 10, border: '1px solid #fecaca' }}>
              {error}
            </div>
          )}

          <button onClick={handleLogin} disabled={loading}
            style={{ width: '100%', padding: '14px', borderRadius: 11, background: 'linear-gradient(135deg,#3b82f6,#2563eb)', color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 8px 22px rgba(37,99,235,.38)', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Đang đăng nhập...' : <><span>Đăng nhập</span><ArrowRight size={18} /></>}
          </button>

          <p style={{ textAlign: 'center', fontSize: 13.5, color: '#8a8fa3', fontWeight: 500, marginTop: 22 }}>
            Chưa có tài khoản?{' '}
            <Link to="/register" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

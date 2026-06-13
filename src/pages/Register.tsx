import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, Mail, Lock, User } from 'lucide-react'
import { authService } from '../services/authService'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleRegister() {
    if (!username.trim() || !email.trim() || !password) {
      setError('Vui lòng điền đầy đủ thông tin'); return
    }
    if (password.length < 6) { setError('Mật khẩu tối thiểu 6 ký tự'); return }
    setLoading(true); setError('')
    try {
      const res = await authService.register(username.trim(), email.trim(), password)
      login(res.token, res.user)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Đăng ký thất bại, thử lại sau')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { label: 'Tên người dùng', icon: User, value: username, setter: setUsername, placeholder: 'nguyenvan', type: 'text' },
    { label: 'Email', icon: Mail, value: email, setter: setEmail, placeholder: 'you@example.com', type: 'email' },
    { label: 'Mật khẩu', icon: Lock, value: password, setter: setPassword, placeholder: '••••••••', type: 'password' },
  ] as const

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f5f8', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '40px', width: '100%', maxWidth: 420, boxShadow: '0 4px 24px rgba(20,23,40,.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#3b82f6,#2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#13152b' }}>TaskFlow</span>
        </div>

        <h2 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 800, color: '#13152b' }}>Tạo tài khoản</h2>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: '#8a8fa3' }}>Bắt đầu quản lý dự án cùng nhóm</p>

        {fields.map(field => (
          <div key={field.label} style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#13152b', marginBottom: 6 }}>{field.label}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', background: '#f9f9fb', border: '1.5px solid #e8eaf0', borderRadius: 11 }}>
              <field.icon size={15} color="#9499ad" />
              <input
                type={field.type}
                value={field.value}
                onChange={e => (field.setter as any)(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRegister()}
                placeholder={field.placeholder}
                style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', padding: '12px 0', fontFamily: 'inherit', fontSize: 14, color: '#13152b' }}
              />
            </div>
          </div>
        ))}

        {error && (
          <div style={{ fontSize: 13, color: '#dc2626', fontWeight: 600, marginBottom: 14, padding: '10px 14px', background: '#fde8e8', borderRadius: 10, border: '1px solid #fecaca' }}>
            {error}
          </div>
        )}

        <button onClick={handleRegister} disabled={loading}
          style={{ width: '100%', padding: '13px', borderRadius: 11, background: 'linear-gradient(135deg,#3b82f6,#2563eb)', color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1, boxShadow: '0 8px 22px rgba(37,99,235,.38)', marginTop: 6 }}>
          {loading ? 'Đang tạo tài khoản...' : <><span>Đăng ký</span><ArrowRight size={17} /></>}
        </button>

        <p style={{ textAlign: 'center', fontSize: 13.5, color: '#8a8fa3', marginTop: 20 }}>
          Đã có tài khoản?{' '}
          <Link to="/login" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>Đăng nhập</Link>
        </p>
      </div>
    </div>
  )
}

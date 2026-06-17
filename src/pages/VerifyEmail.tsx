import { useEffect, useRef, useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { useAuth } from '../context/AuthContext'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [errorMsg, setErrorMsg] = useState('')
  const startedRef = useRef(false)

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) { setStatus('error'); setErrorMsg('Link không hợp lệ'); return }
    if (startedRef.current) return
    startedRef.current = true

    authService.verifyEmail(token)
      .then(res => {
        login(res.token, res.user)
        setStatus('success')
        setTimeout(() => navigate('/dashboard'), 2500)
      })
      .catch(err => {
        const existingToken = localStorage.getItem('token')
        if (existingToken) {
          navigate('/dashboard', { replace: true })
          return
        }
        setStatus('error')
        setErrorMsg(err.response?.data?.message ?? 'Link xác nhận không hợp lệ hoặc đã hết hạn')
      })
  }, [login, navigate, searchParams])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f5f8', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '40px', width: '100%', maxWidth: 420, boxShadow: '0 4px 24px rgba(20,23,40,.08)', textAlign: 'center' }}>
        {status === 'loading' && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 800, color: '#13152b' }}>Đang xác nhận email...</h2>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, color: '#13152b' }}>Email đã được xác nhận!</h2>
            <p style={{ margin: '0 0 4px', fontSize: 14, color: '#8a8fa3' }}>Tài khoản của bạn đã được kích hoạt.</p>
            <p style={{ margin: 0, fontSize: 13, color: '#b0b4c4' }}>Đang chuyển hướng về Dashboard...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ fontSize: 52, marginBottom: 16 }}>❌</div>
            <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, color: '#13152b' }}>Xác nhận thất bại</h2>
            <p style={{ margin: '0 0 24px', fontSize: 14, color: '#8a8fa3' }}>{errorMsg}</p>
            <Link to="/register" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>
              Đăng ký lại
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

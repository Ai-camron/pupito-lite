'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { isOwnerEmail } from '@/lib/owner'

interface LoginForm {
  email: string
  password: string
  firstName: string
  lastName: string
  rememberMe: boolean
}

interface LoginErrors {
  email?: string
  password?: string
  general?: string
}

export default function LoginPage() {
  const router = useRouter()
  const { login, signup } = useAuth()
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState<LoginErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      if (isSignUp) {
        // Sign up with all form data
        await signup(formData.email, formData.password, formData.firstName, formData.lastName)
      } else {
        // Login with email and password
        await login(formData.email, formData.password)
      }
      
      // Success - redirect to account page or return to previous page
      const redirectOverride = new URLSearchParams(window.location.search).get('redirect')
      const defaultRedirect = isOwnerEmail(formData.email) ? '/owner-dashboard' : '/account'
      const redirectTo = redirectOverride || defaultRedirect
      router.push(redirectTo)
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : 'Authentication failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof LoginForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear errors when user starts typing
    if (errors[field as keyof LoginErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center px-4 py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#22d3ee]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#1E90FF]/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl animate-pulse [animation-delay:4s]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Login Card */}
        <div className="relative bg-linear-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] border-2 border-[#22d3ee] rounded-3xl p-8 overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.2)]">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-linear-to-br from-[#22d3ee]/20 to-[#0ea5e9]/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-br from-[#00FFFF]/15 to-[#1E90FF]/10 rounded-full blur-xl animate-pulse [animation-delay:1s]" />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8 relative z-10"
          >
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-linear-to-br from-[#22d3ee] to-[#0ea5e9] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.45)]">
                <span className="text-black font-bold text-2xl">P</span>
              </div>
            </div>

            <h1 className="text-3xl font-black bg-linear-to-r from-[#22d3ee] via-[#FFD700] to-[#00FFFF] bg-clip-text text-transparent mb-2">
              {isSignUp ? 'JOIN PUPITO' : 'WELCOME BACK'}
            </h1>
            <p className="text-gray-300">
              {isSignUp 
                ? 'Create your account and join the anime streetwear revolution' 
                : 'Sign in to your account and continue your style journey'
              }
            </p>
          </motion.div>

          {/* Quick Access Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-linear-to-r from-[#1A1A1A]/80 to-[#2A2A2A]/80 rounded-2xl border border-[#22d3ee]/20 p-4 mb-6 backdrop-blur relative z-10"
          >
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
              <span>Secure account with encrypted data protection</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300 mt-2">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
              <span>Access your orders, wishlist, and exclusive content</span>
            </div>
          </motion.div>

          {/* Error Message */}
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-6 flex items-center gap-2 relative z-10"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-red-400 text-sm">{errors.general}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6 relative z-10"
          >
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 pl-10 bg-[#0D0D0D]/80 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22d3ee] transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-600 hover:border-[#22d3ee]/50'
                  }`}
                  placeholder="Enter your email"
                  aria-label="Email Address"
                  disabled={isLoading}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                <Lock className="w-4 h-4 inline mr-1" />
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full px-4 py-3 pl-10 pr-10 bg-[#0D0D0D]/80 border rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22d3ee] transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-600 hover:border-[#22d3ee]/50'
                  }`}
                  placeholder="Enter your password"
                  aria-label="Password"
                  disabled={isLoading}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label htmlFor="remember-me" className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  className="w-4 h-4 text-[#22d3ee] bg-[#0D0D0D] border-gray-600 rounded focus:ring-[#22d3ee] focus:ring-2"
                  disabled={isLoading}
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-[#22d3ee] hover:text-[#0ea5e9] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-[#22d3ee] to-[#0ea5e9] hover:from-[#1E90FF] hover:to-[#00FFFF] text-white hover:text-black font-bold py-3 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:shadow-[0_0_30px_rgba(30,144,255,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.form>

          {/* Toggle Sign Up / Sign In */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 relative z-10"
          >
            <p className="text-gray-300 text-sm">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setErrors({})
                  setFormData({ email: '', password: '', firstName: '', lastName: '', rememberMe: false })
                }}
                className="text-[#22d3ee] hover:text-[#0ea5e9] transition-colors ml-1 font-medium"
                disabled={isLoading}
              >
                {isSignUp ? 'Sign in here' : 'Create account'}
              </button>
            </p>
          </motion.div>

          {/* Social Login Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 relative z-10"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1A1A1A] text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-3 px-4 rounded-2xl shadow-sm bg-[#0D0D0D] text-sm font-medium text-gray-300 border border-gray-600 hover:border-[#22d3ee]/50 hover:bg-[#1A1A1A] transition-all"
                disabled={isLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-3 px-4 rounded-2xl shadow-sm bg-[#0D0D0D] text-sm font-medium text-gray-300 border border-gray-600 hover:border-[#22d3ee]/50 hover:bg-[#1A1A1A] transition-all"
                disabled={isLoading}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </motion.div>

          {/* Back to Shop Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center mt-6 relative z-10"
          >
            <Link
              href="/products"
              className="text-gray-400 hover:text-[#22d3ee] transition-colors text-sm flex items-center justify-center gap-1"
            >
              ← Back to Shop
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

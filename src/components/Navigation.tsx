'use client'

import React, { useId, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ShoppingCart,
  Search,
  Menu,
  User,
  X,
  Home,
  Package,
  HelpCircle,
  LogIn,
  LogOut,
  ShieldCheck
} from 'lucide-react'
import styles from './Navigation.module.css'
import { useAuth } from '@/lib/auth-context'

interface NavigationProps {
  currentPath?: string
  cartCount?: number
}

const NAV_LINKS = [
  { label: "Shop", href: "/shop", icon: Package },
  { label: "About", href: "/about", icon: HelpCircle },
  { label: "Help", href: "/help/contact", icon: HelpCircle },
  { label: "Account", href: "/account", icon: User },
]

export default function Navigation({ currentPath = '', cartCount = 0 }: NavigationProps) {
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const generatedId = useId()
  const mobileMenuId = useMemo(
    () => `mobile-menu-${generatedId.replace(/[^a-zA-Z0-9_-]/g, '')}`,
    [generatedId]
  )
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = async () => {
    await logout()
    setIsMobileMenuOpen(false)
  }

  const isActivePath = (path: string) => {
    if (path === '/' && currentPath === '/') return true
    if (path !== '/' && currentPath.startsWith(path)) return true
    return false
  }

  return (
    <>
      {/* PROMO BAR */}
      <div className={styles.promoBar}>
        ✨ Free shipping on all orders over $50 + 10% off your first order w/ code: FIRSTPUP
      </div>

      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          {/* Logo */}
          <Link href="/" className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <Image
                src="/images/logo-mark-light.svg"
                alt="Pupito logo mark"
                width={40}
                height={40}
                priority
              />
            </div>
            <span className={styles.brandName}>PUPITO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} role="navigation" aria-label="Main navigation">
            <Link
              href="/"
              className={`${styles.navLink} ${
                isActivePath('/') 
                  ? styles.navLinkActive 
                  : styles.navLinkInactive
              }`}
              aria-current={isActivePath('/') ? 'page' : undefined}
            >
              <Home className={styles.navIcon} />
              Home
            </Link>
            {[
              ...NAV_LINKS,
              ...(user ? [{ label: 'Client Dashboard', href: '/client-dashboard', icon: ShieldCheck }] : [])
            ].map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`${styles.navLink} ${
                    isActivePath(link.href) 
                      ? styles.navLinkActive 
                      : styles.navLinkInactive
                  }`}
                  aria-current={isActivePath(link.href) ? 'page' : undefined}
                >
                  <Icon className={styles.navIcon} />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Actions */}
          <div className={styles.actionsContainer}>
            <Link
              href="/shop"
              className={styles.actionButton}
              aria-label="Browse the Pupito shop"
            >
              <Search className={styles.actionIcon} />
            </Link>
            
            <div className={styles.cartContainer}>
              <Link 
                href="/cart"
                className={styles.actionButton}
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <ShoppingCart className={styles.actionIcon} />
              </Link>
              {cartCount > 0 && (
                <span 
                  className={styles.cartBadge}
                  aria-label={`${cartCount} items in cart`}
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </div>

            {/* Auth Actions */}
            {user ? (
              <>
                <Link 
                  href="/account"
                  className={styles.actionButton}
                  aria-label="My Account"
                >
                  <User className={styles.actionIcon} />
                </Link>
                <button 
                  onClick={handleLogout}
                  className={styles.actionButton}
                  aria-label="Sign Out"
                >
                  <LogOut className={styles.actionIcon} />
                </button>
              </>
            ) : (
              <Link 
                href="/login"
                className={styles.actionButton}
                aria-label="Sign In"
              >
                <LogIn className={styles.actionIcon} />
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMobileMenu}
              className={styles.mobileMenuToggle}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls={mobileMenuId}
            >
              {isMobileMenuOpen ? (
                <X className={styles.actionIcon} />
              ) : (
                <Menu className={styles.actionIcon} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          id={mobileMenuId}
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
          className={styles.mobileMenu}
        >
          <nav className={styles.mobileNavContainer} role="navigation" aria-label="Mobile navigation">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${styles.mobileNavLink} ${
                isActivePath('/') 
                  ? styles.mobileNavLinkActive 
                  : styles.mobileNavLinkInactive
              }`}
              aria-current={isActivePath('/') ? 'page' : undefined}
            >
              <Home className={styles.mobileNavIcon} />
              Home
            </Link>
            {[...NAV_LINKS, ...(user ? [{ label: 'Client Dashboard', href: '/client-dashboard', icon: ShieldCheck }] : [])].map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${styles.mobileNavLink} ${
                    isActivePath(link.href) 
                      ? styles.mobileNavLinkActive 
                      : styles.mobileNavLinkInactive
                  }`}
                  aria-current={isActivePath(link.href) ? 'page' : undefined}
                >
                  <Icon className={styles.mobileNavIcon} />
                  {link.label}
                </Link>
              )
            })}
            
            {/* Mobile Auth Actions */}
            {user ? (
              <button 
                onClick={handleLogout}
                className={`${styles.mobileNavLink} ${styles.mobileNavLinkInactive}`}
              >
                <LogOut className={styles.mobileNavIcon} />
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`${styles.mobileNavLink} ${styles.mobileNavLinkInactive}`}
              >
                <LogIn className={styles.mobileNavIcon} />
                Sign In
              </Link>
            )}
          </nav>
        </motion.div>
      </header>
    </>
  )
}

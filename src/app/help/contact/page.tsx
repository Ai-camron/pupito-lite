"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MessageCircle, Clock, Send, Instagram, Youtube, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Chatbot from "@/components/Chatbot";
import { SUPPORT_EMAIL } from "@/lib/site-info";
import SeoShortcodeCallout from "@/components/SeoShortcodeCallout";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('Contact form error:', error);
      alert(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-[Lato]">
      {/* Header */}
      <div className="bg-linear-to-r from-[#1A1A1A] via-[#0D0D0D] to-[#1A1A1A] border-b border-[#FF69B4]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[#FF69B4] hover:text-[#FFD700] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-black mb-4 bg-linear-to-r from-[#FF69B4] via-[#FFD700] to-[#00FFFF] bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Need help? Questions? Just want to chat about anime? We&apos;re here for you!
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center p-8 bg-linear-to-br from-[#FF69B4]/10 to-[#FF1493]/5 border border-[#FF69B4]/20 rounded-2xl"
          >
            <div className="p-4 bg-linear-to-br from-[#FF69B4] to-[#FF1493] rounded-2xl w-fit mx-auto mb-4">
              <Mail className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold text-[#FF69B4] mb-2">Email Support</h3>
            <p className="text-gray-400 mb-4">Get help via email</p>
            <div className="space-y-2">
              <p className="text-sm text-white font-semibold">{SUPPORT_EMAIL}</p>
              <p className="text-xs text-gray-500">Response within 4 hours</p>
              <p className="text-xs text-gray-500">Online-only brand fulfilled by Printful—no phone line or physical shop.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setIsChatbotOpen(true)}
            className="text-center p-8 bg-linear-to-br from-[#1E90FF]/10 to-[#00FFFF]/5 border border-[#00FFFF]/20 rounded-2xl cursor-pointer hover:bg-[#1E90FF]/20 transition-colors"
          >
            <div className="p-4 bg-linear-to-br from-[#1E90FF] to-[#00FFFF] rounded-2xl w-fit mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold text-[#00FFFF] mb-2">Live Chat</h3>
            <p className="text-gray-400 mb-4">Chat with PupiBot</p>
            <div className="space-y-2">
              <p className="text-sm text-white font-semibold">Available 24/7</p>
              <p className="text-xs text-gray-500">Instant AI responses</p>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-linear-to-br from-[#1A1A1A]/80 to-[#2A2A2A]/60 border border-[#FF69B4]/20 rounded-2xl p-8 backdrop-blur"
          >
            <div className="flex items-center gap-3 mb-6">
              <Send className="w-6 h-6 text-[#FF69B4]" />
              <h2 className="text-2xl font-bold bg-linear-to-r from-[#FF69B4] to-[#FFD700] bg-clip-text text-transparent">
                Send us a Message
              </h2>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-linear-to-br from-[#32CD32] to-[#00FF00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-[#32CD32] mb-2">Message Sent! 🎉</h3>
                <p className="text-gray-400 mb-4">Thanks for reaching out! We&apos;ll get back to you within 4 hours.</p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="bg-linear-to-r from-[#FF69B4] to-[#FF1493] hover:from-[#1E90FF] hover:to-[#00FFFF] text-black hover:text-white font-semibold rounded-xl"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#FF69B4] mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1A1A1A]/80 border border-[#FF69B4]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF69B4] focus:border-[#FF1493] transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#FF69B4] mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#1A1A1A]/80 border border-[#FF69B4]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF69B4] focus:border-[#FF1493] transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#FF69B4] mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    title="Select a topic for your message"
                    className="w-full px-4 py-3 bg-[#1A1A1A]/80 border border-[#FF69B4]/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF69B4] focus:border-[#FF1493] transition-all duration-300"
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order Support</option>
                    <option value="sizing">Sizing Help</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="product">Product Questions</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#FF69B4] mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[#1A1A1A]/80 border border-[#FF69B4]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF69B4] focus:border-[#FF1493] transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-linear-to-r from-[#FF69B4] to-[#FF1493] hover:from-[#1E90FF] hover:to-[#00FFFF] text-black hover:text-white font-semibold py-3 rounded-xl shadow-[0_0_20px_rgba(255,105,180,0.4)] hover:shadow-[0_0_25px_rgba(30,144,255,0.5)] transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Company Info & FAQ Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Company Info */}
            <div className="bg-linear-to-br from-[#1A1A1A]/80 to-[#2A2A2A]/60 border border-[#00FFFF]/20 rounded-2xl p-8 backdrop-blur">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-[#00FFFF]" />
                <h2 className="text-2xl font-bold text-[#00FFFF]">Connect with PUPITO</h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-semibold text-white mb-2">Support Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM PST<br />Saturday - Sunday: 10:00 AM - 4:00 PM PST</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Follow the Squad</h3>
                  <div className="flex gap-4 mt-3">
                    <div className="p-3 bg-[#FF69B4]/20 border border-[#FF69B4]/30 rounded-lg hover:bg-[#FF69B4]/30 transition-colors cursor-pointer">
                      <Instagram className="w-5 h-5 text-[#FF69B4]" />
                    </div>
                    <div className="p-3 bg-[#1E90FF]/20 border border-[#1E90FF]/30 rounded-lg hover:bg-[#1E90FF]/30 transition-colors cursor-pointer">
                      <Twitter className="w-5 h-5 text-[#1E90FF]" />
                    </div>
                    <div className="p-3 bg-[#FFD700]/20 border border-[#FFD700]/30 rounded-lg hover:bg-[#FFD700]/30 transition-colors cursor-pointer">
                      <Youtube className="w-5 h-5 text-[#FFD700]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Help */}
            <div className="bg-linear-to-br from-[#1A1A1A]/80 to-[#2A2A2A]/60 border border-[#FFD700]/20 rounded-2xl p-8 backdrop-blur">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-[#FFD700]" />
                <h2 className="text-2xl font-bold text-[#FFD700]">Quick Help</h2>
              </div>
              <p className="text-gray-400 mb-6">Looking for instant answers? Check out our help resources:</p>
              <div className="space-y-3">
                <Link
                  href="/help/faq"
                  className="block p-4 bg-[#FF69B4]/10 border border-[#FF69B4]/20 rounded-xl hover:bg-[#FF69B4]/20 transition-colors group"
                >
                  <h3 className="font-semibold text-[#FF69B4] group-hover:text-white transition-colors">FAQ</h3>
                  <p className="text-sm text-gray-500">Common questions and answers</p>
                </Link>
                <Link
                  href="/help/shipping"
                  className="block p-4 bg-[#00FFFF]/10 border border-[#00FFFF]/20 rounded-xl hover:bg-[#00FFFF]/20 transition-colors group"
                >
                  <h3 className="font-semibold text-[#00FFFF] group-hover:text-white transition-colors">Shipping & Returns</h3>
                  <p className="text-sm text-gray-500">Delivery and return policies</p>
                </Link>
                <Link
                  href="/help/size-guide"
                  className="block p-4 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-xl hover:bg-[#FFD700]/20 transition-colors group"
                >
                  <h3 className="font-semibold text-[#FFD700] group-hover:text-white transition-colors">Size Guide</h3>
                  <p className="text-sm text-gray-500">Find your perfect fit</p>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        <SeoShortcodeCallout context="customer support and contact form submissions" />
      </div>

      {/* Chatbot */}
      <Chatbot
        isOpen={isChatbotOpen} 
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)} 
      />
    </div>
  );
}
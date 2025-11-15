"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignupPopupProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const SignupPopup: React.FC<SignupPopupProps> = ({
  isOpen,
  onClose,
  email,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.3 
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative bg-linear-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] border-2 border-[#FF69B4] rounded-3xl p-6 sm:p-8 max-w-md w-full mx-4 overflow-hidden">
              
              {/* Animated background elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-linear-to-br from-[#FF69B4]/20 to-[#FF1493]/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-br from-[#00FFFF]/15 to-[#1E90FF]/10 rounded-full blur-xl animate-pulse [animation-delay:1s]" />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full border border-[#FF69B4]/30 bg-[#1A1A1A]/80 hover:bg-[#FF69B4]/20 transition-all duration-300 group z-10"
                aria-label="Close popup"
              >
                <X className="w-4 h-4 text-[#FF69B4] group-hover:text-white transition-colors" />
              </button>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Success Animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 20 }}
                  className="flex justify-center mb-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 bg-linear-to-br from-[#FF69B4] to-[#FF1493] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,105,180,0.5)]">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    {/* Floating icons */}
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        y: [-5, 5, -5]
                      }}
                      transition={{ 
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center"
                    >
                      <Heart className="w-3 h-3 text-black" />
                    </motion.div>
                    <motion.div
                      animate={{ 
                        rotate: -360,
                        x: [-3, 3, -3]
                      }}
                      transition={{ 
                        rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                        x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute -bottom-1 -left-3 w-5 h-5 bg-[#00FFFF] rounded-full flex items-center justify-center"
                    >
                      <Zap className="w-2 h-2 text-black" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-2xl sm:text-3xl font-black bg-linear-to-r from-[#FF69B4] via-[#FFD700] to-[#00FFFF] bg-clip-text text-transparent mb-2">
                    WELCOME TO THE PUP SQUAD! 🎉
                  </h2>
                  
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    <span className="text-[#FF69B4] font-semibold">{email}</span> just joined the ultimate anime streetwear community!
                  </p>

                  {/* Squad Status */}
                  <div className="bg-linear-to-r from-[#1A1A1A]/80 to-[#2A2A2A]/80 rounded-2xl border border-[#FF69B4]/20 p-4 mb-6 backdrop-blur">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#00FFFF] mb-1">∞</div>
                      <div className="text-sm text-gray-400">Epic Drops Awaiting</div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="text-left space-y-2 mb-6">
                    <div className="flex items-center gap-3 text-xs">
                      <div className="w-2 h-2 bg-[#32CD32] rounded-full animate-pulse" />
                      <span className="text-gray-300">Exclusive early access to limited drops</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="w-2 h-2 bg-[#FF69B4] rounded-full animate-pulse" />
                      <span className="text-gray-300">Secret discount codes & flash sales</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse" />
                      <span className="text-gray-300">Behind-the-scenes anime design stories</span>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <Button
                    onClick={onClose}
                    className="w-full bg-linear-to-r from-[#FF69B4] to-[#FF1493] hover:from-[#1E90FF] hover:to-[#00FFFF] text-white hover:text-black font-bold py-3 rounded-2xl shadow-[0_0_20px_rgba(255,105,180,0.4)] hover:shadow-[0_0_25px_rgba(30,144,255,0.5)] transition-all duration-300"
                  >
                    Start My Anime Arc! 🚀
                  </Button>

                  <p className="text-xs text-gray-500 mt-3">
                    Check your inbox for a welcome message from the crew!
                  </p>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-6 left-6 w-1 h-1 bg-[#FFD700] rounded-full animate-ping" />
              <div className="absolute bottom-8 right-8 w-1 h-1 bg-[#32CD32] rounded-full animate-ping [animation-delay:0.5s]" />
              <div className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-[#00FFFF] rounded-full animate-ping [animation-delay:1s]" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SignupPopup;
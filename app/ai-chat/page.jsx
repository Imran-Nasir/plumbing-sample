'use client'

import AIChatbot from '@/components/AIChatbot'
import { Sparkles } from 'lucide-react'

export default function AIChatPage() {
  return (
    <div className="min-h-screen bg-offWhite pt-20">
      {/* Page intro */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-limeGreen">
            AI-Powered
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal">
          Business AI Assistant
        </h1>
        <p className="text-gray-500 mt-2 text-sm max-w-xl">
          Ask questions about your business in plain language and get instant, data-driven answers.
        </p>
      </div>

      {/* Chatbot panel */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl border border-lightGray shadow-sm overflow-hidden" style={{ height: '680px' }}>
          <AIChatbot />
        </div>
      </div>
    </div>
  )
}

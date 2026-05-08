'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send, Mic, History, Plus, TrendingUp, TrendingDown,
  BarChart2, AlertTriangle, Users, DollarSign, MessageSquare,
  Sparkles, ChevronRight, X,
} from 'lucide-react'

/* ─── Static suggestion cards ─── */
const suggestions = [
  {
    id: 'sales',
    icon: BarChart2,
    title: 'Sales Analysis',
    subtitle: 'Last 30 days performance',
    accent: 'blue',
  },
  {
    id: 'stock',
    icon: AlertTriangle,
    title: 'Low Stock Alerts',
    subtitle: 'Items below reorder level',
    accent: 'red',
  },
  {
    id: 'customers',
    icon: Users,
    title: 'Top Customers',
    subtitle: 'Ranked by spend this month',
    accent: 'red',
  },
  {
    id: 'revenue',
    icon: DollarSign,
    title: 'Revenue Summary',
    subtitle: "Today's financial overview",
    accent: 'blue',
  },
]

/* ─── Sample AI response for sales query ─── */
const salesStats = [
  { label: 'Total Revenue', value: '$284,520', change: '+8.2%', up: true },
  { label: 'Orders Placed', value: '1,847', change: '+5.1%', up: true },
  { label: 'Avg Order Value', value: '$154', change: '-2.3%', up: false },
  { label: 'New Customers', value: '312', change: '+18.7%', up: true },
]

/* ─── Greeting helper ─── */
function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

/* ─── Sub-components ─── */
function SuggestionCard({ icon: Icon, title, subtitle, accent, onClick }) {
  const isBlue = accent === 'blue'
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 bg-white border border-lightGray rounded-xl p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-slateBlue hover:shadow-md w-full"
    >
      <div
        className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${
          isBlue
            ? 'bg-slateBlue/10 group-hover:bg-slateBlue/20'
            : 'bg-red-50 group-hover:bg-red-100'
        }`}
      >
        <Icon
          size={16}
          className={isBlue ? 'text-slateBlue' : 'text-red-500'}
          strokeWidth={1.75}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-charcoal text-sm leading-snug">{title}</p>
        <p className="text-gray-500 text-xs mt-0.5 leading-snug">{subtitle}</p>
      </div>
      <ChevronRight
        size={14}
        className="text-gray-300 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-slateBlue"
      />
    </button>
  )
}

function StatRow({ label, value, change, up, isLast }) {
  return (
    <div>
      <div className="flex items-center gap-3 py-3">
        <div className="w-8 h-8 rounded-full bg-slateBlue/10 flex items-center justify-center shrink-0">
          <div className="w-4 h-4 rounded-sm bg-slateBlue" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-xs leading-none">{label}</p>
          <p className="text-charcoal font-semibold text-sm mt-1 leading-none">{value}</p>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-md ${
            up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
          }`}
        >
          {up ? <TrendingUp size={10} className="inline mr-1" /> : <TrendingDown size={10} className="inline mr-1" />}
          {change}
        </span>
      </div>
      {!isLast && <div className="h-px bg-lightGray" />}
    </div>
  )
}

function AIResponseCard({ query }) {
  return (
    <div className="flex items-start gap-3">
      {/* AI avatar */}
      <div className="shrink-0 w-8 h-8 rounded-full bg-slateBlue flex items-center justify-center mt-1">
        <Sparkles size={14} className="text-limeGreen" />
      </div>

      {/* Card */}
      <div className="flex-1 bg-white border border-lightGray rounded-xl overflow-hidden shadow-sm">
        {/* Card header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-lightGray">
          <p className="font-semibold text-charcoal text-sm">Sales Analysis — Last 30 Days</p>
          <span className="text-xs font-semibold px-2 py-1 rounded-md bg-emerald-50 text-emerald-700">
            <TrendingUp size={10} className="inline mr-1" />
            12.4%
          </span>
        </div>

        {/* Stats */}
        <div className="px-4">
          {salesStats.map((stat, i) => (
            <StatRow
              key={stat.label}
              {...stat}
              isLast={i === salesStats.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function UserMessage({ text }) {
  return (
    <div className="flex justify-end">
      <div className="bg-slateBlue text-white text-sm rounded-xl px-4 py-2.5 max-w-[70%] leading-relaxed">
        {text}
      </div>
    </div>
  )
}

function ChatInput({ value, onChange, onSend, onMic }) {
  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }
  return (
    <div className="bg-white border border-lightGray rounded-xl flex items-center gap-3 px-4 py-3 shadow-sm">
      <button
        onClick={onMic}
        className="shrink-0 w-8 h-8 rounded-full bg-offWhite flex items-center justify-center text-gray-400 hover:bg-lightGray hover:text-slateBlue transition-colors"
        aria-label="Voice input"
      >
        <Mic size={15} />
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Ask anything about your business..."
        className="flex-1 bg-transparent text-sm text-charcoal placeholder-gray-400 focus:outline-none"
      />
      <button
        onClick={onSend}
        disabled={!value.trim()}
        className="shrink-0 w-10 h-10 rounded-lg bg-charcoal flex items-center justify-center text-white transition-all duration-200 hover:bg-slateBlue hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-charcoal"
        aria-label="Send message"
      >
        <Send size={15} />
      </button>
    </div>
  )
}

/* ─── Main Chatbot Component ─── */
export default function AIChatbot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const messagesEndRef = useRef(null)

  const greeting = getGreeting()
  const hasMessages = messages.length > 0

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function handleSend() {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text }])
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [...prev, { role: 'ai', type: 'sales', query: text }])
    }, 1400)
  }

  function handleSuggestion(card) {
    const query = `Show me the ${card.title.toLowerCase()} for last 30 days`
    setMessages([{ role: 'user', text: query }])
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [...prev, { role: 'ai', type: 'sales', query }])
    }, 1400)
  }

  function handleNewChat() {
    setMessages([])
    setInput('')
    setIsTyping(false)
    setShowHistory(false)
  }

  return (
    <div className="flex flex-col h-full bg-offWhite">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-lightGray shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slateBlue flex items-center justify-center">
            <Sparkles size={15} className="text-limeGreen" />
          </div>
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-charcoal text-base leading-none">Business AI</h2>
            <span className="text-[10px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded-md leading-none">
              BETA
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHistory((v) => !v)}
            className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg border transition-all duration-200 ${
              showHistory
                ? 'bg-slateBlue text-white border-slateBlue'
                : 'bg-white text-charcoal border-lightGray hover:border-slateBlue hover:text-slateBlue'
            }`}
          >
            <History size={14} />
            History
          </button>
          <button
            onClick={handleNewChat}
            className="flex items-center gap-1.5 text-sm font-bold px-3 py-2 rounded-lg bg-slateBlue text-white transition-all duration-200 hover:bg-slateBlue/90 hover:shadow-md active:scale-95"
          >
            <Plus size={14} />
            New Chat
          </button>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-lightGray shrink-0" />

      {/* ── Main area ── */}
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 min-h-0">

        {!hasMessages && !isTyping ? (
          /* Welcome state */
          <div className="flex flex-col items-center gap-8 mt-16 animate-fade-in">
            {/* Greeting */}
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-charcoal leading-tight">
                Good{' '}
                <span className="text-slateBlue">{greeting}</span>
              </h1>
              <p className="text-gray-500 text-sm mt-3">
                What would you like to know about your business today?
              </p>
            </div>

            {/* Suggestion cards — 2 × 2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
              {suggestions.map((card) => (
                <SuggestionCard
                  key={card.id}
                  {...card}
                  onClick={() => handleSuggestion(card)}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Conversation state */
          <div className="flex flex-col gap-4 animate-fade-in">
            {messages.map((msg, i) =>
              msg.role === 'user' ? (
                <UserMessage key={i} text={msg.text} />
              ) : (
                <AIResponseCard key={i} query={msg.query} />
              )
            )}
            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slateBlue flex items-center justify-center shrink-0">
                  <Sparkles size={14} className="text-limeGreen" />
                </div>
                <div className="bg-white border border-lightGray rounded-xl px-4 py-3 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-slateBlue/40 animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-slateBlue/60 animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-slateBlue/80 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* ── Chat input (pinned at bottom) ── */}
      <div className="px-6 pb-6 shrink-0">
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          onMic={() => {}}
        />
      </div>
    </div>
  )
}

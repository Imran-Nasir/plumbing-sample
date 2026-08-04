'use client'

import { useState, useRef, useEffect } from 'react'
import {
  BarChart2, AlertTriangle, Users, DollarSign,
  Mic, ArrowUp, Clock, Plus, Bot,
} from 'lucide-react'

// ─── Design tokens (mapped from Figma design system to project tokens) ───────
// Figma #795cf5 → slateBlue (#2D5F8A)
// Figma #16151c → charcoal (#1A1A2E)
// Figma #686379 → gray-500
// Figma #e0dfe4 → lightGray (#E9ECEF)
// Figma #f6f6f7 → offWhite (#F8F9FA)
// Figma #f1effe (purple-50) → blue-50
// Figma #fef1f0 (red-50) / #df201e (red-600) → red-50 / red-600
// Figma #e5fff9 (green-50) / #09786a (green-700) → green-50 / green-700

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

const SUGGESTION_CARDS = [
  {
    id: 'sales',
    Icon: BarChart2,
    title: 'Sales Analysis',
    subtitle: 'Last 30 days performance',
    accent: 'blue',
    prompt: 'Show me the sales analysis for last 30 days',
    response: {
      title: 'Sales Analysis — Last 30 Days',
      badge: { label: '↑ 12.4%', positive: true },
      stats: [
        { Icon: BarChart2,   label: 'Total Revenue',   value: '$284,520', change: '+8.2%',  positive: true  },
        { Icon: BarChart2,   label: 'Orders Placed',   value: '1,847',    change: '+5.1%',  positive: true  },
        { Icon: BarChart2,   label: 'Avg Order Value', value: '$154',     change: '-2.3%',  positive: false },
        { Icon: Users,       label: 'New Customers',   value: '312',      change: '+18.7%', positive: true  },
      ],
    },
  },
  {
    id: 'stock',
    Icon: AlertTriangle,
    title: 'Low Stock Alerts',
    subtitle: 'Items below reorder level',
    accent: 'red',
    prompt: 'Show me items below reorder level',
    response: {
      title: 'Low Stock Alerts',
      badge: { label: '7 Items', positive: false },
      stats: [
        { Icon: AlertTriangle, label: 'Copper Pipes 1/2"',  value: '12 units', change: 'Critical', positive: false },
        { Icon: AlertTriangle, label: 'PVC Fittings 3/4"',  value: '8 units',  change: 'Low',      positive: false },
        { Icon: AlertTriangle, label: 'Pipe Sealant',       value: '5 units',  change: 'Critical', positive: false },
        { Icon: AlertTriangle, label: 'Drain Screens',      value: '20 units', change: 'Low',      positive: false },
      ],
    },
  },
  {
    id: 'customers',
    Icon: Users,
    title: 'Top Customers',
    subtitle: 'Ranked by spend this month',
    accent: 'red',
    prompt: 'Who are my top customers this month?',
    response: {
      title: 'Top Customers — This Month',
      badge: { label: 'Top 4', positive: true },
      stats: [
        { Icon: Users, label: 'Marcus R.',     value: '$4,200', change: '+12%', positive: true  },
        { Icon: Users, label: 'Jennifer L.',   value: '$3,750', change: '+8%',  positive: true  },
        { Icon: Users, label: 'Tom & Carla B.', value: '$2,900', change: '+3%', positive: true  },
        { Icon: Users, label: 'Sophia M.',     value: '$2,400', change: '-1%',  positive: false },
      ],
    },
  },
  {
    id: 'revenue',
    Icon: DollarSign,
    title: 'Revenue Summary',
    subtitle: "Today's financial overview",
    accent: 'blue',
    prompt: "Give me today's revenue summary",
    response: {
      title: 'Revenue Summary — Today',
      badge: { label: '↑ 6.8%', positive: true },
      stats: [
        { Icon: DollarSign, label: 'Gross Revenue',     value: '$18,340', change: '+6.8%',  positive: true  },
        { Icon: DollarSign, label: 'Net Profit',        value: '$11,200', change: '+4.2%',  positive: true  },
        { Icon: DollarSign, label: 'Expenses',          value: '$7,140',  change: '+2.1%',  positive: false },
        { Icon: DollarSign, label: 'Pending Invoices',  value: '$3,500',  change: '5 open', positive: null  },
      ],
    },
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ChangeBadge({ change, positive }) {
  if (positive === true)
    return (
      <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-green-50 text-green-700 whitespace-nowrap">
        {change}
      </span>
    )
  if (positive === false)
    return (
      <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-red-50 text-red-600 whitespace-nowrap">
        {change}
      </span>
    )
  return (
    <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-500 whitespace-nowrap">
      {change}
    </span>
  )
}

function AIResponseCard({ response }) {
  return (
    <div className="flex items-start gap-3">
      {/* AI Avatar */}
      <div className="w-8 h-8 rounded-full bg-slateBlue flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
        <Bot size={15} className="text-white" />
      </div>

      {/* Card */}
      <div className="flex-1 bg-white border border-lightGray rounded-xl overflow-hidden shadow-sm max-w-2xl">
        {/* Card header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-lightGray">
          <span className="text-sm font-semibold text-charcoal">{response.title}</span>
          <ChangeBadge change={response.badge.label} positive={response.badge.positive} />
        </div>

        {/* Stats rows */}
        <div className="divide-y divide-lightGray">
          {response.stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <stat.Icon size={14} className="text-slateBlue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 leading-tight">{stat.label}</p>
                <p className="text-sm font-semibold text-charcoal">{stat.value}</p>
              </div>
              <ChangeBadge change={stat.change} positive={stat.positive} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function UserMessage({ text }) {
  return (
    <div className="flex justify-end">
      <div className="bg-slateBlue text-white text-sm font-normal rounded-xl px-4 py-2.5 max-w-[60%] leading-relaxed">
        {text}
      </div>
    </div>
  )
}

function AITextMessage({ text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-slateBlue flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
        <Bot size={15} className="text-white" />
      </div>
      <div className="bg-white border border-lightGray rounded-xl px-4 py-3 shadow-sm max-w-2xl">
        <p className="text-sm text-charcoal leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-slateBlue flex items-center justify-center flex-shrink-0">
        <Bot size={15} className="text-white" />
      </div>
      <div className="bg-white border border-lightGray rounded-xl px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-5">
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BusinessAIPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  const greeting = getGreeting()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function handleSend(text) {
    const trimmed = text.trim()
    if (!trimmed || typing) return

    const card = SUGGESTION_CARDS.find(c => c.prompt === trimmed)

    setMessages(prev => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      if (card) {
        setMessages(prev => [...prev, { role: 'ai', type: 'card', response: card.response }])
      } else {
        setMessages(prev => [
          ...prev,
          {
            role: 'ai',
            type: 'text',
            text: "I can help with your business insights. Try asking about sales analysis, low stock alerts, top customers, or today's revenue summary.",
          },
        ])
      }
    }, 900)
  }

  function handleNewChat() {
    setMessages([])
    setInput('')
    setTyping(false)
  }

  const hasMessages = messages.length > 0 || typing

  return (
    <div className="min-h-screen bg-offWhite">
      <div className="max-w-[1185px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-charcoal leading-6">Business AI</h1>
            <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-red-50 text-red-600 tracking-wide">
              BETA
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 px-4 h-9 rounded-lg border border-lightGray bg-white text-sm font-semibold text-charcoal hover:bg-offWhite transition-colors duration-200"
              aria-label="Chat history"
            >
              <Clock size={15} className="text-gray-500" />
              History
            </button>
            <button
              onClick={handleNewChat}
              className="flex items-center gap-1.5 px-4 h-9 rounded-lg bg-slateBlue text-white text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
              aria-label="Start new chat"
            >
              <Plus size={15} />
              New Chat
            </button>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-lightGray mb-6" />

        {/* ── Main content ── */}
        <div className="h-[calc(100vh-240px)] min-h-[500px] flex flex-col">

          {/* ── Messages / Welcome ── */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {!hasMessages ? (
              /* Welcome state */
              <div className="flex flex-col items-center justify-center min-h-full gap-8 py-8 animate-fade-in">
                {/* Greeting */}
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-charcoal leading-tight">
                    Good{' '}
                    <span className="text-slateBlue">{greeting}</span>
                  </h2>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                    What would you like to know about your business today?
                  </p>
                </div>

                {/* Suggestion cards 2×2 grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
                  {SUGGESTION_CARDS.map(card => (
                    <button
                      key={card.id}
                      onClick={() => handleSend(card.prompt)}
                      className="flex items-center gap-4 px-5 py-5 bg-white border border-lightGray rounded-xl text-left hover:border-slateBlue hover:shadow-sm transition-all duration-200 group"
                    >
                      {/* Icon circle */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          card.accent === 'blue' ? 'bg-blue-50' : 'bg-red-50'
                        }`}
                      >
                        <card.Icon
                          size={18}
                          className={card.accent === 'blue' ? 'text-slateBlue' : 'text-red-500'}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-charcoal group-hover:text-slateBlue transition-colors duration-200">
                          {card.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{card.subtitle}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Conversation state */
              <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full py-2">
                {messages.map((msg, idx) => {
                  if (msg.role === 'user') return <UserMessage key={idx} text={msg.text} />
                  if (msg.type === 'card') return <AIResponseCard key={idx} response={msg.response} />
                  return <AITextMessage key={idx} text={msg.text} />
                })}
                {typing && <TypingIndicator />}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {/* ── Chat Input Bar ── */}
          <div className="flex-shrink-0 pt-4">
            <div className="flex items-center gap-3 bg-white border border-lightGray rounded-xl px-4 py-3 shadow-sm max-w-3xl mx-auto transition-shadow duration-200 focus-within:shadow-md focus-within:border-slateBlue">
              {/* Mic button */}
              <button
                className="w-8 h-8 rounded-full bg-offWhite flex items-center justify-center flex-shrink-0 hover:bg-lightGray transition-colors duration-200"
                aria-label="Voice input"
              >
                <Mic size={15} className="text-gray-400" />
              </button>

              {/* Input field */}
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                placeholder="Ask anything about your business..."
                className="flex-1 bg-transparent text-sm text-charcoal placeholder-gray-400 outline-none leading-relaxed"
                disabled={typing}
              />

              {/* Send button */}
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || typing}
                className="w-10 h-10 rounded-lg bg-charcoal flex items-center justify-center flex-shrink-0 hover:opacity-80 disabled:opacity-40 transition-opacity duration-200"
                aria-label="Send message"
              >
                <ArrowUp size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

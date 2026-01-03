"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { useChat } from "@ai-sdk/react"
import { Search, FileText, BookOpen, Send, Bot, User, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { pdfDocuments } from "@/lib/pdf-knowledge-base"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function SearchChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, error } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("Chat error:", error)
    },
  })
  
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Ensure we always have a valid onChange handler
  const handleChatInputChange = handleInputChange || ((e: React.ChangeEvent<HTMLInputElement>) => {
    if (setInput) {
      setInput(e.target.value)
    }
  })

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const categories = useMemo(() => {
    if (!pdfDocuments || !Array.isArray(pdfDocuments)) return []
    return Array.from(new Set(pdfDocuments.map((doc) => doc.category)))
  }, [])

  const filteredDocs = useMemo(() => {
    if (!pdfDocuments || !Array.isArray(pdfDocuments)) {
      return []
    }
    
    const query = (searchQuery || "").toLowerCase().trim()
    const results = pdfDocuments.filter((doc) => {
      const matchesCategory = !selectedCategory || doc.category === selectedCategory
      
      if (!query) {
        return matchesCategory
      }
      
      const title = (doc.title || "").toLowerCase()
      const authors = (doc.authors || "").toLowerCase()
      const matchesTitle = title.includes(query)
      const matchesAuthors = authors.includes(query)
      
      return (matchesTitle || matchesAuthors) && matchesCategory
    })
    
    return results
  }, [searchQuery, selectedCategory])

  return (
    <div className="flex h-screen bg-background" style={{ position: 'relative', zIndex: 100 }}>
      {/* Left Sidebar - PDF Search */}
      <div className="w-80 border-r border-border bg-card flex flex-col" style={{ zIndex: 100 }}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="size-5 text-primary" />
            <h2 className="font-semibold text-sm">PDF Library</h2>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {pdfDocuments.length}
            </span>
          </div>

          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search papers..."
              className="pl-9 h-9 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              autoComplete="off"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "text-xs px-2.5 py-1 rounded-md transition-colors font-medium cursor-pointer",
                !selectedCategory
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "text-xs px-2.5 py-1 rounded-md transition-colors font-medium whitespace-nowrap cursor-pointer",
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredDocs.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No papers found. Try adjusting your search or category filter.
            </div>
          ) : (
            <div className="space-y-1">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => {
                    if (doc.url) {
                      window.open(doc.url, '_blank')
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <FileText className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-tight line-clamp-2">{doc.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {doc.authors.split(",")[0]} et al. • {doc.year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Chat Interface */}
      <div className="flex-1 flex flex-col" style={{ position: 'relative', zIndex: 100 }}>
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <h1 className="text-sm font-semibold">Research Assistant</h1>
              <p className="text-xs text-muted-foreground">Powered by {pdfDocuments.length} academic papers</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
          <div className="max-w-3xl mx-auto">
            {error && (
              <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">
                  Error: {error.message || "Something went wrong. Please try again."}
                </p>
              </div>
            )}
            
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <Bot className="size-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">How can I help with your research?</h2>
                <p className="text-muted-foreground text-sm max-w-md mb-8">
                  Ask me anything about leadership and crisis management from the {pdfDocuments.length} indexed academic papers.
                </p>

                {/* Suggested Questions */}
                <div className="grid sm:grid-cols-2 gap-3 w-full max-w-2xl">
                  {[
                    "What is charismatic leadership in crisis?",
                    "How did leaders handle Hurricane Katrina?",
                    "Explain transformational vs transactional leadership",
                    "What are key crisis management competencies?",
                  ].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => {
                        if (setInput) {
                          setInput(q)
                          setTimeout(() => {
                            if (handleSubmit) {
                              const syntheticEvent = {
                                preventDefault: () => {},
                                stopPropagation: () => {},
                                currentTarget: null,
                                target: null,
                              } as React.FormEvent<HTMLFormElement>
                              handleSubmit(syntheticEvent)
                            }
                          }, 100)
                        }
                      }}
                      className="p-4 text-sm text-left border border-border rounded-xl hover:bg-accent transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((m) => (
                  <div key={m.id} className="flex gap-4">
                    <div className={cn(
                      "size-8 rounded-full flex items-center justify-center flex-shrink-0",
                      m.role === "user" ? "bg-foreground text-background" : "bg-primary text-primary-foreground",
                    )}>
                      {m.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="prose prose-sm max-w-none leading-relaxed text-foreground">
                        {m.content}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-4">
                    <div className="size-8 rounded-full bg-primary flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                      <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <div className="sticky bottom-0 bg-background border-t border-border p-4" style={{ zIndex: 50 }}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (input?.trim() && handleSubmit) {
                handleSubmit(e)
              }
            }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex gap-2 items-end">
              <div className="relative flex-1">
                <Input
                  value={input || ""}
                  onChange={handleChatInputChange}
                  placeholder="Ask about the research papers..."
                  className="h-12 pr-10"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      const currentValue = (e.target as HTMLInputElement).value
                      if (currentValue.trim() && handleSubmit) {
                        e.preventDefault()
                        handleSubmit(e as any)
                      }
                    }
                  }}
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  </div>
                )}
              </div>
              <Button
                type="submit"
                size="icon"
                className="h-12 w-12 rounded-lg"
                disabled={!input?.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Send className="size-5" />
                )}
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              AI responses are based on the {pdfDocuments.length} academic papers. Always verify important information.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}


"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { FileText, Send, User, Bot, Search, BookOpen, Loader2, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { pdfDocuments } from "@/lib/pdf-knowledge-base"

function extractCitations(content: string): string[] {
  const citations: string[] = []
  const citationRegex = /([A-Z][a-z]+(?:\s+(?:&|and|et al\.)\s+[A-Z][a-z]+)?)\s*$$(\d{4})$$/g
  let match
  while ((match = citationRegex.exec(content)) !== null) {
    const citation = `${match[1]} (${match[2]})`
    if (!citations.includes(citation)) {
      citations.push(citation)
    }
  }
  return citations
}

function getCitedDocuments(citations: string[]) {
  return pdfDocuments.filter((doc) => {
    return citations.some((citation) => {
      const authorMatch = citation.toLowerCase().includes(doc.authors.toLowerCase().split(",")[0].toLowerCase())
      const yearMatch = citation.includes(doc.year)
      return authorMatch && yearMatch
    })
  })
}

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, error } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("Chat error:", error)
    },
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

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

  // Ensure sidebar is open on desktop by default
  useEffect(() => {
    const checkDesktop = () => {
      const isDesktop = window.innerWidth >= 1024
      if (isDesktop) {
        setSidebarOpen(true)
      }
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

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
    <div className="flex h-screen bg-background" style={{ position: 'relative', zIndex: 10 }}>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 bg-card border-r border-border transform transition-transform duration-300",
          "lg:relative lg:translate-x-0 lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        style={{ pointerEvents: 'auto', position: 'relative' }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <BookOpen className="size-5 text-primary" />
              <h2 className="font-semibold text-sm">PDF Library</h2>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">21</span>
            </div>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="size-4" />
            </Button>
          </div>

          <div className="p-4 space-y-3 border-b border-border">
            <div className="relative" style={{ zIndex: 10 }}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
              <Input
                placeholder="Search papers..."
                className="pl-9 h-9 bg-background cursor-text"
                value={searchQuery || ""}
                onChange={(e) => {
                  e.stopPropagation()
                  const value = e.target.value
                  setSearchQuery(value)
                }}
                onClick={(e) => {
                  e.stopPropagation()
                }}
                onFocus={(e) => {
                  e.stopPropagation()
                }}
                type="text"
                autoComplete="off"
                style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null)
                }}
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
                  onClick={() => {
                    setSelectedCategory(cat)
                  }}
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

          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1" key={`search-${searchQuery}-cat-${selectedCategory}`}>
              {filteredDocs.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No papers found. Try adjusting your search or category filter.
                </div>
              ) : (
                filteredDocs.map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors group flex items-start gap-3 cursor-pointer"
                  >
                    <FileText className="size-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-tight line-clamp-2">{doc.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {doc.authors.split(",")[0]} et al. • {doc.year}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
          style={{ pointerEvents: 'auto' }}
        />
      )}

      <div className="flex-1 flex flex-col" style={{ position: 'relative', zIndex: 1 }}>
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="lg:hidden"
              type="button"
            >
              <Menu className="size-5" />
            </Button>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-sm font-semibold">Research Assistant</h1>
              <p className="text-xs text-muted-foreground">Powered by 21 academic papers</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1" ref={scrollRef}>
          <div className="max-w-3xl mx-auto px-4 py-8">
            {error && (
              <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">
                  Error: {error.message || "Something went wrong. Please try again."}
                </p>
              </div>
            )}
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in duration-500">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <Bot className="size-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">How can I help with your research?</h2>
                <p className="text-muted-foreground text-sm max-w-md mb-8">
                  Ask me anything about leadership and crisis management from the 21 indexed academic papers.
                </p>

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
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        
                        // Set the input value immediately
                        if (setInput) {
                          setInput(q)
                        } else if (handleInputChange) {
                          handleInputChange({ target: { value: q } } as any)
                        }
                        
                        // Submit after state updates
                        setTimeout(() => {
                          if (handleSubmit && formRef.current) {
                            const syntheticEvent = {
                              preventDefault: () => {},
                              stopPropagation: () => {},
                              currentTarget: formRef.current,
                              target: formRef.current,
                            } as React.FormEvent<HTMLFormElement>
                            
                            handleSubmit(syntheticEvent)
                          }
                        }, 200)
                      }}
                      className="p-4 text-sm text-left border border-border rounded-xl hover:bg-accent transition-colors cursor-pointer active:scale-95"
                      style={{ 
                        pointerEvents: 'auto', 
                        zIndex: 50,
                        position: 'relative',
                        cursor: 'pointer'
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((m) => {
                  const citations = m.role === "assistant" ? extractCitations(m.content) : []
                  const citedDocs = m.role === "assistant" ? getCitedDocuments(citations) : []

                  return (
                    <div key={m.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div
                        className={cn("flex gap-4 p-4 rounded-2xl", m.role === "user" ? "bg-card" : "bg-transparent")}
                      >
                        <div
                          className={cn(
                            "size-8 rounded-full flex items-center justify-center flex-shrink-0",
                            m.role === "user" ? "bg-foreground text-background" : "bg-primary text-primary-foreground",
                          )}
                        >
                          {m.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                        </div>
                        <div className="flex-1 space-y-3 pt-1">
                          <div className="prose prose-sm max-w-none leading-relaxed text-foreground">{m.content}</div>

                          {m.role === "assistant" && citedDocs.length > 0 && (
                            <div className="pt-3 border-t border-border/50">
                              <p className="text-xs text-muted-foreground font-medium mb-2 flex items-center gap-2">
                                <FileText className="size-3" />
                                Sources Referenced
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {citedDocs.map((doc) => (
                                  <div
                                    key={doc.id}
                                    className="text-xs bg-accent px-3 py-1.5 rounded-lg border border-border hover:bg-accent/80 transition-colors cursor-pointer"
                                    title={doc.title}
                                  >
                                    {doc.authors.split(",")[0]} ({doc.year})
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {isLoading && (
                  <div className="flex gap-4 p-4 animate-pulse">
                    <div className="size-8 rounded-full bg-primary flex-shrink-0" />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="sticky bottom-0 bg-background border-t border-border p-4" style={{ zIndex: 20 }}>
          <form 
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              const currentInput = input || (e.target as HTMLFormElement).querySelector('input')?.value || ""
              if (currentInput.trim() && handleSubmit) {
                handleSubmit(e)
              }
            }} 
            className="max-w-3xl mx-auto"
            style={{ pointerEvents: 'auto', zIndex: 50 }}
          >
            <div className="flex gap-2 items-end">
              <div className="relative flex-1">
                <Input
                  value={input || ""}
                  onChange={handleChatInputChange}
                  placeholder="Ask about the research papers..."
                  className="h-12 pr-10 resize-none cursor-text"
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
                  style={{ 
                    pointerEvents: 'auto', 
                    zIndex: 50,
                    position: 'relative'
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
              AI responses are based on the 21 academic papers. Always verify important information.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { Search, FileText, BookOpen, X } from "lucide-react"
import { pdfDocuments } from "@/lib/pdf-knowledge-base"
import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function SimpleSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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
      {/* Sidebar */}
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
                      <p className="text-xs text-muted-foreground mt-1">
                        {doc.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col" style={{ position: 'relative', zIndex: 100 }}>
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2">Research Paper Search</h1>
          <p className="text-muted-foreground mb-6">
            Search through {pdfDocuments.length} academic papers on leadership and crisis management
          </p>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">How to use:</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use the search box to find papers by title or author name</li>
              <li>• Click category buttons to filter by topic</li>
              <li>• Click on any paper to open it (if URL is available)</li>
              <li>• Found {filteredDocs.length} paper{filteredDocs.length !== 1 ? 's' : ''} matching your search</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


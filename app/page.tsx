"use client"
import { Leva } from "leva"
import { SearchChat } from "@/components/search-chat"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen pt-24 md:pt-32 bg-background">
      <Header />
      <div className="relative z-10">
        <div className="container mb-8">
          <h1 className="text-4xl md:text-5xl font-sentient mb-2">Knowledge Archive</h1>
          <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest">
            Intelligent PDF Search & Retrieval System
          </p>
        </div>
        <SearchChat />
      </div>
      <Leva hidden />
    </main>
  )
}

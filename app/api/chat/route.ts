import { streamText } from "ai"
import { searchPDFs } from "@/lib/pdf-knowledge-base"

export const maxDuration = 30
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    
    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const lastMessage = messages[messages.length - 1]
    
    if (!lastMessage || !lastMessage.content) {
      return new Response(JSON.stringify({ error: "Invalid message format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Search relevant PDFs based on the user's question
    const searchResults = searchPDFs(lastMessage.content)

  // Build context from search results
  const context = searchResults.map((result, index) => ({
    source: result.document.title,
    authors: result.document.authors,
    year: result.document.year,
    relevance: result.relevance,
    content: result.matchedContent,
    keyFindings: result.document.keyFindings.slice(0, 3),
  }))

  // Build citation metadata to be returned with the response
  const citations = searchResults.map((result) => ({
    id: result.document.id,
    title: result.document.title,
    authors: result.document.authors,
    year: result.document.year,
    category: result.document.category,
  }))

  const systemPrompt = `You are a specialized research assistant with access to 20 academic papers on leadership and crisis management. 

Available documents:
${searchResults.map((r) => `- ${r.document.title} (${r.document.authors}, ${r.document.year})`).join("\n")}

Context from relevant papers:
${JSON.stringify(context, null, 2)}

Instructions:
1. Answer questions based ONLY on the information provided in the context above
2. Always cite specific papers when making claims (e.g., "According to Pillai (2012)...")
3. If the answer isn't in the provided documents, say "I don't have information about that in the available documents"
4. Be precise and academic in your responses
5. When multiple papers discuss the same topic, synthesize the information
6. Include key findings and specific data when available (e.g., correlation coefficients, sample sizes)
7. At the end of your response, reference which papers you used by mentioning their titles`

  const result = await streamText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    messages,
    // Include citations in the response metadata
    onFinish: async ({ text }) => {
      // Citations will be accessible via the response
    },
  })

  // Add custom header with citation information
  const response = result.toUIMessageStreamResponse()

  // Inject citations into the response
  const originalResponse = await response
  const customHeaders = new Headers(originalResponse.headers)
  customHeaders.set("X-Citations", JSON.stringify(citations))

    return new Response(originalResponse.body, {
      headers: customHeaders,
      status: originalResponse.status,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(
      JSON.stringify({ 
        error: "An error occurred while processing your request",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}

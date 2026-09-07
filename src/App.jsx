import ChatWindow from './components/ChatWindow'
import PromptInput from './components/PromptInput'
import { useChat } from './hooks/useChat'
import './App.css'

function App() {
  // The custom hook centralizes the "thinking" part of the app:
  // state, API calls, and error handling.
  const { error, isLoading, lastAssistantMessage, messages, model, sendMessage, setModel } =
    useChat()
  const latestReplyPreview = lastAssistantMessage?.content || 'No response yet'

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">React + Ollama Tutorial</p>
        <h1>Build a local LLM chat app with React</h1>
        <p className="hero-copy">
          This beginner-friendly project teaches how React state, fetch requests, and a local Ollama
          model work together to generate AI responses.
        </p>

        <div className="teaching-grid">
          <article className="teaching-card">
            <h2>What you are learning</h2>
            <ul>
              <li>How a React form sends prompts to an API</li>
              <li>How Ollama serves local LLMs over HTTP</li>
              <li>How to handle loading, empty input, and connection errors</li>
            </ul>
          </article>

          <article className="teaching-card">
            <h2>Architecture</h2>
            <p>User input → React state → fetch() → Ollama API → generated text → UI update</p>
            <p className="mini-note">
              Current model: <strong>{model}</strong>
            </p>
          </article>
        </div>
      </section>

      <section className="chat-panel">
        <div className="chat-header">
          <div>
            <h2>Chat interface</h2>
            <p>Ask a question and watch the app call your local Ollama model.</p>
          </div>
          <div className="status-card">
            <span>Latest assistant reply</span>
            <strong>
              {latestReplyPreview.length > 72
                ? `${latestReplyPreview.slice(0, 72)}...`
                : latestReplyPreview}
            </strong>
          </div>
        </div>

        {/* These child components receive data and callbacks as props.
            This is a core React pattern called one-way data flow. */}
        <ChatWindow messages={messages} isLoading={isLoading} />
        <PromptInput
          error={error}
          isLoading={isLoading}
          model={model}
          onModelChange={setModel}
          onSend={sendMessage}
        />
      </section>
    </main>
  )
}

export default App

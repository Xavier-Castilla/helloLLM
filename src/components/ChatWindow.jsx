import Message from './Message'

// React receives updated state and re-renders the message list automatically.
// That makes chat UIs a good way to teach one-way data flow.
function ChatWindow({ messages, isLoading }) {
  return (
    <section className="chat-window" aria-live="polite">
      {/* Mapping over arrays is how React renders repeated UI from state. */}
      {messages.map((message) => (
        <Message key={message.id} role={message.role} content={message.content} />
      ))}

      {isLoading ? (
        <article className="message assistant">
          <div className="message-badge">AI</div>
          <div>
            <p className="message-role">Assistant</p>
            <p className="message-content">Thinking… generating a response from your local model.</p>
          </div>
        </article>
      ) : null}
    </section>
  )
}

export default ChatWindow

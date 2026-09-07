// Presentational components render UI for one responsibility.
// This component only worries about how a single message looks.
function Message({ role, content }) {
  const isAssistant = role === 'assistant'

  return (
    <article className={`message ${isAssistant ? 'assistant' : 'user'}`}>
      {/* Small visual cues make chat roles easier to scan quickly. */}
      <div className="message-badge">{isAssistant ? 'AI' : 'You'}</div>
      <div>
        <p className="message-role">{isAssistant ? 'Assistant' : 'User'}</p>
        <p className="message-content">{content}</p>
      </div>
    </article>
  )
}

export default Message

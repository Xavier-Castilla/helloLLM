import { useState } from 'react'
import { EXAMPLE_PROMPTS, MODEL_OPTIONS } from '../utils/constants'

// Controlled inputs keep the React state as the source of truth.
// That makes it easier to validate, reset, and reuse form values.
function PromptInput({ error, isLoading, model, onModelChange, onSend }) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    await onSend({ prompt })

    // We only clear the field when the prompt contains actual text.
    // This avoids wiping out accidental blank submissions.
    if (prompt.trim()) {
      setPrompt('')
    }
  }

  const applyExamplePrompt = (examplePrompt) => {
    setPrompt(examplePrompt)
  }

  return (
    <form className="prompt-panel" onSubmit={handleSubmit}>
      <div className="prompt-toolbar">
        <label className="model-field" htmlFor="model-select">
          <span>Ollama model</span>
          <select
            id="model-select"
            value={model}
            onChange={(event) => onModelChange(event.target.value)}
            disabled={isLoading}
          >
            {MODEL_OPTIONS.map((modelOption) => (
              <option key={modelOption} value={modelOption}>
                {modelOption}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="send-button" disabled={isLoading}>
          {isLoading ? 'Sending…' : 'Send'}
        </button>
      </div>

      <label className="prompt-field" htmlFor="prompt-textarea">
        <span>Your prompt</span>
        <textarea
          id="prompt-textarea"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask your local model a question, for example: Explain React hooks simply."
          rows="5"
          disabled={isLoading}
        />
      </label>

      <div className="example-prompts">
        <span>Example prompts:</span>
        <div className="example-prompt-list">
          {EXAMPLE_PROMPTS.map((examplePrompt) => (
            <button
              key={examplePrompt}
              type="button"
              className="example-prompt"
              onClick={() => applyExamplePrompt(examplePrompt)}
              disabled={isLoading}
            >
              {examplePrompt}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <p className="error-banner" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  )
}

export default PromptInput

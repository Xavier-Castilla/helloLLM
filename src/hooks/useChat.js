import { useMemo, useRef, useState } from 'react'
import { generateCompletion } from '../services/ollamaService'
import { DEFAULT_MODEL, ERROR_MESSAGES } from '../utils/constants'

const createMessage = (role, content) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  role,
  content,
})

// Custom hooks let us reuse stateful logic without duplicating code.
// This hook owns the chat state so the UI components can stay focused on rendering.
export function useChat() {
  const [messages, setMessages] = useState([
    createMessage(
      'assistant',
      'Hello! I am powered by a local Ollama model. Ask me a React or AI question to test the integration.',
    ),
  ])
  const [model, setModel] = useState(DEFAULT_MODEL)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const isPendingRef = useRef(false)

  const lastAssistantMessage = useMemo(
    () => [...messages].reverse().find((message) => message.role === 'assistant'),
    [messages],
  )

  const sendMessage = async ({
    prompt,
    systemPrompt = 'You are a senior React engineer who explains concepts to beginners.',
    temperature = 0.7,
  }) => {
    const trimmedPrompt = prompt.trim()
    const selectedModel = model

    // Prompt validation prevents avoidable API requests and improves UX.
    if (!trimmedPrompt) {
      setError(ERROR_MESSAGES.emptyPrompt)
      return
    }

    // State updates are asynchronous, so a ref gives us an immediate guard
    // against accidental double-submits.
    if (isPendingRef.current) {
      return
    }

    isPendingRef.current = true
    setIsLoading(true)
    setError('')

    const userMessage = createMessage('user', trimmedPrompt)
    setMessages((currentMessages) => [...currentMessages, userMessage])

    try {
      // async/await keeps asynchronous code readable for beginners.
      const completion = await generateCompletion({
        model: selectedModel,
        prompt: trimmedPrompt,
        systemPrompt,
        temperature,
      })

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage(
          'assistant',
          completion.text || 'The model responded, but no text was returned.',
        ),
      ])
    } catch (caughtError) {
      const errorMessage =
        caughtError instanceof TypeError
          ? ERROR_MESSAGES.ollamaOffline
          : caughtError.message || ERROR_MESSAGES.generic

      setError(errorMessage)
    } finally {
      isPendingRef.current = false
      setIsLoading(false)
    }
  }

  return {
    error,
    isLoading,
    lastAssistantMessage,
    messages,
    model,
    sendMessage,
    setError,
    setModel,
  }
}

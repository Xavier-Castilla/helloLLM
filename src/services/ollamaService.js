import { ERROR_MESSAGES, OLLAMA_API_URL } from '../utils/constants'

// Ollama exposes a local REST API.
// We send prompts to the API and receive generated text.
// Because the model runs locally, no cloud API key is required.
export async function generateCompletion({ model, prompt, systemPrompt = '', temperature = 0.7 }) {
  // Prompt construction can be simple.
  // Here we optionally prepend a system-style instruction so learners can see
  // how context changes the final answer.
  const fullPrompt = systemPrompt ? `${systemPrompt}\n\nUser: ${prompt}` : prompt

  const response = await fetch(OLLAMA_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      prompt: fullPrompt,
      stream: false,
      options: {
        temperature,
      },
    }),
  })

  // Error handling matters for AI integrations because local services can be
  // offline, missing models, or return unexpected responses.
  if (!response.ok) {
    const responseText = await response.text()
    const normalizedResponseText = responseText.toLowerCase()

    if (
      normalizedResponseText.includes('model') &&
      (normalizedResponseText.includes('not found') ||
        normalizedResponseText.includes('pull') ||
        normalizedResponseText.includes('missing'))
    ) {
      throw new Error(ERROR_MESSAGES.missingModel)
    }

    throw new Error(responseText || ERROR_MESSAGES.generic)
  }

  const data = await response.json()

  // Ollama returns the generated response text in the "response" property
  // when stream is disabled.
  return {
    text: data.response?.trim() || '',
    raw: data,
  }
}

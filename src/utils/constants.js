// Keeping shared values in one file makes the app easier to maintain.
// Beginners can update the default model here without hunting through UI code.
export const OLLAMA_API_URL = 'http://localhost:11434/api/generate'

// Change this constant if you want to teach with a different local model.
export const DEFAULT_MODEL = 'llama3'

// These examples match the models requested in the tutorial brief.
export const MODEL_OPTIONS = ['llama3', 'mistral', 'qwen']

// Starter prompts help first-time users verify that the integration works.
export const EXAMPLE_PROMPTS = [
  'Explain React hooks simply.',
  'What does Ollama do in a local AI application?',
  'Give me three beginner prompt engineering tips.',
]

// Friendly error text keeps the service logic focused on the technical behavior.
export const ERROR_MESSAGES = {
  emptyPrompt: 'Please enter a prompt before sending your message.',
  ollamaOffline:
    'Unable to reach Ollama. Start Ollama with "ollama serve" and try again.',
  missingModel:
    'The selected model may not be installed. Run "ollama pull <model-name>" and try again.',
  generic: 'Something went wrong while contacting Ollama. Please try again.',
}

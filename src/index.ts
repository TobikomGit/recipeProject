import { Hono } from 'hono'
import { GoogleGenAI } from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const app = new Hono()


app.get('/', (c) => { return c.text('Hello Hono!') })
app.get('/api/getrecipe', async (c) => {
  const text = await fce()

  return c.text(text ?? ``)
})


async function fce() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Why is the sky blue?',
  });
  console.log(response.text);

  return response.text
}

export default app
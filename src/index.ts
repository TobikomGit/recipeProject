import { Hono } from 'hono'
import { GoogleGenAI } from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: "AIzaSyD9maWTSpB87rv5KMdkVdJSlPnpYfUUqLU" });
const app = new Hono()


app.get('/', (c) => { return c.text('Hello Hono!') })
app.get('/api/getrecipe', async (c) => {
  const text = await fce()

  return c.text(text ?? ``)
})


async function fce() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Napiš mi prosím recept podle těchto údajů:' + "Pouze z těchto ingrediencí:" + ingredience + "Maximálně o této délce vaření:" + test.cookTime + "Má být pokrm studený:" + test.isCold,
  });
  //console.log(response.text);

  return response.text
}

interface cookData {
  ingredients: ingredient[],
  cookTime: String,
  isCold: Boolean,
}

interface ingredient {
  name: String,
  count: String,
}

const test = {
  ingredients: [
    { name: "brambory", count: "4" },
    { name: "brambory", count: "4" },
    { name: "brambory", count: "4" },
    { name: "brambory", count: "4" },
    { name: "brambory", count: "4" },
  ],
  cookTime: '30 min',
  isCold: false,
}

const ingredience: string | string[] = []
for (let x of test.ingredients) {
  ingredience.push(x.name + ", " + x.count)
}
console.log(ingredience)
console.log(test.cookTime)
console.log(test.isCold)


export default app
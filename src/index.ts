import { Hono } from 'hono'
import { serveStatic } from "hono/bun"
import { GoogleGenAI } from '@google/genai';
import { html } from 'hono/html';

const ai = new GoogleGenAI({ apiKey: "AIzaSyD9maWTSpB87rv5KMdkVdJSlPnpYfUUqLU" });
const app = new Hono()


app.use('/', serveStatic({
  path: "./index.html"
}))
app.post('/api/getrecipe', async (c) => {
  const dataJson = await c.req.json()
  const text = await responseAI(dataJson)

  console.log(text)
  if(text){
    return c.json({recipe: text})
  }
  else{
    return c.json({})
  }
})
app.use()


async function responseAI(data: cookData) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001', 
    contents: `Napiš mi prosím recept podle těchto údajů:

        Pouze z těchto ingrediencí: ${data.ingredients} 

        Maximálně o této délce vaření: ${data.cookTime} 

        Přesně má-li pokrm být studený: ${data.isCold}
        
        Přesně má-li pokrm být bez lepku: ${data.glutenFree}
        
        Přesně má-li pokrm být veganský: ${data.vegan}
        
        Přesně má-li pokrm být vegetarianský: ${data.vegetarian}`,
  });
  

  return response.text
}

interface cookData {
  ingredients: String,
  cookTime: String,
  isCold: String,
  glutenFree: Boolean,
  vegan: Boolean,
  vegetarian: Boolean
}

/*const test = {
  ingredients: [
    { name: "brambory", count: "4 kg" },
    { name: "hovězí maso", count: "1 kg" },
    { name: "česnek", count: "1" },
    { name: "olej", count: "1 l" },
    { name: "sůl", count: "200 g" },
  ],
  cookTime: '30 min',
  isCold: false,
}*/

/*const ingredience: string | string[] = []
for (let x of test.ingredients) {
  ingredience.push(x.name + ", " + x.count)
}
console.log(ingredience)
console.log(test.cookTime)
console.log(test.isCold)*/


export default app
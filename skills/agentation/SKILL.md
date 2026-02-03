---
name: agentation
description: Add Agentation visual feedback toolbar to any React project
---

# Agentation Setup

Set up the Agentation annotation toolbar in this project.

## Requirements

- React 18+
- Zero dependencies beyond React

## Steps

1. **Check if already installed**
   - Look for `agentation` in package.json dependencies
   - If not found, run `npm install agentation` (or pnpm/yarn based on lockfile)

2. **Check if already configured**
   - Search for `<Agentation` or `import { Agentation }` in src/ or app/
   - If found, report that Agentation is already set up and exit

3. **Detect project type**
   - **Next.js App Router**: has `app/layout.tsx` or `app/layout.js`
   - **Next.js Pages Router**: has `pages/_app.tsx` or `pages/_app.js`
   - **Vite + React**: has `vite.config.ts/js` and `src/main.tsx/jsx`
   - **Create React App**: has `src/index.tsx/jsx` or `src/App.tsx/jsx`
   - **Other React projects**: look for main entry file

4. **Add the component**

   **For Next.js App Router**, add to `app/layout.tsx`:
   ```tsx
   import { Agentation } from "agentation";

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           {process.env.NODE_ENV === "development" && <Agentation />}
         </body>
       </html>
     );
   }
   ```

   **For Next.js Pages Router**, add to `pages/_app.tsx`:
   ```tsx
   import { Agentation } from "agentation";

   export default function App({ Component, pageProps }) {
     return (
       <>
         <Component {...pageProps} />
         {process.env.NODE_ENV === "development" && <Agentation />}
       </>
     );
   }
   ```

   **For Vite + React**, add to `src/main.tsx`:
   ```tsx
   import { Agentation } from "agentation";

   ReactDOM.createRoot(document.getElementById('root')!).render(
     <React.StrictMode>
       <App />
       {import.meta.env.DEV && <Agentation />}
     </React.StrictMode>
   );
   ```

   **For Create React App**, add to `src/index.tsx`:
   ```tsx
   import { Agentation } from "agentation";

   const root = ReactDOM.createRoot(document.getElementById('root'));
   root.render(
     <React.StrictMode>
       <App />
       {process.env.NODE_ENV === "development" && <Agentation />}
     </React.StrictMode>
   );
   ```

   **For other React projects**, add to the root component or main entry file:
   ```tsx
   import { Agentation } from "agentation";

   // Add at the end of your root component
   {process.env.NODE_ENV === "development" && <Agentation />}
   ```

5. **Confirm setup**
   - Tell the user to run their dev server and look for the Agentation toolbar (floating button in bottom-right corner)
   - The toolbar should appear in the bottom-right corner of the page

## Notes

- The environment check ensures Agentation only loads in development
- For Vite projects, use `import.meta.env.DEV` instead of `process.env.NODE_ENV`
- For Next.js, use `process.env.NODE_ENV === "development"`
- No additional configuration needed — it works out of the box
- Compatible with any React 18+ project

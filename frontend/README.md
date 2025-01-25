## Library
* antd react UI library
  ```JavaScript
  npm i antd
  ```
* Ant design Icons for React
  ```JavaScript
  npm i @ant-design/icons
  ```
* zustand for state management
  ```JavaScript
  npm i zustand
  ```
## @tanstack/react-query library
``` Bash
npm i @tanstack/react-query
```
* Powerful asynchronous state management for TS/JS, React, Solid, Vue, Svelte and Angular.
* It provides caching capability
* It optimistically update on changes
* Example: Instagram like button - On click, immediately update the like button in red color and behind the scene API call request if response will be successful then button will be red otherwise if we got response and show error, then UI will be revert back and show error to the user. 
``` TypeScript
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
)
```
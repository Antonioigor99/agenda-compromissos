import { ToastContainer } from "react-toastify"
import Home from "./pages/Home.tsx"

function App() {
  return (
    <>
      <div className="bg-gray-400 max-h-full h-dvh w-full m-2 rounded-2xl">
        <Home />
        <ToastContainer />
      </div>

    </>
  )
}

export default App

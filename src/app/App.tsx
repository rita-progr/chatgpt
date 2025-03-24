import {IS_DEV} from "@/shared/const/global.ts";

function App() {

  return (
    <div>
        {IS_DEV ? "dev": "prod"}
    </div>
  )
}

export default App

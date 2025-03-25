import {UserModal} from "@/features/AuthByUserName/ui/UserModal/UserModal.tsx";
import {useCallback, useEffect, useState} from "react";
import {ChatPage} from "pages/ChatPage";

function App() {
const [open, setOpen] = useState(false);

    const onClose = useCallback(() => {
        setOpen(false);
    },[open])

   useEffect(() => {
       setOpen(true);
   },[])

  return (
    <div>
      <UserModal isOpen={open} onClose={onClose}/>
        <ChatPage/>
    </div>
  )
}

export default App

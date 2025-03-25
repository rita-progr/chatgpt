import {UserModal} from "@/features/AuthByUserName/ui/UserModal/UserModal.tsx";
import {useCallback, useEffect, useState} from "react";

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
    </div>
  )
}

export default App

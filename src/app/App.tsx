import {UserModal} from "@/features/AuthByUserName/ui/UserModal/UserModal.tsx";
import {useCallback, useEffect, useState} from "react";
import {ChatPage} from "pages/ChatPage";
import {userActions} from "@/entities/User";
import {useAppDispatch} from "@/shared/lib/hooks/appDispatch/appDispatch.ts";
import {USER_LOCALSTORAGE_KEY} from "@/shared/const/global.ts";

function App() {
const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(userActions.initAuthData())
    },[dispatch])

    const onClose = useCallback(() => {
        setOpen(false);
    },[open])

   useEffect(() => {
       setOpen(true);
   },[])
    const init = localStorage.getItem(USER_LOCALSTORAGE_KEY)

    if(!init){
        return <UserModal isOpen={open} onClose={onClose}/>
    }

  return (
      <div>
          <ChatPage/>
      </div>
  )
}

export default App

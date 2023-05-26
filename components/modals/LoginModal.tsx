import useLoginModal from "@/hooks/useLogionModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Input from "../input";
import Modal from "../Modal";

const LoginModal = () => {
    const LoginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback( async()=>{
        try {
            setIsLoading(true);
            // todo when login

            await signIn('credentials', { email, password })
            // console.log('login');
            toast.success('Login success')
            LoginModal.onClose()
        }catch(err:any){
            console.log(err); 
        }finally{
            setIsLoading(false)
        }
    },[LoginModal, email, password])

    const onToggle = useCallback(()=>{
        if(isLoading){
            return;
        }
        LoginModal.onClose()
        registerModal.onOpen()
    },[isLoading, registerModal, LoginModal])


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} disabled={isLoading} />
            <Input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} disabled={isLoading} />
            
        </div>
    )
    
    const footerContent = (
        <div  className="text-neutral-400 text-center mt-4">
            <p>
                Firstime using Twittah? 
                <span onClick={onToggle} className="text-white cursor-pointer hover:underline pl-2">
                    Create an account
                </span>
            </p>
        </div>
    )
    return (  
        <Modal disabled={isLoading} isOpen={LoginModal.isOpen} title='Login' actionLabel="Sign in" onClose={LoginModal.onClose} onSubmit={onSubmit}
        body={bodyContent} footer={footerContent} />
     );
}
 
export default LoginModal;
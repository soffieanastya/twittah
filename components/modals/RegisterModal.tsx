import useLoginModal from "@/hooks/useLogionModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import {toast} from "react-hot-toast";
import { signIn } from "next-auth/react";
import Input from "../input";
import Modal from "../Modal";

const RegisterModal = () => {
    const LoginModal = useLoginModal()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const registerModal = useRegisterModal()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')

    const onToggle = useCallback(()=>{
        if(isLoading){
            return;
        }
        registerModal.onClose()
        LoginModal.onOpen()
    },[isLoading, registerModal, LoginModal])

    const onSubmit = useCallback(async()=>{
        try {
            setIsLoading(true);
            // todo add register nlogin

            await axios.post('/api/register', {email, password, username, name})
            // console.log(name,'name');
            
            toast.success('Account created')

            signIn('credentials', {
                email, 
                password
            })

            registerModal.onClose()
        }catch(err:any){
            console.log(err); 
            toast.error('Something went wrong')
        }finally{
            setIsLoading(false)
        }
    },[LoginModal, email, password, username, name])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} disabled={isLoading} />
            <Input placeholder="Name" onChange={(e)=>setName(e.target.value)} value={name} disabled={isLoading} />
            <Input placeholder="Username" onChange={(e)=>setUsername(e.target.value)} value={username} disabled={isLoading} />
            <Input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} disabled={isLoading} />
            
        </div>
    )

    const footerContent = (
        <div onClick={onToggle} className="text-neutral-400 text-center mt-4">
            <p>
                Already have an account?
                <span onClick={onToggle} className="text-white cursor-pointer hover:underline pl-2">
                    Sign In
                </span>
            </p>
        </div>
    )

    return (  
        <Modal disabled={isLoading} isOpen={registerModal.isOpen} title='Create an account' actionLabel="Register" onClose={registerModal.onClose} onSubmit={onSubmit}
        body={bodyContent} footer={footerContent} />
     );
}
 
export default RegisterModal;
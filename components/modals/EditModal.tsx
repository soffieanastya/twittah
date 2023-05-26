import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ImageUpload from "../ImageUpload";
import Input from "../input";
import Modal from "../Modal";

const EditModal = () => {
    const { data: currentUser } = useCurrentUser()
    const { mutate: mutateFetchUser } = useUser(currentUser?.id)
    const editModal = useEditModal()

    const [profileImage, setProfileImage] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')

    useEffect(()=>{
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage)
        setName(currentUser?.name)
        setUsername(currentUser?.username)
        setBio(currentUser?.bio)
    },[currentUser])

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async()=>{
        try {
            setIsLoading(true)

            await axios.patch('/api/edit', {
                profileImage, coverImage, name, username, bio
            })

            mutateFetchUser(); //recall user login again

            toast.success("Profile updated!")

            editModal.onClose()
        }catch(err){
            toast.error("Edit profile failed")
        }finally{
            setIsLoading(false)
        }
    },[bio, name, username, profileImage, coverImage, editModal, mutateFetchUser])

    const body = (
        <div className="flex flex-col gap-4">
            <ImageUpload value={profileImage} disabled={isLoading} onChange={(image)=>setProfileImage(image) } label="Upload profile image"/>
            <ImageUpload value={coverImage} disabled={isLoading} onChange={(image)=>setCoverImage(image) } label='Upload cover image' />
            <Input placeholder="Name" onChange={(e)=>setName(e.target.value)} value={name} disabled={isLoading}  />
            <Input placeholder="Username" onChange={(e)=>setUsername(e.target.value)} value={username} disabled={isLoading}  />
            <Input placeholder="Bio" onChange={(e)=>setBio(e.target.value)} value={bio} disabled={isLoading}  />
        </div>
    )
    return ( 
        <Modal disabled={isLoading} isOpen={editModal.isOpen} 
            title='Edit profile' actionLabel="Save" onClose={editModal.onClose}
            onSubmit={onSubmit} body={body}  />
     );
}
 
export default EditModal;
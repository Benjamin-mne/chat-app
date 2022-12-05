import { BsThreeDots } from 'react-icons/bs'
import './chat.css';

import { Messages } from './Messages';
import { Input } from './Input'
import { useContext } from 'react';
import { ChatContext } from "../context/ChatContext";
import { useState } from 'react';
import { MdLogout } from 'react-icons/md'

//Firebase
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'


export const Chat = () => {
  const { data } = useContext(ChatContext);
  const [open, setOpen] = useState(false);

  return (
    <div className='chat' >
      <div className="chat__info">
        <span>{data.user?.displayName}</span>
        <div className="chat__icons">
          <BsThreeDots className='chat__icon' onClick={() => setOpen(!open)} />
          <div className={open ? 'chat__menu open' : 'chat__menu close'} onClick={() => signOut(auth)}>
            <MdLogout className='navbar__logout' />LogOut
          </div>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

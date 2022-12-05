import { Chats } from './Chats'
import { Navbar } from './Navbar'
import { Search } from './Search'
import './sidebar.css'

export const SideBar = () => {
  return (
    <div className='sidebar'>
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  )
}

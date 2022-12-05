import { SideBar } from '../../components/SideBar'
import { Chat } from '../../components/Chat'
import './home.css'

export const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <SideBar/>
        <Chat/>
      </div>
    </div>
  )
}

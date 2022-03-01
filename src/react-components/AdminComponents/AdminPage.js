import { getDefaultNormalizer } from '@testing-library/react'
import './AdminPage.css'
import UserInfo from './UserInfo/UserInfo'
import BlackList from './BlackList/BlackList'
import picture1 from '../ReviewComponents/Comments/logo.svg'
import picture2 from '../ReviewComponents/Comments/uoft.jpg'
import picture3 from './Waterloo_icon.png'

function AdminPage(){
    const state = {
        users: [
            {userName: 'nugget', displayName: 'ILikeNugget', profilePicture: picture1, email: 'nugget@yahoo.com', phone: '123-123-1122'},
            {userName: 'UofT', displayName: 'University of Toronto', profilePicture: picture2, email: 'uoft@yahoo.com', phone: '321-321-3232'},
        ],
        blacklist: [{userName:'dragonTamer', displayName:'badperson', profilePicture: picture3}]
    }

    const userInfo = state.users.map((u) => <UserInfo userName={u.userName} displayName={u.displayName} 
    profilePicture={u.profilePicture} email={u.email} phone={u.phone} />)

    const blacklist = state.blacklist.map((u) => <BlackList userName={u.userName} displayName={u.displayName} profilePicture={u.profilePicture} />)
    
    return(
        <div>
            <div className='userHeader'>Users</div>
            <div>{userInfo}</div>
            <div className='blackListHeader'>Blacklist</div>
            <div>{blacklist}</div>
        </div>
    );
}

export default AdminPage;
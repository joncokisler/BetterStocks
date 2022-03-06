import React, {useEffect, useState} from 'react'
import { getDefaultNormalizer } from '@testing-library/react'
import './AdminPage.css'
import UserInfo from './UserInfo/UserInfo'
import BlackList from './BlackList/BlackList'
import picture1 from '../ReviewComponents/Comments/logo.svg'
import picture2 from '../ReviewComponents/Comments/uoft.jpg'
import picture3 from './Waterloo_icon.png'
import NavBar from '../navbar/Navbar'

function AdminPage(){
    const state = {
        users: [
            {userName: 'user', displayName: 'user', profilePicture: picture1, email: 'user@yahoo.com', phone: '123-123-1122'}],
        blacklist: []   
    }

    const [userInfo, setUserInfo] = useState();
    const [blacklistInfo, setBlacklistInfo] = useState();


    function handleAdd(userName) {
        let temp = {}
        for (let i = 0; i < state.users.length; i++){
            if(state.users[i]["userName"] == userName){
                temp = state.users.splice(i, 1)
                state.blacklist.push(temp[0])
                break
            }
        }
        updateUserInfo()
        updateBlackListInfo()
    }

    function handleRemove(userName) {
        let temp = {}
        for (let i = 0; i < state.blacklist.length; i++){
            if(state.blacklist[i]["userName"] == userName){
                temp = state.blacklist.splice(i, 1)
                state.users.push(temp[0])
                break
            }
        }
        updateUserInfo()
        updateBlackListInfo()
    }

    function updateUserInfo(){
        setUserInfo(state.users.map((u) => <UserInfo parentCallBack = {handleAdd} userName={u.userName} displayName={u.displayName} 
        profilePicture={u.profilePicture} email={u.email} phone={u.phone} />))
    }

    function updateBlackListInfo(){
        setBlacklistInfo(state.blacklist.map((u) => <BlackList parentCallBack = {handleRemove}
        userName={u.userName} displayName={u.displayName} 
        profilePicture={u.profilePicture} email={u.email} phone={u.phone} />))
    }

    useEffect(() =>{
        updateUserInfo()
        updateBlackListInfo()
    }, [])
    
    return(
        <div>
            {<NavBar />}
            <div className='userHeader'>Users</div>
            <div className='userContainer'>
                {userInfo}
            </div>
            <div className='blackListHeader'>Blacklist</div>
            <div className='blacklistContainer'>
                {blacklistInfo}
            </div>
        </div>
    );
}

export default AdminPage;
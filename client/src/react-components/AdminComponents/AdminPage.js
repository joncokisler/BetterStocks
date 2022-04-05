import React, {useEffect, useState} from 'react'
import { uid } from 'react-uid';
import './AdminPage.css'
import UserInfo from './UserInfo/UserInfo'
import BlackList from './BlackList/BlackList'
import { editUserInfo, editBlacklist, updateUserList } from '../../actions/admin';

function AdminPage(){

    const [userInfo, setUserInfo] = useState();
    const [blacklistInfo, setBlacklistInfo] = useState();

    const [users, setUsers] = useState();
    const [blacklist, setBlacklist] = useState()

    useEffect(() => {
        updateUserList(setUsers, setBlacklist)
    }, [])

    useEffect(() => {
        updateUserInfo()
        updateBlacklistInfo()
    }, [users, blacklist])
    
    function handleAdd(userName) {
        editBlacklist(userName, true, setUsers, setBlacklist)

        updateUserInfo()
        updateBlacklistInfo()
    }

    function handleUpdate(userName, displayName, email, phone, coins){
        editUserInfo(userName, displayName, email, phone, coins, setUsers, setBlacklist)

        updateUserInfo()
        updateBlacklistInfo()
    }

    function handleRemove(userName) {
        editBlacklist(userName, false, setUsers, setBlacklist)

        updateUserInfo()
        updateBlacklistInfo()
    }

    function updateUserInfo(){
        // setUserInfo(users.map((u) => <UserInfo key={ uid(u) } parentCallBack = {handleAdd} parentUpdate={handleUpdate}
        // userName={u.username} displayName={u.displayName} email={u.email} phone={u.phoneNumber} 
        // coins = {u.betterCoins} />))

    }

    function updateBlacklistInfo(){
        // setBlacklistInfo(blacklistInfo.map((u) => <UserInfo key={ uid(u) } parentCallBack = {handleRemove}
        // userName={u.username} displayName={u.displayName} email={u.email} phone={u.phoneNumber} 
        // coins = {u.betterCoins} />))

    }
    return(
        <div>
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
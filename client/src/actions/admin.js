'use strict';
import ENV from './../config.js';
const API_HOST = ENV.api_host;

export function editUserInfo(username, displayName, email, phoneNumber, betterCoins, setUsers, setBlacklist){
    const req = new Request(`${API_HOST}/api/users/${username}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify([
            {
                op: "replace",
                path: "/displayName",
                value: displayName,
            },
            {
                op: "replace",
                path: "/email",
                value: email,
            },
            {
                op: "replace",
                path: "/phone",
                value: phoneNumber,
            },
            {
                op: "replace",
                path: "/betterCoins",
                value: betterCoins,
            }
        ])})
    fetch(req).then(updateUserList(setUsers, setBlacklist))
}

export function editBlacklist(username, bool, setUsers, setBlacklist) {
    const req = new Request(`${API_HOST}/api/users/${username}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify([
            {
                op: "replace",
                path: "/blacklist",
                value: bool,
            }
        ])})
    fetch(req).then(updateUserList(setUsers, setBlacklist))
}

export function updateUserList(setUsers, setBlacklist){
    const req = new Request(`${API_HOST}/api/users/`, {method: "GET"});
    fetch(req)
        .then(res => {
            if (res.status === 200) {
                console.log('here')
                return res.json();
            } else {
                console.log(res)
                return null;
            }
        })
        .then(json => {
            let userlist = []
            let blacklist = []
            for(let i = 0; i < Object.keys(json).length; i++){
                if (json[i].blacklist == true){
                    blacklist.push(json[i])
                }else{
                    userlist.push(json[i])
                }
            }
            console.log(userlist)
            setUsers(userlist)
            setBlacklist(blacklist)
        })
}
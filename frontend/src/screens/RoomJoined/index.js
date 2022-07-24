import React from 'react';

import Room from './Room';
import ClientRoom from './ClientRoom';
import Sidebar from '../../components/Sidebar';


const RoomJoined = ({ userNo ,users, user, socket, setUsers, setUserNo   }) => {

    return (
       <>
            <Sidebar users={users} user={user} socket={socket} />

            {user.presenter ? (
                <Room
                    user={user}
                    userNo={userNo}
                    socket={socket}
                    setUsers={setUsers}
                    setUserNo={setUserNo}
                />
            ) : (
                <ClientRoom
                    user={user}
                    userNo={userNo}
                    socket={socket}
                    setUsers={setUsers}
                    setUserNo={setUserNo}
                />
            )}

        </>
    );
}

export default RoomJoined;

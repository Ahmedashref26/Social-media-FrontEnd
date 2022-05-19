import { io } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { createContext, useEffect, useRef, useState } from 'react';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
  }, []);

  useEffect(() => {
    user && socket.current.emit('addUser', user._id);
    socket.current
      .off('getUsers')
      .on('getUsers', (users) => setOnlineUsers(users));
  }, [socket, user]);

  return (
    <SocketContext.Provider
      value={{ socket: socket.current, onlineUsers, userId: user?._id }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;

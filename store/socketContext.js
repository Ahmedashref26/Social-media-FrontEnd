import { io } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { createContext, useEffect, useRef } from 'react';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const socket = useRef();

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    user && socket.current.emit('addUser', user._id);
  }, []);

  // console.log(socket.current);

  // if (socket.current)
  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;

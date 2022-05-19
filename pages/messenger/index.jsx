import { getSession, useSession } from 'next-auth/react';
import { useEffect, useRef, useState, useContext } from 'react';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import Conversation from '../../components/Conversation/Conversation';
import Message from '../../components/Message/Message';
import Navbar from '../../components/Navbar/Navbar';
import styles from '../../styles/Messenger.module.scss';
// import { io } from 'socket.io-client';
import { getConversations, getMessages, sendMessage } from '../../util/API';
// import { socket } from '../../util/socket';
import SocketContext from '../../store/socketContext';
import { Send } from '@mui/icons-material';

const MessengerPage = ({ user }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const socket = useRef();
  const socket = useContext(SocketContext);
  const scrollRef = useRef();

  useEffect(() => {
    console.log(socket);
    // establish socket connection
    // socket.current = io('ws://localhost:8900');
    //get message from socket server
    // socket.current.on('getMessage', (msg) => setArrivalMessage(msg));
    socket.on('getMessage', (msg) => setArrivalMessage(msg));
    socket.on('getUsers', (users) => {
      setOnlineUsers(users);
    });
    //get all conversations
    getConversations().then((conv) => setConversations(conv));
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members
        .map((m) => m._id)
        .includes(arrivalMessage.sender._id) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   // socket.current.emit('addUser', user._id);
  //   // socket.current.on('getUsers', (users) => {
  //   socket.emit('addUser', user._id);
  //   socket.on('getUsers', (users) => {
  //     setOnlineUsers(users);
  //   });
  // }, []);

  useEffect(() => {
    if (currentChat) {
      getMessages(currentChat._id).then((msgs) => setMessages(msgs));
    }
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      conversation: currentChat._id,
      text: newMessage,
    };

    const receiver = currentChat.members.find(
      (member) => member._id !== user._id
    );

    sendMessage(message).then((msg) => {
      setMessages([...messages, msg]);
      // send message to socket server
      // socket.current.emit('sendMessage', {
      socket.emit('sendMessage', {
        ...msg,
        receiverId: receiver._id,
      });
    });
    setNewMessage('');
  };
  return (
    <>
      <Navbar user={user} />
      <div className={styles.messenger}>
        <div className={styles.chatMenu}>
          <div className={styles.chatMenuWrapper}>
            <input
              placeholder='Search for friends'
              className={styles.chatMenuInput}
            />
            {conversations.map((conv) => (
              <div key={conv._id} onClick={() => setCurrentChat(conv)}>
                <Conversation conversation={conv} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.chatBox}>
          <div className={styles.chatBoxWrapper}>
            {currentChat ? (
              <>
                <div className={styles.chatBoxTop}>
                  {messages.map((msg) => (
                    <div key={msg._id} ref={scrollRef}>
                      <Message
                        message={msg}
                        own={msg.sender._id === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.chatBoxBottom}>
                  <textarea
                    className={styles.chatMessageInput}
                    placeholder='write something...'
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className={styles.chatSubmitButton}
                    onClick={handleSubmit}
                  >
                    Send
                    <Send />
                  </button>
                </div>
              </>
            ) : (
              <span className={styles.noConversationText}>
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        {/* <div className={styles.chatOnline}>
          <div className={styles.chatOnlineWrapper}>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      user: session.user,
    },
  };
};

export default MessengerPage;

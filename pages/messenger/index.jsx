import { getSession, useSession } from 'next-auth/react';
import { useEffect, useRef, useState, useContext } from 'react';
import Conversation from '../../components/Conversation/Conversation';
import Message from '../../components/Message/Message';
import Navbar from '../../components/Navbar/Navbar';
import styles from '../../styles/Messenger.module.scss';
import { getConversations, getMessages, sendMessage } from '../../util/API';
import SocketContext from '../../store/socketContext';
import { Send } from '@mui/icons-material';
import { Router, useRouter } from 'next/router';
import Head from 'next/head';

const MessengerPage = ({ user }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { socket } = useContext(SocketContext);
  const scrollRef = useRef();
  const router = useRouter();

  useEffect(() => {
    //get all conversations
    getConversations().then((conv) => setConversations(conv));

    if (router.query.conv) {
      const conv = JSON.parse(router.query.conv);
      setCurrentChat(conv);
      router.replace('/messenger');
    }
  }, []);

  useEffect(() => {
    //get message from socket server
    socket &&
      socket
        .off('getMessage')
        .on('getMessage', (msg) => setArrivalMessage(msg));
  }, [socket]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members
        .map((m) => m._id)
        .includes(arrivalMessage.sender._id) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

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
      socket.emit('sendMessage', {
        ...msg,
        receiverId: receiver._id,
      });
    });
    setNewMessage('');
  };
  return (
    <>
      <Head>
        <title>Go Social | Messenger</title>
      </Head>
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

import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import { loadJSON, saveJSON, CHATS_KEY } from './storage';

const MY_AVATAR = '/assets/531659084725809380eb9df01c979e1eb5297be0.png';
const JOHN_AVATAR = '/assets/3e05efd5fff6945db3b37b7ebb76428a71420582.png';

const CHATS: Record<string, { name: string; event: string; status: string; color: string; avatar?: string }> = {
  '1': { name: 'John Isner | Munich', event: 'Wimbledon 1st Round 2023', status: "You're going to this event", color: '#007860', avatar: JOHN_AVATAR },
  '2': { name: 'Ayla Dimitri | Munich', event: 'Champions League Final', status: "You're going to this event", color: '#1d4ed8' },
  '3': { name: 'Amanda Rigby | Munich', event: 'Formula One Monaco 2023', status: 'You went to this event', color: '#b45309' },
  '4': { name: 'Oza Rangkuti | Jakarta', event: 'NBA Finals Game 7', status: 'You went to this event', color: '#7c3aed' },
  '5': { name: 'Adjis Doa Ibu | Jakarta', event: 'Stand up Fest 2023', status: 'You went to this event', color: '#15803d' },
  '6': { name: 'Aruna Dewi | Munich', event: 'Thomas Cup 2023', status: "You're going to this event", color: '#007860' },
  '7': { name: 'Geraldo | Jakarta', event: 'Girls Only: FIFA WC Final', status: 'You went to this event', color: '#dc2626' },
};

type Message = { id: number; text: string; fromMe: boolean; time: string };

// Seed conversations. John (id 1) has the Figma frame 1.30 chat; others start empty.
const SEED: Record<string, Message[]> = {
  '1': [
    { id: 1, text: 'Hi John, is the event still take place for tomorrow?', fromMe: true, time: '9:35 am' },
    { id: 2, text: 'Hi Imani, yes it’s still happening tomorow. 😊', fromMe: false, time: '8:05 am' },
    { id: 3, text: 'Great! And do I need to pay you now?', fromMe: true, time: '9:35 am' },
    { id: 4, text: 'You can pay me later once the match is finished. I prefer to pay through Paypal, btw.', fromMe: false, time: '8:05 am' },
    { id: 5, text: 'Alright, I’ll see you tomorrow then.', fromMe: true, time: '9:35 am' },
    { id: 6, text: 'Bye!', fromMe: true, time: '9:35 am' },
  ],
};

// Store so each chat keeps its own history, persisted to localStorage across refreshes.
const conversationStore: Record<string, Message[]> = {};
function getMessages(chatId: string): Message[] {
  if (!conversationStore[chatId]) {
    const persisted = loadJSON<Record<string, Message[]>>(CHATS_KEY, {});
    conversationStore[chatId] = persisted[chatId] ?? (SEED[chatId] ? [...SEED[chatId]] : []);
  }
  return conversationStore[chatId];
}
function persistMessages(chatId: string, msgs: Message[]) {
  conversationStore[chatId] = msgs;
  const persisted = loadJSON<Record<string, Message[]>>(CHATS_KEY, {});
  saveJSON(CHATS_KEY, { ...persisted, [chatId]: msgs });
}

function StatusBar() {
  return (
    <div style={{ position: 'absolute', top: 11, left: 12, right: 0, height: 15, overflow: 'hidden', zIndex: 10 }}>
      <div style={{ position: 'absolute', left: 0, top: 1, height: 14, width: 84, overflow: 'hidden' }}>
        <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', fontSize: 12, fontWeight: 400, color: '#030303', whiteSpace: 'nowrap' }}>Tsel</span>
        <img src="/assets/4e32eb6c77b4c639a6a5bf754ab0e24414d70175.svg" alt="" style={{ position: 'absolute', top: '7.14%', left: 0, bottom: '21.43%', width: '17.86%', height: '71.43%' }} />
        <img src="/assets/77b158f52252216a70b8544a0b377b107f01038d.svg" alt="" style={{ position: 'absolute', top: '7.14%', left: '83.33%', bottom: '21.43%', right: 0, height: '71.43%' }} />
      </div>
      <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', height: 15, width: 72, overflow: 'hidden' }}>
        <img src="/assets/35c6012564d77c53cc9ab8ef9c73b68aec493f0c.svg" alt="" style={{ position: 'absolute', left: 0.5, top: 2, width: 6, height: 10 }} />
        <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', height: 15, width: 63, overflow: 'hidden' }}>
          <span style={{ position: 'absolute', right: '47.62%', top: '50%', transform: 'translateY(-50%)', fontSize: 12, fontWeight: 400, color: '#030303', textAlign: 'right' }}>100%</span>
          <img src="/assets/68c46f4c007b927c51c5ed47fae81ad30b923944.svg" alt="" style={{ position: 'absolute', top: '10%', left: '57.14%', bottom: '13.33%', right: '0.79%' }} />
        </div>
      </div>
    </div>
  );
}

// 32px message avatar — photo if available, else colored initial
function MsgAvatar({ src, color, letter }: { src?: string; color: string; letter: string }) {
  return (
    <div style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #9fa2a0', overflow: 'hidden', flexShrink: 0, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {src
        ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <span style={{ fontSize: 13, color: 'white', fontWeight: 600 }}>{letter}</span>}
    </div>
  );
}

export default function ChatConversationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const chatId = id ?? '1';
  const chat = CHATS[chatId] ?? CHATS['1'];
  const [messages, setMessages] = useState<Message[]>(() => getMessages(chatId));
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    const now = new Date();
    const h = now.getHours() % 12 || 12;
    const time = `${h}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() < 12 ? 'am' : 'pm'}`;
    const next = [...messages, { id: messages.length + 1, text, fromMe: true, time }];
    persistMessages(chatId, next);
    setMessages(next);
    setInput('');
  }

  return (
    <div className="w-[390px] bg-white relative" style={{ height: 880, overflow: 'hidden', fontFamily: "'Roboto', sans-serif" }}>
      <StatusBar />

      {/* Header */}
      <div style={{ position: 'absolute', top: 38, left: 0, right: 0, display: 'flex', alignItems: 'flex-end', gap: 12, padding: '0 20px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, alignSelf: 'center' }}>
          <img src="/assets/a59b32806f2c2ec3c42df101c476fdc775f5247c.svg" alt="back" style={{ width: 20, height: 20 }} />
        </button>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: chat.color, flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {chat.avatar
            ? <img src={chat.avatar} alt={chat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ fontSize: 20, color: 'white', fontWeight: 600 }}>{chat.name[0]}</span>}
        </div>
        <div style={{ flex: 1, textAlign: 'left', paddingBottom: 2 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#191c1b', lineHeight: '20px' }}>{chat.name}</p>
          <p style={{ margin: '1px 0 0', fontSize: 12, color: '#3f4944', lineHeight: '16px' }}>{chat.event}</p>
          <p style={{ margin: '1px 0 0', fontSize: 12, color: chat.status.includes('going') ? '#006b56' : '#6f7975', lineHeight: '16px' }}>{chat.status}</p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ position: 'absolute', top: 148, left: 0, right: 0, height: 1, background: '#e8ece9' }} />

      {/* Messages */}
      <div style={{ position: 'absolute', top: 157, left: 0, right: 0, bottom: 150, overflowY: 'auto', padding: '16px 20px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', justifyContent: msg.fromMe ? 'flex-end' : 'flex-start', marginBottom: 16 }}>
            {!msg.fromMe && <MsgAvatar src={chat.avatar} color={chat.color} letter={chat.name[0]} />}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: msg.fromMe ? 'flex-end' : 'flex-start', maxWidth: 260 }}>
              <div style={{
                padding: 12,
                background: msg.fromMe ? '#7ef8d4' : '#fafafa',
                borderRadius: msg.fromMe ? '8px 0px 8px 8px' : '0px 8px 8px 8px',
                color: msg.fromMe ? '#000000' : '#212121',
                fontSize: 14, lineHeight: msg.fromMe ? '20px' : '18px',
              }}>
                {msg.text}
              </div>
              <span style={{ fontSize: 12, color: msg.fromMe ? '#2e312f' : '#9e9e9e' }}>{msg.time}</span>
            </div>
            {msg.fromMe && <MsgAvatar src={MY_AVATAR} color="#e67e22" letter="I" />}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Message input — green + outside, pill with green smiley */}
      <div style={{ position: 'absolute', bottom: 90, left: 20, right: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#006b56" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v8M8 12h8" strokeLinecap="round" />
          </svg>
        </button>
        <div style={{ flex: 1, height: 44, background: '#f0f4f1', borderRadius: 22, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message"
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 14, color: '#191c1b' }}
          />
          <button onClick={sendMessage} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, display: 'flex' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#006b56" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M8.5 14s1.3 2 3.5 2 3.5-2 3.5-2" strokeLinecap="round" />
              <path d="M9 9.5v.5M15 9.5v.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <BottomNav active="Chats" />
    </div>
  );
}

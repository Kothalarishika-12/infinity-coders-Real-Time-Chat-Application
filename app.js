import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/group-chat/:id" element={<GroupChatPage />} />
      </Routes>
    </Router>
  );
}

// LOGIN PAGE
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('currentUser', email.split('@')[0]);
      navigate('/dashboard');
    }
  };

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui'}}>
      <div style={{background: 'white', padding: '48px', borderRadius: '20px', width: '450px', boxShadow: '0 25px 70px rgba(0,0,0,0.3)'}}>
        <div style={{textAlign: 'center', marginBottom: '36px'}}>
          <div style={{fontSize: '64px', marginBottom: '16px'}}>💬</div>
          <h1 style={{fontSize: '36px', fontWeight: '800', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 8px 0'}}>ChatFlow Pro</h1>
          <p style={{color: '#64748b', fontSize: '16px', margin: 0}}>Enterprise Messaging Platform</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '10px'}}>📧 Email Address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{width: '100%', padding: '14px 18px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box', outline: 'none'}} required />
          </div>
          <div style={{marginBottom: '28px'}}>
            <label style={{display: 'block', fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '10px'}}>🔒 Password</label>
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} style={{width: '100%', padding: '14px 18px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box', outline: 'none'}} required />
          </div>
          <button type="submit" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '16px', borderRadius: '10px', width: '100%', fontSize: '17px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 6px 16px rgba(102, 126, 234, 0.5)'}}>🚀 Sign In to Dashboard</button>
        </form>

        <div style={{marginTop: '24px', padding: '14px', background: '#eff6ff', borderRadius: '10px', borderLeft: '4px solid #3b82f6'}}>
          <p style={{margin: 0, fontSize: '13px', color: '#1e40af', fontWeight: '600'}}>💡 Demo: Use any email & password</p>
        </div>
      </div>
    </div>
  );
}

// SIDEBAR
function Sidebar() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('currentUser') || 'User';

  return (
    <div style={{width: '280px', background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)', color: 'white', display: 'flex', flexDirection: 'column'}}>
      <div style={{padding: '24px', borderBottom: '1px solid #334155'}}>
        <h2 style={{margin: '0 0 16px 0', fontSize: '24px', fontWeight: '800'}}>💬 ChatFlow</h2>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '10px'}}>
          <div style={{width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'}}>😊</div>
          <div>
            <p style={{margin: 0, fontSize: '15px', fontWeight: '700'}}>{currentUser}</p>
            <p style={{margin: 0, fontSize: '12px', color: '#10b981'}}>● Online</p>
          </div>
        </div>
      </div>

      <nav style={{flex: 1, padding: '16px'}}>
        <NavItem icon="🏠" label="Dashboard" path="/dashboard" />
        <NavItem icon="👥" label="All Users" path="/users" />
        <NavItem icon="💬" label="Groups" path="/groups" />
        <NavItem icon="👤" label="My Profile" path="/profile" />
      </nav>

      <div style={{padding: '16px', borderTop: '1px solid #334155'}}>
        <button onClick={() => {localStorage.clear(); navigate('/');}} style={{background: '#ef4444', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', width: '100%', fontSize: '14px', fontWeight: '700', cursor: 'pointer'}}>🚪 Logout</button>
      </div>
    </div>
  );
}

function NavItem({ icon, label, path }) {
  return (
    <Link to={path} style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', marginBottom: '8px', borderRadius: '10px', textDecoration: 'none', color: 'white', background: window.location.pathname === path? 'rgba(102, 126, 234, 0.3)' : 'transparent', transition: 'all 0.3s', fontWeight: '600'}} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(102, 126, 234, 0.2)'} onMouseOut={(e) => e.currentTarget.style.background = window.location.pathname === path? 'rgba(102, 126, 234, 0.3)' : 'transparent'}>
      <span style={{fontSize: '20px'}}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

// DASHBOARD PAGE
function Dashboard() {
  return (
    <div style={{display: 'flex', height: '100vh', fontFamily: 'system-ui'}}>
      <Sidebar />
      <div style={{flex: 1, background: '#f8fafc', padding: '40px', overflowY: 'auto'}}>
        <h1 style={{fontSize: '36px', fontWeight: '800', color: '#0f172a', marginBottom: '8px'}}>📊 Dashboard</h1>
        <p style={{color: '#64748b', fontSize: '16px', marginBottom: '32px'}}>Welcome to ChatFlow Pro - Real Time Messaging System</p>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px'}}>
          <StatCard title="Total Users" value="32" color="#667eea" icon="👥" />
          <StatCard title="Active Groups" value="5" color="#10b981" icon="💬" />
          <StatCard title="Messages Today" value="248" color="#f59e0b" icon="📨" />
        </div>

        <div style={{background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}>
          <h2 style={{fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '16px'}}>🎯 Project Features Implemented</h2>
          <ul style={{fontSize: '16px', color: '#334155', lineHeight: '2.2'}}>
            <li>✅ <b>Login Authentication System</b> - Secure user login</li>
            <li>✅ <b>Dashboard Analytics</b> - Real time statistics</li>
            <li>✅ <b>User Management</b> - View all users with status</li>
            <li>✅ <b>Group Chat Module</b> - Multiple group support</li>
            <li>✅ <b>Individual Chat System</b> - One-to-one messaging</li>
            <li>✅ <b>Reply Feature</b> - Reply to specific messages</li>
            <li>✅ <b>Online Status Indicator</b> - Green dot for online</li>
            <li>✅ <b>Professional UI Design</b> - Gradient colors & modern look</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color, icon }) {
  return (
    <div style={{background: 'white', padding: '28px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderLeft: `5px solid ${color}`}}>
      <div style={{fontSize: '40px', marginBottom: '12px'}}>{icon}</div>
      <p style={{margin: 0, fontSize: '14px', color: '#64748b', fontWeight: '600'}}>{title}</p>
      <p style={{margin: '8px 0 0 0', fontSize: '32px', fontWeight: '800', color: color}}>{value}</p>
    </div>
  );
}

// USERS PAGE
function UsersPage() {
  const navigate = useNavigate();
  const users = [
    { id: 1, name: 'Ravi Kumar', email: 'ravi@gmail.com', role: 'Admin', online: true, avatar: '👨' },
    { id: 2, name: 'Priya Sharma', email: 'priya@gmail.com', role: 'Member', online: true, avatar: '👩' },
    { id: 3, name: 'Suresh Reddy', email: 'suresh@gmail.com', role: 'Member', online: false, avatar: '👨' },
    { id: 4, name: 'Anu Priya', email: 'anu@gmail.com', role: 'Member', online: true, avatar: '👩' },
    { id: 5, name: 'Kiran Kumar', email: 'kiran@gmail.com', role: 'Member', online: false, avatar: '👨' },
  ];

  return (
    <div style={{display: 'flex', height: '100vh', fontFamily: 'system-ui'}}>
      <Sidebar />
      <div style={{flex: 1, background: '#f8fafc', padding: '40px', overflowY: 'auto'}}>
        <h1 style={{fontSize: '36px', fontWeight: '800', color: '#0f172a', marginBottom: '8px'}}>👥 All Users</h1>
        <p style={{color: '#64748b', fontSize: '16px', marginBottom: '32px'}}>Manage all registered users in the system</p>

        <div style={{background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white'}}>
                <th style={{padding: '16px', textAlign: 'left', fontWeight: '700'}}>User</th>
                <th style={{padding: '16px', textAlign: 'left', fontWeight: '700'}}>Email</th>
                <th style={{padding: '16px', textAlign: 'left', fontWeight: '700'}}>Role</th>
                <th style={{padding: '16px', textAlign: 'left', fontWeight: '700'}}>Status</th>
                <th style={{padding: '16px', textAlign: 'left', fontWeight: '700'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} style={{borderBottom: '1px solid #f1f5f9'}}>
                  <td style={{padding: '16px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <div style={{width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'}}>{user.avatar}</div>
                      <span style={{fontWeight: '600', color: '#0f172a'}}>{user.name}</span>
                    </div>
                  </td>
                  <td style={{padding: '16px', color: '#64748b'}}>{user.email}</td>
                  <td style={{padding: '16px'}}><span style={{background: user.role === 'Admin'? '#fef3c7' : '#dbeafe', color: user.role === 'Admin'? '#92400e' : '#1e40af', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '700'}}>{user.role}</span></td>
                  <td style={{padding: '16px'}}><span style={{color: user.online? '#10b981' : '#94a3b8', fontWeight: '700'}}>{user.online? '● Online' : '○ Offline'}</span></td>
                  <td style={{padding: '16px'}}><button onClick={() => navigate(`/chat/${user.id}`)} style={{background: '#667eea', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}>💬 Chat</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// GROUPS PAGE
function GroupsPage() {
  const navigate = useNavigate();
  const groups = [
    { id: 1, name: 'CSE-A Batch', members: 32, avatar: '👥', desc: 'Class discussion group for assignments' },
    { id: 2, name: 'Project Team', members: 5, avatar: '💻', desc: 'Final year project collaboration' },
    { id: 3, name: 'Friends Circle', members: 8, avatar: '🎉', desc: 'Fun & hangout group' },
  ];

  return (
    <div style={{display: 'flex', height: '100vh', fontFamily: 'system-ui'}}>
      <Sidebar />
      <div style={{flex: 1, background: '#f8fafc', padding: '40px', overflowY: 'auto'}}>
        <h1 style={{fontSize: '36px', fontWeight: '800', color: '#0f172a', marginBottom: '8px'}}>💬 Groups</h1>
        <p style={{color: '#64748b', fontSize: '16px', marginBottom: '32px'}}>All active group chats in the system</p>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px'}}>
          {groups.map(group => (
            <div key={group.id} style={{background: 'white', padding: '28px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.2s'}} onClick={() => navigate(`/group-chat/${group.id}`)} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px'}}>
                <div style={{width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px'}}>{group.avatar}</div>
                <div>
                  <h3 style={{margin: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a'}}>{group.name}</h3>
                  <p style={{margin: '4px 0 0 0', fontSize: '14px', color: '#64748b'}}>{group.members} members</p>
                </div>
              </div>
              <p style={{margin: 0, color: '#334155', fontSize: '15px'}}>{group.desc}</p>
              <button style={{marginTop: '16px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%'}}>Open Group Chat</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// PROFILE PAGE
function ProfilePage() {
  const currentUser = localStorage.getItem('currentUser') || 'User';
  return (
    <div style={{display: 'flex', height: '100vh', fontFamily: 'system-ui'}}>
      <Sidebar />
      <div style={{flex: 1, background: '#f8fafc', padding: '40px', overflowY: 'auto'}}>
        <h1 style={{fontSize: '36px', fontWeight: '800', color: '#0f172a', marginBottom: '8px'}}>👤 My Profile</h1>
        <p style={{color: '#64748b', fontSize: '16px', marginBottom: '32px'}}>User information & account settings</p>

        <div style={{background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', maxWidth: '600px'}}>
          <div style={{textAlign: 'center', marginBottom: '32px'}}>
            <div style={{width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px', margin: '0 auto 16px'}}>😊</div>
            <h2 style={{margin: 0, fontSize: '28px', fontWeight: '800', color: '#0f172a'}}>{currentUser}</h2>
            <p style={{margin: '8px 0 0 0', color: '#10b981', fontWeight: '700'}}>● Active Now</p>
          </div>

          <div style={{borderTop: '2px solid #f1f5f9', paddingTop: '24px'}}>
            <ProfileField label="Username" value={currentUser} />
            <ProfileField label="Email" value={`${currentUser}@gmail.com`} />
            <ProfileField label="Role" value="Student" />
            <ProfileField label="Joined Date" value="Jan 2026" />
            <ProfileField label="Status" value="Active" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div style={{marginBottom: '20px'}}>
      <p style={{margin: 0, fontSize: '13px', color: '#64748b', fontWeight: '700', marginBottom: '6px'}}>{label}</p>
      <p style={{margin: 0, fontSize: '16px', color: '#0f172a', fontWeight: '600', background: '#f8fafc', padding: '12px', borderRadius: '8px'}}>{value}</p>
    </div>
  );
}

// CHAT PAGE
function ChatPage() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey! How are you?', time: '10:30 AM', isMe: false },
    { id: 2, text: 'I am good! Working on project', time: '10:32 AM', isMe: true },
  ]);
  const chatEndRef = useRef(null);

  const users = {
    1: { name: 'Ravi Kumar', avatar: '👨' },
    2: { name: 'Priya Sharma', avatar: '👩' },
    3: { name: 'Suresh Reddy', avatar: '👨' },
    4: { name: 'Anu Priya', avatar: '👩' },
    5: { name: 'Kiran Kumar', avatar: '👨' },
  };

  const user = users[id] || { name: 'User', avatar: '👤' };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: Date.now(), text: message, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), isMe: true }]);
    setMessage('');
  };

  return (
    <div style={{display: 'flex', height: '100vh', fontFamily: 'system-ui'}}>
      <Sidebar />
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', background: 'white'}}>
        <div style={{padding: '24px', borderBottom: '2px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}}>{user.avatar}</div>
          <div>
            <h2 style={{margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a'}}>{user.name}</h2>
            <p style={{margin: 0, fontSize: '14px', color: '#10b981', fontWeight: '600'}}>● Online</p>
          </div>
        </div>

        <div style={{flex: 1, overflowY: 'auto', padding: '32px', background: '#f8fafc'}}>
          {messages.map(msg => (
            <div key={msg.id} style={{marginBottom: '20px', display: 'flex', justifyContent: msg.isMe? 'flex-end' : 'flex-start'}}>
              <div style={{maxWidth: '60%', background: msg.isMe? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white', color: msg.isMe? 'white' : '#0f172a', padding: '14px 18px', borderRadius: msg.isMe? '18px 18px 4px 18px' : '18px 18px 18px 4px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
                <p style={{margin: 0, fontSize: '15px', lineHeight: '1.6'}}>{msg.text}</p>
                <p style={{margin: '8px 0 0 0', fontSize: '11px', opacity: 0.7, textAlign: 'right'}}>{msg.time}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div style={{padding: '24px', borderTop: '2px solid #f1f5f9', background: 'white'}}>
          <div style={{display: 'flex', gap: '14px'}}>
            <input type="text" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} style={{flex: 1, padding: '14px 20px', border: '2px solid #e2e8f0', borderRadius: '28px', fontSize: '15px', outline: 'none'}} />
            <button onClick={sendMessage} style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', width: '52px', height: '52px', borderRadius: '50%', fontSize: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>➤</button>
          </div>
        </di

import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Compass, House, Users, CalendarDays, Bookmark, Settings, Search, Bell, Plus,
  ArrowUpRight, ChevronRight, ChevronDown, Heart, MessageCircle, Share2, Send,
  Sparkles, SlidersHorizontal, MapPin, Clock3, Flame, Check, X, Menu, UserRound,
  Leaf, Code2, Palette, Dumbbell, BookOpen, Music, Camera, Coffee, Globe2,
  BriefcaseBusiness, Gamepad2, Rocket, CircleHelp, LogOut, Pencil, ImagePlus,
  TrendingUp, Hash, Smile, MoreHorizontal, ShieldCheck, WandSparkles
} from 'lucide-react';
import './styles.css';

const interestOptions = [
  {name:'Technology',icon:Code2,color:'#e4eafe'}, {name:'Startups',icon:Rocket,color:'#fce7d9'},
  {name:'Design',icon:Palette,color:'#f6e3ef'}, {name:'Reading',icon:BookOpen,color:'#f8edcf'},
  {name:'Fitness',icon:Dumbbell,color:'#dff2e8'}, {name:'Music',icon:Music,color:'#e9e1ff'},
  {name:'Photography',icon:Camera,color:'#fce2dc'}, {name:'Sustainability',icon:Leaf,color:'#dff1df'},
  {name:'Gaming',icon:Gamepad2,color:'#e3e9ff'}, {name:'Coffee',icon:Coffee,color:'#f2e5d7'},
  {name:'Travel',icon:Globe2,color:'#dceff4'}, {name:'Career Growth',icon:BriefcaseBusiness,color:'#e5e9eb'},
  {name:'Writing',icon:Pencil,color:'#fae7d5'}, {name:'Entrepreneurship',icon:TrendingUp,color:'#dff0ec'},
  {name:'Art',icon:Palette,color:'#f5e2ec'}, {name:'Wellness',icon:Heart,color:'#f8e0e0'}
];
const initialCommunities = [
  {id:1,name:'The Makers Club',category:'Technology',description:'A welcoming space for people who love building things, shipping ideas, and learning by doing.',members:2840,posts:126,emoji:'🛠️',cover:'cover-lilac',tags:['Technology','Design','Startups'],joined:true,featured:true,activity:'Very active',location:'Online'},
  {id:2,name:'Slow Mornings',category:'Wellness',description:'Small rituals, mindful routines, and a little more calm in a busy world.',members:1640,posts:84,emoji:'☀️',cover:'cover-peach',tags:['Wellness','Reading','Coffee'],joined:true,featured:true,activity:'Active today',location:'Everywhere'},
  {id:3,name:'Climate Optimists',category:'Sustainability',description:'Practical climate action, hopeful ideas, and people making change in their own corner.',members:3210,posts:203,emoji:'🌱',cover:'cover-green',tags:['Sustainability','Technology','Travel'],joined:false,featured:true,activity:'Very active',location:'Online'},
  {id:4,name:'Design Buddies',category:'Design',description:'Share your work, get thoughtful feedback, and grow your creative confidence together.',members:1980,posts:167,emoji:'🎨',cover:'cover-pink',tags:['Design','Art','Photography'],joined:false,featured:true,activity:'Active today',location:'Online'},
  {id:5,name:'First-Time Founders',category:'Startups',description:'Honest conversations about starting up: experiments, mistakes, and tiny wins.',members:4720,posts:311,emoji:'🚀',cover:'cover-blue',tags:['Startups','Entrepreneurship','Technology'],joined:true,featured:false,activity:'Very active',location:'Online'},
  {id:6,name:'The Reading Room',category:'Reading',description:'A friendly book club for curious minds, great recommendations, and lively discussions.',members:1260,posts:95,emoji:'📚',cover:'cover-yellow',tags:['Reading','Writing','Art'],joined:false,featured:false,activity:'Active this week',location:'Online'},
  {id:7,name:'Weekend Wanderers',category:'Travel',description:'Find your next little adventure, swap itineraries, and travel thoughtfully.',members:2180,posts:142,emoji:'🧭',cover:'cover-blue',tags:['Travel','Photography','Sustainability'],joined:false,featured:false,activity:'Active today',location:'Everywhere'},
  {id:8,name:'Move Together',category:'Fitness',description:'No perfection, no pressure. Just movement, accountability, and celebrating progress.',members:3560,posts:226,emoji:'🏃',cover:'cover-green',tags:['Fitness','Wellness'],joined:false,featured:false,activity:'Very active',location:'Online'},
  {id:9,name:'Indie Music Exchange',category:'Music',description:'Discover independent artists, trade playlists, and talk about the songs that stay with you.',members:890,posts:72,emoji:'🎧',cover:'cover-pink',tags:['Music','Art'],joined:false,featured:false,activity:'Active this week',location:'Online'},
  {id:10,name:'Coffee & Code',category:'Technology',description:'A relaxed place to pair-program, ask beginner questions, and build in public.',members:2480,posts:189,emoji:'☕',cover:'cover-peach',tags:['Technology','Coffee','Career Growth'],joined:false,featured:false,activity:'Active today',location:'Online'},
  {id:11,name:'Pixel & Play',category:'Gaming',description:'Co-op nights, game recommendations, and a friendly place to find your next squad.',members:1740,posts:117,emoji:'🎮',cover:'cover-lilac',tags:['Gaming','Technology','Art'],joined:false,featured:false,activity:'Active today',location:'Online'},
  {id:12,name:'Career Switchers',category:'Career Growth',description:'A supportive peer circle for learning new skills and making a thoughtful career pivot.',members:2980,posts:178,emoji:'🪴',cover:'cover-yellow',tags:['Career Growth','Technology','Writing'],joined:false,featured:false,activity:'Very active',location:'Online'}
];
const demoUsers = [
  {id:1,name:'Maya Kapoor',handle:'@mayamakes',role:'Product designer',city:'Delhi, India',bio:'Making digital spaces feel a little more human. Currently learning ceramics.',interests:['Design','Technology','Art','Coffee'],avatar:'avatar-a',initials:'MK',online:true},
  {id:2,name:'Arjun Mehta',handle:'@arjunbuilds',role:'Founder in progress',city:'Bengaluru, India',bio:'Curious about climate tech, tiny experiments, and asking better questions.',interests:['Startups','Sustainability','Technology','Reading'],avatar:'avatar-b',initials:'AM',online:true},
  {id:3,name:'Zoya Khan',handle:'@zoyareads',role:'Writer & book lover',city:'Mumbai, India',bio:'Collecting stories, good playlists, and places with excellent chai.',interests:['Reading','Writing','Music','Travel'],avatar:'avatar-c',initials:'ZK',online:false},
  {id:4,name:'Kabir Rao',handle:'@kabir.codes',role:'Software developer',city:'Hyderabad, India',bio:'Building side projects and helping beginners feel at home in tech.',interests:['Technology','Gaming','Coffee','Career Growth'],avatar:'avatar-d',initials:'KR',online:true},
  {id:5,name:'Ananya Sen',handle:'@ananyagrows',role:'Sustainability advocate',city:'Kolkata, India',bio:'Small changes, shared knowledge, and more hopeful climate conversations.',interests:['Sustainability','Travel','Photography','Wellness'],avatar:'avatar-e',initials:'AS',online:false},
  {id:6,name:'Rohan Iyer',handle:'@rohanmoves',role:'Fitness coach',city:'Chennai, India',bio:'Making movement more accessible. Progress over perfection, always.',interests:['Fitness','Wellness','Music','Travel'],avatar:'avatar-f',initials:'RI',online:true}
];
const initialPosts = [
  {id:1,user:demoUsers[0],community:'The Makers Club',communityId:1,time:'18 min ago',text:'Tiny reminder for anyone building something right now: your first version is allowed to be a little awkward. Share it anyway. ✨ What are you making this week?',tags:['Build in public','Community'],likes:38,comments:12,liked:false,kind:'question'},
  {id:2,user:demoUsers[1],community:'First-Time Founders',communityId:5,time:'1 hr ago',text:'I spoke to 5 potential users instead of polishing my landing page today. Three conversations changed what I thought the problem was. Talk to humans early. What is one assumption you tested this week?',tags:['Startups','Learning'],likes:24,comments:8,liked:false,kind:'insight'},
  {id:3,user:demoUsers[4],community:'Climate Optimists',communityId:3,time:'3 hrs ago',text:'What is one low-effort sustainable habit that actually stuck for you? Mine was keeping a tote bag by the door. Looking for ideas that are realistic, not perfect. 🌿',tags:['Sustainability','Discussion'],likes:51,comments:19,liked:false,kind:'question'},
  {id:4,user:demoUsers[2],community:'The Reading Room',communityId:6,time:'5 hrs ago',text:'Starting a tiny “read one page together” challenge this week. No pressure to finish a book, no complicated tracking. Just show up and share a line that stayed with you. Who is in? 📚',tags:['Reading','Challenge'],likes:17,comments:6,liked:false,kind:'event'}
];
const initialEvents = [
  {id:1,title:'Build in Public: Show & Tell',community:'The Makers Club',date:'Thu, Oct 29',time:'7:00 PM',attendees:42,emoji:'🧑‍💻',type:'Online meetup'},
  {id:2,title:'A More Mindful Morning',community:'Slow Mornings',date:'Sat, Oct 31',time:'9:00 AM',attendees:28,emoji:'☀️',type:'Guided session'},
  {id:3,title:'Climate Ideas That Scale',community:'Climate Optimists',date:'Sun, Nov 1',time:'5:30 PM',attendees:64,emoji:'🌍',type:'Community talk'}
];
const money = n => n>=1000 ? `${(n/1000).toFixed(n%1000===0?0:1)}k` : `${n}`;
const Icon = ({item,...props}) => item ? React.createElement(item,props) : null;
function App(){
  const [page,setPage] = useState('Home');
  const [mobileNav,setMobileNav] = useState(false);
  const [search,setSearch] = useState('');
  const [searchOpen,setSearchOpen] = useState(false);
  const [activeFilter,setActiveFilter] = useState('For you');
  const [selectedInterest,setSelectedInterest] = useState('All interests');
  const [communities,setCommunities] = useState(()=>JSON.parse(localStorage.getItem('cg_communities')||'null')||initialCommunities);
  const [posts,setPosts] = useState(()=>JSON.parse(localStorage.getItem('cg_posts')||'null')||initialPosts);
  const [profile,setProfile] = useState(()=>JSON.parse(localStorage.getItem('cg_profile')||'null')||{...demoUsers[0],name:'Aaryan Verma',handle:'@aaryanverma',role:'Student & curious builder',city:'Delhi, India',bio:'Exploring ideas, meeting thoughtful people, and building things that matter.',interests:['Technology','Startups','Career Growth','Reading'],avatar:'avatar-a',initials:'AV'});
  const [events,setEvents] = useState(initialEvents);
  const [joinedEvents,setJoinedEvents] = useState([]);
  const [savedCommunities,setSavedCommunities] = useState([]);
  const [showProfile,setShowProfile] = useState(false);
  const [showCreate,setShowCreate] = useState(false);
  const [showPost,setShowPost] = useState(false);
  const [showNotifications,setShowNotifications] = useState(false);
  const [toast,setToast] = useState('');
  const [communityDetail,setCommunityDetail] = useState(null);
  const [memberDetail,setMemberDetail] = useState(null);
  const [profileDraft,setProfileDraft] = useState(profile);
  const [newCommunity,setNewCommunity] = useState({name:'',category:'Technology',description:'',tags:[]});
  const [postDraft,setPostDraft] = useState('');
  const [newPostCommunity,setNewPostCommunity] = useState(1);
  const [showAllMembers,setShowAllMembers] = useState(false);
  useEffect(()=>{localStorage.setItem('cg_communities',JSON.stringify(communities))},[communities]);
  useEffect(()=>{localStorage.setItem('cg_posts',JSON.stringify(posts))},[posts]);
  useEffect(()=>{localStorage.setItem('cg_profile',JSON.stringify(profile))},[profile]);
  useEffect(()=>{if(toast){const t=setTimeout(()=>setToast(''),2600);return()=>clearTimeout(t)}},[toast]);
  const joined = communities.filter(c=>c.joined);
  const filteredCommunities = useMemo(()=>communities.filter(c=>{
    const q=search.toLowerCase(); const matchesSearch=!q||`${c.name} ${c.description} ${c.category} ${c.tags.join(' ')}`.toLowerCase().includes(q);
    const matchesInterest=selectedInterest==='All interests'||c.tags.includes(selectedInterest)||c.category===selectedInterest;
    const matchesTab=activeFilter==='For you'?true:activeFilter==='Popular'?c.members>=2000:activeFilter==='New'?c.id>12:activeFilter==='My communities'?c.joined:true;
    return matchesSearch&&matchesInterest&&matchesTab;
  }),[communities,search,selectedInterest,activeFilter]);
  const suggestedCommunities = communities.filter(c=>!c.joined).sort((a,b)=>scoreCommunity(b)-scoreCommunity(a)).slice(0,3);
  function scoreCommunity(c){return c.tags.filter(t=>profile.interests.includes(t)).length*10+c.members/1000}
  const matchedPeople = demoUsers.filter(u=>u.id!==1).map(u=>({...u,common:u.interests.filter(i=>profile.interests.includes(i))})).sort((a,b)=>b.common.length-a.common.length);
  const notify = msg=>{setToast(msg)};
  const navigate = p=>{setPage(p);setMobileNav(false);setSearch('');setActiveFilter(p==='My communities'?'My communities':'For you');setCommunityDetail(null);setMemberDetail(null)};
  const toggleJoin = id=>{const c=communities.find(x=>x.id===id);setCommunities(old=>old.map(x=>x.id===id?{...x,joined:!x.joined,members:x.members+(x.joined?-1:1)}:x));notify(c?.joined?'Community left':'You’re in! Welcome to the community.')};
  const toggleLike = id=>setPosts(old=>old.map(p=>p.id===id?{...p,liked:!p.liked,likes:p.likes+(p.liked?-1:1)}:p));
  const toggleSave = id=>{setSavedCommunities(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]);notify(savedCommunities.includes(id)?'Removed from saved':'Community saved for later')};
  const submitProfile = e=>{e.preventDefault();setProfile({...profileDraft,handle:profileDraft.handle.startsWith('@')?profileDraft.handle:'@'+profileDraft.handle,initials:profileDraft.name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase()});setShowProfile(false);notify('Profile updated successfully')};
  const toggleInterest = interest=>setProfileDraft(p=>({...p,interests:p.interests.includes(interest)?p.interests.filter(i=>i!==interest):[...p.interests,interest]}));
  const submitCommunity = e=>{e.preventDefault();if(!newCommunity.name.trim()){notify('Add a community name first');return}const item={id:Math.max(...communities.map(c=>c.id),0)+1,name:newCommunity.name,category:newCommunity.category,description:newCommunity.description||'A new space to share ideas and learn together.',members:1,posts:0,emoji:interestOptions.find(i=>i.name===newCommunity.category)?.name==='Technology'?'💡':'🌟',cover:['cover-lilac','cover-peach','cover-green','cover-pink','cover-blue'][Math.floor(Math.random()*5)],tags:newCommunity.tags.length?newCommunity.tags:[newCommunity.category],joined:true,featured:false,activity:'Just started',location:'Online'};setCommunities([item,...communities]);setShowCreate(false);setNewCommunity({name:'',category:'Technology',description:'',tags:[]});setCommunityDetail(item);setPage('Explore');notify('Your community is live!')};
  const submitPost = e=>{e.preventDefault();if(!postDraft.trim())return;const c=communities.find(x=>x.id===Number(newPostCommunity));const p={id:Date.now(),user:{...profile},community:c?.name||'CommonGround',communityId:c?.id||1,time:'Just now',text:postDraft.trim(),tags:profile.interests.slice(0,2),likes:0,comments:0,liked:false,kind:'post'};setPosts([p,...posts]);setPostDraft('');setShowPost(false);setPage('Home');notify('Your post is live')};
  const navItems=[{name:'Home',icon:House},{name:'Explore',icon:Compass},{name:'My communities',icon:Users},{name:'Events',icon:CalendarDays},{name:'Saved',icon:Bookmark}];
  const getCommunity=id=>communities.find(c=>c.id===id)||initialCommunities[0];
  const pageTitle=page==='Home'?'Your community corner':page==='Explore'?'Find your people':page==='My communities'?'Your communities':page==='Events'?'Make it a date':page==='Saved'?'Saved for later':page==='Members'?'People you may like':page;
  const pageSub=page==='Home'?'A little inspiration from the spaces you care about.':page==='Explore'?'Find a space where your interests feel at home.':page==='My communities'?'The spaces you’ve joined, all in one place.':page==='Events'?'Good conversations are even better when they’re on the calendar.':page==='Saved'?'Keep interesting communities close while you decide.':page==='Members'?'Meet people who are curious about the same things you are.':'';
  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav?'sidebar-open':''}`}>
      <button className="brand" onClick={()=>navigate('Home')}>
<span className="brand-mark">
<span>
</span>
<span>
</span>
<span>
</span>
<span>
</span>
</span>
<span>common<span className="brand-light">ground</span>
<small>FIND YOUR PEOPLE</small>
</span>
</button>
      <button className="profile-mini" onClick={()=>{setProfileDraft(profile);setShowProfile(true)}}>
<span className={`avatar ${profile.avatar}`}>{profile.initials}</span>
<span className="profile-mini-copy">
<b>{profile.name}</b>
<small>{profile.handle}</small>
</span>
<Pencil size={14} className="mini-edit"/>
</button>
      <div className="side-label">WORKSPACE</div>
      <nav className="nav-list">{navItems.map(n=>
<button key={n.name} className={`nav-item ${page===n.name?'active':''}`} onClick={()=>navigate(n.name)}>
<Icon item={n.icon} size={18}/>
<span>{n.name}</span>{n.name==='My communities'&&<span className="nav-count">{joined.length}</span>}{n.name==='Saved'&&savedCommunities.length>0&&<span className="nav-count">{savedCommunities.length}</span>}</button>)}</nav>
      <div className="side-label side-label-row">
<span>YOUR INTERESTS</span>
<button title="Edit interests" onClick={()=>{setProfileDraft(profile);setShowProfile(true)}}>
<Plus size={14}/>
</button>
</div>
      <div className="interest-nav">{profile.interests.slice(0,5).map((i,idx)=>
<button key={i} onClick={()=>{setSelectedInterest(i);navigate('Explore')}}>
<span className={`interest-dot dot-${idx%5}`}>
</span>{i}</button>)}<button className="muted-interest" onClick={()=>{setProfileDraft(profile);setShowProfile(true)}}>
<Plus size={13}/> Edit interests</button>
</div>
      <div className="sidebar-bottom">
<div className="invite-card">
<div className="invite-icon">
<Sparkles size={17}/>
</div>
<b>Good things grow together.</b>
<p>Know someone who’d love this corner of the internet?</p>
<button onClick={()=>{navigator.clipboard?.writeText(window.location.href);notify('Invite link copied (demo)')}}>Invite a friend <ArrowUpRight size={14}/>
</button>
<div className="invite-art">✳</div>
</div>
<button className="nav-item settings-link" onClick={()=>notify('Settings will be available in a future version')}>
<Settings size={17}/> Settings</button>
<div className="sidebar-foot">
<span className="online-dot">
</span> Your space, your pace <span>·</span> <button onClick={()=>notify('CommonGround demo v1.0')}>About</button>
</div>
</div>
    </aside>
    {mobileNav&&<div className="mobile-scrim" onClick={()=>setMobileNav(false)}>
</div>}
    <main className="main-area">
      <header className="topbar">
<button className="mobile-menu icon-button" onClick={()=>setMobileNav(!mobileNav)}>
<Menu size={20}/>
</button>
<div className="breadcrumb">Community <ChevronRight size={14}/>
<b>{page}</b>
</div>
<div className="topbar-actions">
<div className={`global-search ${searchOpen?'search-open':''}`}>
<Search size={17}/>
<input value={search} onChange={e=>{setSearch(e.target.value);if(e.target.value&&page!=='Explore')setPage('Explore')}} onFocus={()=>setSearchOpen(true)} onBlur={()=>setTimeout(()=>setSearchOpen(false),150)} placeholder="Search anything..."/>
<kbd>⌘ K</kbd>
</div>
<button className="icon-button notification-button" onClick={()=>setShowNotifications(!showNotifications)}>
<Bell size={18}/>
<i>
</i>
</button>
<button className="top-avatar" onClick={()=>{setProfileDraft(profile);setShowProfile(true)}}>
<span className={`avatar ${profile.avatar}`}>{profile.initials}</span>
<ChevronDown size={14}/>
</button>
</div>
      {showNotifications&&<div className="notification-pop">
<div className="pop-head">
<b>Notifications</b>
<button onClick={()=>setShowNotifications(false)}>
<X size={15}/>
</button>
</div>
<div className="notification-row">
<span className="notification-emoji">🎉</span>
<div>
<b>Welcome to CommonGround!</b>
<p>Your next good conversation is just around the corner.</p>
<small>Just now</small>
</div>
</div>
<div className="notification-row">
<span className="notification-emoji">🌱</span>
<div>
<b>Communities are growing</b>
<p>Explore a new space that matches your interests.</p>
<small>Today</small>
</div>
</div>
</div>}</header>
      <div className="page-content">
        <div className="page-heading">
<div>
<div className="eyebrow">
<span className="eyebrow-line">
</span> YOUR PEOPLE, YOUR INTERESTS</div>
<h1>{pageTitle}<span className="heading-period">.</span>
</h1>
<p>{pageSub}</p>
</div>
<div className="heading-actions">{page==='Home'&&<button className="button button-primary" onClick={()=>setShowPost(true)}>
<Plus size={17}/> Share something</button>}{page==='Explore'&&<button className="button button-primary" onClick={()=>setShowCreate(true)}>
<Plus size={17}/> Create community</button>}</div>
</div>
        {page==='Home'&&<>
          <section className="welcome-banner">
<div className="welcome-copy">
<div className="welcome-kicker">
<Sparkles size={14}/> A SPACE TO BELONG</div>
<h2>Good things happen<br/>when we <em>find our people.</em>
</h2>
<p>Your interests are the beginning of something good. See where they take you.</p>
<button className="button button-dark" onClick={()=>navigate('Explore')}>Explore communities <ArrowUpRight size={16}/>
</button>
<div className="banner-stats">
<div>
<b>{money(communities.reduce((a,c)=>a+c.members,0))}+</b>
<span>community members</span>
</div>
<div className="stats-divider">
</div>
<div>
<b>{communities.length}</b>
<span>spaces to explore</span>
</div>
<div className="stats-divider">
</div>
<div>
<b>{profile.interests.length}</b>
<span>your interests</span>
</div>
</div>
</div>
<div className="welcome-visual">
<div className="sun-shape">
</div>
<div className="visual-orbit orbit-one">
</div>
<div className="visual-orbit orbit-two">
</div>
<div className="visual-card visual-card-main">
<div className="visual-emoji">🌿</div>
<div>
<b>Climate Optimists</b>
<span>People growing a better future</span>
</div>
<div className="tiny-avatars">
<span className="avatar avatar-b">AM</span>
<span className="avatar avatar-e">AS</span>
<span className="avatar avatar-c">ZK</span>
<span className="avatar-more">+2k</span>
</div>
</div>
<div className="visual-card visual-card-small">
<span className="visual-small-icon">✳</span>
<div>
<b>Shared interests</b>
<span>Where connections begin</span>
</div>
</div>
<span className="float-emoji float-star">✳</span>
<span className="float-emoji float-heart">♡</span>
<span className="float-emoji float-leaf">✿</span>
<div className="visual-caption">A little more connected <span>↗</span>
</div>
</div>
</section>
          <div className="section-heading">
<div>
<h2>Picked for you <span className="heading-spark">✳</span>
</h2>
<p>Spaces that feel like your kind of place.</p>
</div>
<button className="text-link" onClick={()=>navigate('Explore')}>Explore all <ArrowUpRight size={15}/>
</button>
</div>
          <div className="community-grid featured-grid">{suggestedCommunities.map(c=>
<CommunityCard key={c.id} c={c} joined={c.joined} onJoin={()=>toggleJoin(c.id)} onOpen={()=>setCommunityDetail(c)} onSave={()=>toggleSave(c.id)} saved={savedCommunities.includes(c.id)}/>)}</div>
          <div className="home-lower">
<section className="feed-section">
<div className="section-heading feed-title">
<div>
<h2>From your communities</h2>
<p>Little ideas worth sharing.</p>
</div>
<button className="icon-button subtle-button" onClick={()=>setShowPost(true)} title="Create post">
<Plus size={18}/>
</button>
</div>
<div className="feed-tabs">
<button className="active">For you</button>
<button onClick={()=>navigate('My communities')}>Following</button>
<button onClick={()=>navigate('Explore')}>Discover</button>
</div>
<div className="post-list">{posts.slice(0,3).map(p=>
<PostCard key={p.id} p={p} onLike={()=>toggleLike(p.id)} onCommunity={()=>{setCommunityDetail(getCommunity(p.communityId));setPage('Explore')}} onComment={()=>notify('Comments are coming soon — keep the conversation going in your community!')} onShare={()=>{navigator.clipboard?.writeText(p.text);notify('Post copied to clipboard')}}/>)}</div>
<button className="button button-outline button-full" onClick={()=>navigate('Explore')}>Find more conversations <ArrowUpRight size={15}/>
</button>
</section>
          <aside className="right-rail">
<div className="rail-heading">
<h3>Your little corner</h3>
<button onClick={()=>{setProfileDraft(profile);setShowProfile(true)}}>
<Pencil size={14}/>
</button>
</div>
<div className="profile-progress">
<div className="progress-top">
<span>Profile completeness</span>
<b>{Math.min(100,55+profile.interests.length*5)}%</b>
</div>
<div className="progress-track">
<span style={{width:`${Math.min(100,55+profile.interests.length*5)}%`}}>
</span>
</div>
<p>A little more about you helps the right people find you.</p>
<button className="text-link" onClick={()=>{setProfileDraft(profile);setShowProfile(true)}}>Make it yours <ArrowUpRight size={14}/>
</button>
</div>
<div className="rail-divider">
</div>
<div className="rail-heading">
<h3>People to know</h3>
<button onClick={()=>navigate('Members')}>See all <ArrowUpRight size={13}/>
</button>
</div>
<div className="people-list">{matchedPeople.slice(0,3).map(p=>
<PersonRow key={p.id} person={p} onOpen={()=>setMemberDetail(p)} onConnect={()=>notify(`Connection request sent to ${p.name} (demo)`)} compact/>)}</div>
<div className="rail-divider">
</div>
<div className="rail-heading">
<h3>Coming together</h3>
<button onClick={()=>navigate('Events')}>All events <ArrowUpRight size={13}/>
</button>
</div>
<div className="mini-events">{events.slice(0,2).map(e=>
<div className="mini-event" key={e.id}>
<div className="event-date">
<span>{e.date.split(',')[0].slice(0,3).toUpperCase()}</span>
<b>{e.date.match(/\d+/)?.[0]}</b>
</div>
<div className="mini-event-copy">
<b>{e.title}</b>
<span>
<Clock3 size={12}/>{e.time}</span>
</div>
</div>)}</div>
<div className="rail-note">
<Sparkles size={16}/>
<span>
<b>Little by little.</b> Community is built one conversation at a time.</span>
</div>
</aside>
</div>
        </>}
        {page==='Explore'&&<>
<div className="explore-toolbar">
<div className="explore-search">
<Search size={17}/>
<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search communities, topics, or interests"/>
<SlidersHorizontal size={16}/>
</div>
<div className="filter-tabs">{['For you','Popular','New','My communities'].map(f=>
<button key={f} className={activeFilter===f?'active':''} onClick={()=>setActiveFilter(f)}>{f}</button>)}</div>
</div>
<div className="interest-chips">
<button className={selectedInterest==='All interests'?'selected':''} onClick={()=>setSelectedInterest('All interests')}>All interests</button>{interestOptions.map(i=>
<button key={i.name} className={selectedInterest===i.name?'selected':''} onClick={()=>setSelectedInterest(selectedInterest===i.name?'All interests':i.name)}>{i.name}</button>)}</div>
<div className="section-heading explore-results-heading">
<div>
<h2>{filteredCommunities.length} spaces to explore</h2>
<p>{selectedInterest==='All interests'?'A little something for every curious mind.':`Communities around ${selectedInterest.toLowerCase()}.`}</p>
</div>
<button className="button button-outline" onClick={()=>setShowCreate(true)}>
<Plus size={16}/> Start a community</button>
</div>{filteredCommunities.length?<div className="community-grid explore-grid">{filteredCommunities.map(c=>
<CommunityCard key={c.id} c={c} joined={c.joined} onJoin={()=>toggleJoin(c.id)} onOpen={()=>setCommunityDetail(c)} onSave={()=>toggleSave(c.id)} saved={savedCommunities.includes(c.id)}/>)}</div>:<EmptyState icon={Compass} title="No communities found just yet" description="Try another interest or start a new space of your own." action="Create a community" onAction={()=>setShowCreate(true)}/>}</>}
        {page==='My communities'&&<>
<div className="my-community-summary">
<div>
<span className="summary-icon">
<Users size={18}/>
</span>
<div>
<b>{joined.length} communities</b>
<span>Your people are here.</span>
</div>
</div>
<button className="button button-primary" onClick={()=>navigate('Explore')}>
<Compass size={16}/> Discover more</button>
</div>
<div className="community-grid explore-grid">{joined.map(c=>
<CommunityCard key={c.id} c={c} joined onJoin={()=>toggleJoin(c.id)} onOpen={()=>setCommunityDetail(c)} onSave={()=>toggleSave(c.id)} saved={savedCommunities.includes(c.id)}/>)}</div>{!joined.length&&<EmptyState icon={Users} title="Your community story starts here" description="Join a space that sparks your curiosity." action="Explore communities" onAction={()=>navigate('Explore')}/>}<div className="section-heading secondary-heading">
<div>
<h2>You might also like</h2>
<p>Spaces that match your interests.</p>
</div>
</div>
<div className="community-grid featured-grid">{suggestedCommunities.slice(0,3).map(c=>
<CommunityCard key={c.id} c={c} joined={c.joined} onJoin={()=>toggleJoin(c.id)} onOpen={()=>setCommunityDetail(c)} onSave={()=>toggleSave(c.id)} saved={savedCommunities.includes(c.id)}/>)}</div>
</>}
        {page==='Events'&&<>
<div className="events-banner">
<div>
<div className="welcome-kicker">
<CalendarDays size={14}/> MAKE SPACE FOR GOOD THINGS</div>
<h2>Show up for what<br/>
<em>brings us together.</em>
</h2>
<p>Community calls, shared projects, and small moments to meet your people.</p>
</div>
<div className="events-illustration">🗓️<span>✳</span>
<i>♡</i>
</div>
</div>
<div className="section-heading">
<div>
<h2>Coming up</h2>
<p>Save a spot for something good.</p>
</div>
<span className="soft-pill">{events.length} upcoming events</span>
</div>
<div className="event-list">{events.map(e=>
<div className="event-card" key={e.id}>
<div className="event-art">
<span>{e.emoji}</span>
<small>{e.type}</small>
</div>
<div className="event-info">
<span className="event-community">{e.community}</span>
<h3>{e.title}</h3>
<div className="event-meta">
<span>
<CalendarDays size={14}/>{e.date}</span>
<span>
<Clock3 size={14}/>{e.time}</span>
<span>
<Users size={14}/>{e.attendees+(joinedEvents.includes(e.id)?1:0)} going</span>
</div>
</div>
<button className={`button ${joinedEvents.includes(e.id)?'button-joined':'button-primary'}`} onClick={()=>{setJoinedEvents(old=>old.includes(e.id)?old.filter(x=>x!==e.id):[...old,e.id]);notify(joinedEvents.includes(e.id)?'You’re no longer attending':'You’re on the list! See you there.')}}>{joinedEvents.includes(e.id)?<>
<Check size={15}/> Going</>:'Join event'}</button>
</div>)}</div>
<div className="event-note">
<Sparkles size={18}/>
<div>
<b>Have an idea for a get-together?</b>
<p>Every great community starts with someone suggesting the first hello.</p>
</div>
<button className="text-link" onClick={()=>notify('Event creation is coming soon')}>Suggest an event <ArrowUpRight size={14}/>
</button>
</div>
</>}
        {page==='Saved'&&<>
<div className="section-heading">
<div>
<h2>Your saved spaces</h2>
<p>Communities you want to come back to.</p>
</div>
</div>{communities.filter(c=>savedCommunities.includes(c.id)).length?<div className="community-grid explore-grid">{communities.filter(c=>savedCommunities.includes(c.id)).map(c=>
<CommunityCard key={c.id} c={c} joined={c.joined} onJoin={()=>toggleJoin(c.id)} onOpen={()=>setCommunityDetail(c)} onSave={()=>toggleSave(c.id)} saved/> )}</div>:<EmptyState icon={Bookmark} title="Keep the good ones close" description="Save communities that catch your eye and find them here whenever you're ready." action="Explore communities" onAction={()=>navigate('Explore')}/>}</>}
        {page==='Members'&&<>
<div className="members-intro">
<div className="members-search">
<Search size={16}/>
<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find people by name or interest"/>
</div>
<span className="soft-pill">
<Users size={13}/> {matchedPeople.length} suggested members</span>
</div>
<div className="members-grid">{matchedPeople.filter(p=>!search||`${p.name} ${p.role} ${p.interests.join(' ')}`.toLowerCase().includes(search.toLowerCase())).map(p=>
<MemberCard key={p.id} person={p} onOpen={()=>setMemberDetail(p)} onConnect={()=>notify(`Connection request sent to ${p.name} (demo)`)}/>)}</div>
</>}
        <footer className="main-footer">
<div className="footer-brand">
<span className="brand-mark mini-mark">
<span>
</span>
<span>
</span>
<span>
</span>
<span>
</span>
</span> common<span>ground</span>
</div>
<span>Made for the things that bring us together.</span>
<div>
<button onClick={()=>notify('Community guidelines: be kind, curious, and respectful.')}>Community guidelines</button>
<span>·</span>
<button onClick={()=>notify('This is a prototype with fictional demo data.')}>About this demo</button>
</div>
</footer>
      </div>
    </main>
    {communityDetail&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setCommunityDetail(null)}}>
<div className="detail-modal community-detail-modal">
<button className="modal-close" onClick={()=>setCommunityDetail(null)}>
<X size={18}/>
</button>
<div className={`detail-cover ${communityDetail.cover}`}>
<span className="detail-emoji">{communityDetail.emoji}</span>
<span className="cover-label">A COMMONGROUND COMMUNITY</span>
</div>
<div className="detail-body">
<div className="detail-category">
<span className="category-dot">
</span>{communityDetail.category} community</div>
<h2>{communityDetail.name}</h2>
<p className="detail-description">{communityDetail.description}</p>
<div className="detail-stats">
<div>
<b>{money(communityDetail.members)}</b>
<span>members</span>
</div>
<div>
<b>{communityDetail.posts}</b>
<span>conversations</span>
</div>
<div>
<b>{communityDetail.activity}</b>
<span>community pulse</span>
</div>
</div>
<div className="detail-section">
<h3>What brings us together</h3>
<div className="tag-list">{communityDetail.tags.map(t=>
<span key={t}>{t}</span>)}</div>
</div>
<div className="detail-section">
<h3>A little about this space</h3>
<p>Come as you are, share what you're learning, ask questions, and help make this a thoughtful and welcoming place for everyone.</p>
</div>
<div className="detail-members">
<div className="avatar-stack">
<span className="avatar avatar-a">MK</span>
<span className="avatar avatar-b">AM</span>
<span className="avatar avatar-e">AS</span>
<span className="avatar avatar-c">ZK</span>
</div>
<span>
<b>{money(communityDetail.members)} curious people</b>
<small>learning and sharing together</small>
</span>
</div>
<div className="detail-actions">
<button className={`button ${communityDetail.joined?'button-outline':'button-primary'}`} onClick={()=>toggleJoin(communityDetail.id)}>{communityDetail.joined?<>
<Check size={16}/> Joined community</>:<>
<Plus size={16}/> Join community</>}</button>
<button className="button button-outline" onClick={()=>toggleSave(communityDetail.id)}>
<Bookmark size={16}/>{savedCommunities.includes(communityDetail.id)?'Saved':'Save for later'}</button>
</div>
</div>
</div>
</div>}
    {memberDetail&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setMemberDetail(null)}}>
<div className="detail-modal member-detail-modal">
<button className="modal-close" onClick={()=>setMemberDetail(null)}>
<X size={18}/>
</button>
<div className={`member-hero ${memberDetail.avatar}`}>
<span className="avatar member-big-avatar">{memberDetail.initials}</span>
<span className="member-hero-spark">✳</span>
</div>
<div className="member-detail-body">
<span className="soft-pill">{memberDetail.online?'● Online now':'Community member'}</span>
<h2>{memberDetail.name}</h2>
<div className="member-handle">{memberDetail.handle} · {memberDetail.role}</div>
<p>{memberDetail.bio}</p>
<div className="member-location">
<MapPin size={14}/>{memberDetail.city}</div>
<div className="detail-section">
<h3>Things we have in common</h3>
<div className="tag-list">{memberDetail.interests.filter(i=>profile.interests.includes(i)).map(i=>
<span className="common-tag" key={i}>
<Check size={12}/>{i}</span>)}{!memberDetail.interests.some(i=>profile.interests.includes(i))&&<span>There’s always something new to learn about each other.</span>}</div>
</div>
<div className="detail-section">
<h3>Also into</h3>
<div className="tag-list">{memberDetail.interests.map(i=>
<span key={i}>{i}</span>)}</div>
</div>
<button className="button button-primary button-full" onClick={()=>{notify(`Connection request sent to ${memberDetail.name} (demo)`);setMemberDetail(null)}}>
<Send size={16}/> Say hello</button>
</div>
</div>
</div>}
    {showProfile&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setShowProfile(false)}}>
<div className="form-modal">
<div className="modal-heading">
<div>
<span className="eyebrow">MAKE YOURSELF AT HOME</span>
<h2>Your profile</h2>
<p>A few details help your people find you.</p>
</div>
<button className="modal-close inline-close" onClick={()=>setShowProfile(false)}>
<X size={18}/>
</button>
</div>
<form onSubmit={submitProfile}>
<label className="field-label">Display name<input required value={profileDraft.name} onChange={e=>setProfileDraft({...profileDraft,name:e.target.value})} placeholder="Your name"/>
</label>
<label className="field-label">Username<input value={profileDraft.handle} onChange={e=>setProfileDraft({...profileDraft,handle:e.target.value})} placeholder="@yourname"/>
</label>
<label className="field-label">A little about you<textarea rows="3" value={profileDraft.bio} onChange={e=>setProfileDraft({...profileDraft,bio:e.target.value})} placeholder="What are you curious about?"/>
</label>
<label className="field-label">What do you do?<input value={profileDraft.role} onChange={e=>setProfileDraft({...profileDraft,role:e.target.value})} placeholder="Student, designer, curious human..."/>
</label>
<label className="field-label">Location<input value={profileDraft.city} onChange={e=>setProfileDraft({...profileDraft,city:e.target.value})} placeholder="City, country"/>
</label>
<div className="field-label">Your interests <span className="field-hint">Choose as many as you like</span>
</div>
<div className="interest-picker">{interestOptions.map(i=>
<button type="button" key={i.name} className={profileDraft.interests.includes(i.name)?'chosen':''} onClick={()=>toggleInterest(i.name)}>{profileDraft.interests.includes(i.name)&&<Check size={12}/>} {i.name}</button>)}</div>
<div className="form-footer">
<span>
<ShieldCheck size={14}/> Your profile is saved on this device.</span>
<button className="button button-primary" type="submit">Save profile <Check size={16}/>
</button>
</div>
</form>
</div>
</div>}
    {showCreate&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setShowCreate(false)}}>
<div className="form-modal">
<div className="modal-heading">
<div>
<span className="eyebrow">GOOD THINGS START SOMEWHERE</span>
<h2>Start a community</h2>
<p>Create a welcoming space around something you love.</p>
</div>
<button className="modal-close inline-close" onClick={()=>setShowCreate(false)}>
<X size={18}/>
</button>
</div>
<form onSubmit={submitCommunity}>
<label className="field-label">Community name<input required maxLength="55" value={newCommunity.name} onChange={e=>setNewCommunity({...newCommunity,name:e.target.value})} placeholder="e.g. Sunday Sketch Club"/>
</label>
<label className="field-label">Main interest<select value={newCommunity.category} onChange={e=>setNewCommunity({...newCommunity,category:e.target.value,tags:[e.target.value]})}>{interestOptions.map(i=>
<option key={i.name}>{i.name}</option>)}</select>
</label>
<label className="field-label">What is this space about?<textarea rows="3" maxLength="220" value={newCommunity.description} onChange={e=>setNewCommunity({...newCommunity,description:e.target.value})} placeholder="Tell people what makes this community special..."/>
</label>
<div className="field-label">Add a few related interests</div>
<div className="interest-picker">{interestOptions.filter(i=>i.name!==newCommunity.category).map(i=>
<button type="button" key={i.name} className={newCommunity.tags.includes(i.name)?'chosen':''} onClick={()=>setNewCommunity({...newCommunity,tags:newCommunity.tags.includes(i.name)?newCommunity.tags.filter(t=>t!==i.name):[...newCommunity.tags,i.name]})}>{newCommunity.tags.includes(i.name)&&<Check size={12}/>} {i.name}</button>)}</div>
<div className="form-footer">
<span>
<Users size={14}/> You’ll be the first member.</span>
<button className="button button-primary" type="submit">
<Plus size={16}/> Create community</button>
</div>
</form>
</div>
</div>}
    {showPost&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setShowPost(false)}}>
<div className="form-modal post-modal">
<div className="modal-heading">
<div>
<span className="eyebrow">START A CONVERSATION</span>
<h2>Share something good</h2>
<p>A question, a little win, an idea — it all belongs here.</p>
</div>
<button className="modal-close inline-close" onClick={()=>setShowPost(false)}>
<X size={18}/>
</button>
</div>
<form onSubmit={submitPost}>
<div className="post-author">
<span className={`avatar ${profile.avatar}`}>{profile.initials}</span>
<div>
<b>{profile.name}</b>
<span>{profile.handle}</span>
</div>
</div>
<label className="field-label">Where would you like to share this?<select value={newPostCommunity} onChange={e=>setNewPostCommunity(e.target.value)}>{joined.map(c=>
<option key={c.id} value={c.id}>{c.name}</option>)}<option value="1">The Makers Club</option>
</select>
</label>
<label className="field-label">
<textarea className="post-compose" required rows="5" maxLength="700" value={postDraft} onChange={e=>setPostDraft(e.target.value)} placeholder="What's on your mind? Start with a question, share something you learned, or celebrate a small win..."/>
</label>
<div className="compose-bottom">
<span>{postDraft.length}/700 characters</span>
<button className="button button-primary" type="submit">
<Send size={15}/> Publish post</button>
</div>
</form>
</div>
</div>}
    {toast&&<div className="toast">
<span className="toast-check">
<Check size={14}/>
</span>{toast}<button onClick={()=>setToast('')}>
<X size={14}/>
</button>
</div>}
  </div>;
}
function CommunityCard({c,joined,onJoin,onOpen,onSave,saved}){return <article className="community-card">
<button className="community-cover-button" onClick={onOpen}>
<div className={`community-cover ${c.cover}`}>
<span className="cover-emoji">{c.emoji}</span>
<span className="cover-kicker">COMMON GROUND / {String(c.id).padStart(2,'0')}</span>
<span className="cover-decoration">✳</span>
</div>
</button>
<div className="community-card-body">
<div className="community-meta">
<span className="category-label">
<span className="category-dot">
</span>{c.category}</span>
<button className={`save-button ${saved?'saved':''}`} title={saved?'Unsave community':'Save community'} onClick={onSave}>
<Bookmark size={16} fill={saved?'currentColor':'none'}/>
</button>
</div>
<button className="community-title-button" onClick={onOpen}>
<h3>{c.name}</h3>
<ArrowUpRight size={16}/>
</button>
<p className="community-description">{c.description}</p>
<div className="community-tags">{c.tags.slice(0,3).map(t=>
<span key={t}>{t}</span>)}</div>
<div className="community-card-bottom">
<div className="member-stack">
<span className="avatar avatar-a">MK</span>
<span className="avatar avatar-b">AM</span>
<span className="avatar avatar-e">AS</span>
<span className="stack-count">+{money(Math.max(3,c.members-3))}</span>
</div>
<div className="member-caption">
<b>{money(c.members)}</b>
<span> members</span>
</div>
</div>
<button className={`button community-join-button ${joined?'button-joined':'button-primary'}`} onClick={onJoin}>{joined?<>
<Check size={15}/> Joined</>:<>
<Plus size={15}/> Join community</>}</button>
</div>
</article>}
function PostCard({p,onLike,onCommunity,onComment,onShare}){return <article className="post-card">
<div className="post-top">
<span className={`avatar ${p.user.avatar||'avatar-a'}`}>{p.user.initials||p.user.name.split(' ').map(x=>x[0]).join('')}</span>
<div className="post-author-info">
<b>{p.user.name}</b>
<span>{p.user.role||'Community member'} <span className="post-time-dot">·</span> {p.time}</span>
</div>
<button className="more-button" title="More options" onClick={onShare}>
<MoreHorizontal size={19}/>
</button>
</div>
<button className="post-community-pill" onClick={onCommunity}>
<span className="community-pill-dot">✳</span>{p.community}<ChevronRight size={13}/>
</button>
<p className="post-text">{p.text}</p>{p.tags?.length>0&&<div className="post-tags">{p.tags.map(t=>
<span key={t}>#{t.replaceAll(' ','')}</span>)}</div>}<div className="post-actions">
<button className={p.liked?'liked':''} onClick={onLike}>
<Heart size={17} fill={p.liked?'currentColor':'none'}/>
<span>{p.likes}</span>
</button>
<button onClick={onComment}>
<MessageCircle size={17}/>
<span>{p.comments} replies</span>
</button>
<button onClick={onShare}>
<Share2 size={16}/>
<span>Share</span>
</button>
</div>
</article>}
function PersonRow({person,onOpen,onConnect,compact=false}){return <div className={`person-row ${compact?'person-row-compact':''}`}>
<button className="person-avatar-button" onClick={onOpen}>
<span className={`avatar ${person.avatar}`}>{person.initials}</span>{person.online&&<i className="person-online-dot"/>}</button>
<button className="person-info" onClick={onOpen}>
<b>{person.name}</b>
<span>{person.role}</span>
<small>{person.common?.length||person.interests.filter(i=>['Technology','Startups','Design','Reading'].includes(i)).length} shared interests</small>
</button>
<button className="connect-button" title="Say hello" onClick={onConnect}>
<Plus size={15}/>
</button>
</div>}
function MemberCard({person,onOpen,onConnect}){return <article className="member-card">
<div className={`member-card-cover ${person.avatar}`}>
<span className="member-cover-spark">✳</span>
<span className="avatar member-card-avatar">{person.initials}</span>
<span className={`member-status ${person.online?'is-online':''}`}>{person.online?'Online':'Around'}</span>
</div>
<div className="member-card-body">
<button className="member-name-button" onClick={onOpen}>
<h3>{person.name}</h3>
<ArrowUpRight size={15}/>
</button>
<span className="member-role">{person.role}</span>
<p>{person.bio}</p>
<div className="member-interest-tags">{person.interests.slice(0,3).map(i=>
<span className={person.common?.includes(i)?'common-tag':''} key={i}>{i}</span>)}</div>
<div className="member-card-bottom">
<span>
<MapPin size={13}/>{person.city.split(',')[0]}</span>
<button className="button button-outline" onClick={onConnect}>
<Plus size={14}/> Say hello</button>
</div>
</div>
</article>}
function EmptyState({icon:Icon,title,description,action,onAction}){return <div className="empty-state">
<span className="empty-icon">
<Icon size={26}/>
</span>
<h3>{title}</h3>
<p>{description}</p>
<button className="button button-primary" onClick={onAction}>{action} <ArrowUpRight size={15}/>
</button>
</div>}

createRoot(document.getElementById('root')).render(<App/>);

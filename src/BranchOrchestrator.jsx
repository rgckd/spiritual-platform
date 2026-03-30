import React, { useState } from 'react';
import { 
  BookOpen, MessageCircle, PenTool, User, CheckCircle2,
  Languages, Palette, ArrowLeft, Search, Plus, Minus,
  Library, FileText, Lock, CalendarDays, Clock,
  Sparkles, ArrowRight, ChevronDown, Volume2, Info,
  History, Image as ImageIcon, Type, Save, Check,
  CloudUpload, FileCode, ChevronRight, Upload, Mic
} from 'lucide-react';

// --- BRAND ASSETS ---
const SpiritualLogo = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="48" fill="#FFC107" />
    <path d="M30 65C30 65 35 75 50 75C65 75 70 65 70 65C70 65 60 70 50 70C40 70 30 65 30 65Z" fill="#FFF4D1" />
    <path d="M22 62C22 62 25 70 38 72C35 68 33 62 33 62C33 62 28 64 22 62Z" fill="#FFE5A3" />
    <path d="M78 62C78 62 75 70 62 72C65 68 67 62 67 62C67 62 72 64 78 62Z" fill="#FFE5A3" />
    <path d="M35 55C35 45 40 35 48 30C45 40 45 55 45 55C45 55 40 58 35 55Z" fill="#FFF9E6" />
    <path d="M65 55C65 45 60 35 52 30C55 40 55 55 55 55C55 55 60 58 65 55Z" fill="#FFF9E6" />
    <path d="M38 60C38 52 42 45 48 42C46 50 46 62 46 62C46 62 42 63 38 60Z" fill="#FFF4D1" />
    <path d="M62 60C62 52 58 45 52 42C54 50 54 62 54 62C54 62 58 63 62 60Z" fill="#FFF4D1" />
    <path d="M50 32C45 40 43 55 43 62C43 68 46 72 50 72C54 72 57 68 57 62C57 55 55 40 50 32Z" fill="white" />
  </svg>
);

const AppBrand = ({ size = "md" }) => {
  const isLarge = size === "lg";
  return (
    <div className="flex items-center gap-3">
      <SpiritualLogo size={isLarge ? 54 : 38} />
      <div className="flex flex-col">
        <h1 className={`font-black tracking-tighter text-slate-800 leading-none ${isLarge ? 'text-3xl' : 'text-xl'}`}>Spiritual</h1>
        <p className={`font-bold uppercase tracking-[0.15em] text-amber-600 mt-0.5 ${isLarge ? 'text-[10px]' : 'text-[8px]'}`}>Explore · Reflect · Realize</p>
      </div>
    </div>
  );
};

// --- INITIAL CONFIG ---
const INITIAL_CONFIG = {
  branch_slug: "advaita-tradition",
  meta: {
    hero_image_url: "https://images.unsplash.com/photo-1499209974431-9dac3adafc28?auto=format&fit=crop&q=80&w=800",
    branch_title: "Advaita Vedanta Tradition",
    branch_description: "Non-dual inquiry into the nature of the self (Atman) and the absolute (Brahman)."
  },
  languages: { supported: ["en", "sa"], current: "en" },
  ui_labels: {
    study: { en: "Study", sa: "अध्ययन" },
    gathering: { en: "Gathering", sa: "सत्सङ्ग" },
    diary: { en: "Diary", sa: "स्वाध्याय" },
    library: { en: "Library", sa: "ग्रन्थालय" },
    assessments: { en: "Take assessment", sa: "परीक्षा" },
    plan_day: { en: "Daily Plan", sa: "दैनिकयोजना" }
  },
  styling: { primary_color: "#FF9933" },
  daily_recipe: { study_weight: 50, reflect_weight: 30, community_weight: 20 },
  levels: {
    count: 5,
    labels: {
      "1": { en: "Beginner", sa: "प्रवर्तक", desc: "Focusing on external rituals and basics." },
      "2": { en: "Practitioner", sa: "साधक", desc: "Moving beyond rituals to inner transformation." },
      "3": { en: "Accomplished", sa: "सिद्ध", desc: "Achieving mastery and constant connection." },
      "4": { en: "Advanced Siddha", sa: "परमसिद्ध", desc: "Constant communion with the Absolute." },
      "5": { en: "Perfected Master", sa: "जीवन्मुक्त", desc: "Living as an embodiment of pure awareness." }
    }
  }
};

const PARALLEL_PATHS = [
  { id: 1, title: "Vivekachudamani", type: "Main Text", progress: 65, status: "Verse 42", icon: <BookOpen size={24}/> },
  { id: 2, title: "Pranayama Practice", type: "Aural Inquiry", progress: 20, status: "Part 3", icon: <Volume2 size={24}/> }
];

const App = () => {
  const [view, setView] = useState('admin'); 
  const [publishedConfig, setPublishedConfig] = useState(INITIAL_CONFIG);
  const [draftConfig, setDraftConfig] = useState(INITIAL_CONFIG);
  const [activeLang, setActiveLang] = useState('en');
  const [saveStatus, setSaveStatus] = useState('idle'); 
  const [publishStatus, setPublishStatus] = useState('idle');

  const handleSaveDraft = () => {
    setSaveStatus('saving');
    setTimeout(() => { setSaveStatus('success'); setTimeout(() => setSaveStatus('idle'), 2000); }, 600);
  };

  const handlePublish = () => {
    setPublishStatus('publishing');
    setTimeout(() => { setPublishedConfig({...draftConfig}); setPublishStatus('success'); setTimeout(() => setPublishStatus('idle'), 2000); }, 1000);
  };

  return (
    <div className="min-h-screen bg-orange-50/20 font-sans text-slate-900 relative">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
      
      <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white/90 backdrop-blur p-1 rounded-full shadow-lg border border-amber-100">
        <button onClick={() => setView('admin')} className={`px-4 py-2 rounded-full text-sm font-medium transition ${view === 'admin' ? 'bg-amber-600 text-white' : 'text-amber-600 hover:bg-amber-50'}`}>Admin Orchestrator</button>
        <button onClick={() => setView('seeker')} className={`px-4 py-2 rounded-full text-sm font-medium transition ${view === 'seeker' ? 'bg-amber-600 text-white' : 'text-amber-600 hover:bg-amber-50'}`}>Seeker Preview</button>
      </div>

      {view === 'admin' ? (
        <AdminInterface config={draftConfig} setConfig={setDraftConfig} onSave={handleSaveDraft} onPublish={handlePublish} saveStatus={saveStatus} publishStatus={publishStatus} />
      ) : (
        <SeekerInterface config={publishedConfig} activeLang={activeLang} setActiveLang={setActiveLang} />
      )}
    </div>
  );
};

// --- ADMIN MODE ---
const AdminInterface = ({ config, setConfig, onSave, onPublish, saveStatus, publishStatus }) => {
  const [ingesting, setIngesting] = useState(false);
  const updateMeta = (field, val) => setConfig({ ...config, meta: { ...config.meta, [field]: val } });
  const updateLabel = (key, lang, val) => setConfig({ ...config, ui_labels: { ...config.ui_labels, [key]: { ...config.ui_labels[key], [lang]: val } } });
  const updateStyling = (field, val) => setConfig({ ...config, styling: { ...config.styling, [field]: val } });
  const updateRecipe = (field, val) => setConfig({ ...config, daily_recipe: { ...config.daily_recipe, [field]: parseInt(val) || 0 } });
  
  const updateLevelData = (lvl, field, val) => {
    const updated = { ...config.levels.labels };
    updated[lvl] = { ...updated[lvl], [field]: val };
    setConfig({ ...config, levels: { ...config.levels, labels: updated } });
  };

  const setLevelCount = (n) => {
    const updatedLabels = { ...config.levels.labels };
    for(let i = 1; i <= n; i++) {
      if(!updatedLabels[i]) updatedLabels[i] = { en: `Level ${i}`, sa: `स्तर ${i}`, desc: "" };
    }
    setConfig({ ...config, levels: { ...config.levels, count: n, labels: updatedLabels } });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 pb-24 relative z-10 space-y-8 animate-in fade-in duration-500 font-serif text-slate-800">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <AppBrand size="lg" />
        <div className="flex items-center gap-3">
           <button onClick={onSave} disabled={saveStatus !== 'idle'} className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold border-2 border-amber-200 bg-white text-amber-700 shadow-sm active:scale-95 transition">
             {saveStatus === 'success' ? <Check size={18}/> : saveStatus === 'saving' ? <div className="animate-spin h-4 w-4 border-2 border-amber-600 border-t-transparent rounded-full" /> : <Save size={18}/>} 
             {saveStatus === 'success' ? 'Saved' : 'Save Draft'}
           </button>
           <button onClick={onPublish} disabled={publishStatus !== 'idle'} className="flex items-center gap-2 px-8 py-3 rounded-2xl font-black shadow-xl active:scale-95 transition text-white bg-orange-600 hover:bg-orange-700">
             {publishStatus === 'success' ? <Check size={20}/> : publishStatus === 'publishing' ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" /> : <CloudUpload size={20}/>} 
             {publishStatus === 'success' ? 'Published' : 'Publish Changes'}
           </button>
        </div>
      </header>

      {/* 1. Identity & Aesthetics */}
      <section className="bg-white p-8 rounded-3xl border border-amber-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-amber-800"><Type size={20} className="text-amber-500"/> Identity & Aesthetics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Lineage Name</label>
                <input className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-amber-200 transition" placeholder="Branch Title" value={config.meta.branch_title} onChange={(e) => updateMeta('branch_title', e.target.value)} />
             </div>
             <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Thematic Grounding</label>
                <textarea className="w-full p-3 bg-slate-50 border rounded-xl h-24 text-sm outline-none focus:ring-2 focus:ring-amber-200 transition" placeholder="Description" value={config.meta.branch_description} onChange={(e) => updateMeta('branch_description', e.target.value)} />
             </div>
          </div>
          <div className="space-y-4">
             <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Hero Image URL</label>
                <input className="w-full p-3 bg-slate-50 border rounded-xl font-mono text-xs outline-none focus:ring-2 focus:ring-amber-200 transition" placeholder="Image URL" value={config.meta.hero_image_url} onChange={(e) => updateMeta('hero_image_url', e.target.value)} />
             </div>
             <div className="aspect-[21/9] rounded-xl overflow-hidden border border-amber-50 bg-slate-100 shadow-inner relative"><img src={config.meta.hero_image_url} className="w-full h-full object-cover opacity-60" /></div>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          {['#F59E0B', '#FF9933', '#D97706', '#EA580C', '#B45309'].map(color => (
            <button key={color} onClick={() => updateStyling('primary_color', color)} className={`h-10 w-10 rounded-full border-4 transition-all ${config.styling.primary_color === color ? 'border-slate-800 scale-110 shadow-md' : 'border-transparent'}`} style={{ backgroundColor: color }} />
          ))}
        </div>
      </section>

      {/* 2. Library Ingestion */}
      <section className="bg-white p-8 rounded-3xl border border-amber-100 shadow-sm space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-amber-800"><Upload size={20} className="text-amber-500"/> Content Library Ingestion</h2>
        <div onClick={() => { setIngesting(true); setTimeout(() => setIngesting(false), 2000); }} className="border-2 border-dashed border-amber-200 bg-amber-50/20 rounded-2xl p-12 text-center cursor-pointer hover:bg-amber-50/50 transition">
          {ingesting ? <p className="text-sm font-bold text-amber-800 animate-pulse">Analyzing corpus...</p> : <p className="text-sm font-black text-amber-900 flex flex-col items-center gap-2"><FileCode size={40} className="mx-auto text-amber-500 mb-2"/>Drop lineage texts to build library</p>}
        </div>
      </section>

      {/* 3. Terminology (Sanskrit) */}
      <section className="bg-white p-8 rounded-3xl border border-amber-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-amber-800"><Languages size={20} className="text-amber-500"/> Terminology Mapping</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(config.ui_labels).map((key) => (
            <div key={key} className="p-4 bg-orange-50/30 rounded-xl border border-orange-100 space-y-2">
              <label className="text-[10px] font-black uppercase text-amber-600/60 block">{key.replace('_', ' ')}</label>
              <div className="flex gap-2">
                <input className="flex-1 p-2 bg-white rounded border border-orange-50 text-sm outline-none focus:ring-2 focus:ring-amber-200 transition" value={config.ui_labels[key].en} onChange={(e) => updateLabel(key, 'en', e.target.value)} />
                <input className="flex-1 p-2 bg-white rounded border border-orange-50 text-sm font-medium text-amber-700 outline-none focus:ring-2 focus:ring-amber-200 transition" value={config.ui_labels[key].sa} onChange={(e) => updateLabel(key, 'sa', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Evolution Path */}
      <section className="bg-white p-8 rounded-3xl border border-amber-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-amber-800"><ChevronRight size={20} className="text-amber-500"/> Seeker Evolution</h2>
        <div className="flex items-center gap-4 p-4 bg-amber-50/40 rounded-2xl border border-amber-100">
          <span className="text-sm font-bold text-amber-900">Stages in Journey:</span>
          {[2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => setLevelCount(n)} className={`w-10 h-10 rounded-xl font-bold transition-all border ${config.levels.count === n ? 'bg-amber-600 text-white border-amber-600 shadow-md' : 'bg-white text-amber-400 border-amber-200'}`}>{n}</button>
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({length: config.levels.count}).map((_, i) => (
            <div key={i+1} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-3">
              <div className="flex gap-2">
                <span className="w-9 h-9 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xs shadow-sm">{i+1}</span>
                <input className="flex-1 p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-200" value={config.levels.labels[i+1]?.en} onChange={(e) => updateLevelData(i+1, 'en', e.target.value)} />
                <input className="flex-1 p-2 border rounded-lg text-sm font-medium text-amber-700 outline-none focus:ring-2 focus:ring-amber-200" value={config.levels.labels[i+1]?.sa} onChange={(e) => updateLevelData(i+1, 'sa', e.target.value)} />
              </div>
              <textarea className="w-full p-2 border rounded-lg text-sm italic h-12 outline-none focus:ring-2 focus:ring-amber-200" value={config.levels.labels[i+1]?.desc} onChange={(e) => updateLevelData(i+1, 'desc', e.target.value)} />
            </div>
          ))}
        </div>
      </section>

      {/* 5. Methodology */}
      <section className="bg-white p-8 rounded-3xl border border-amber-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-amber-800"><CalendarDays size={20} className="text-amber-500"/> Sadhana Methodology</h2>
        <div className="grid grid-cols-3 gap-6 text-center">
          {['study_weight', 'reflect_weight', 'community_weight'].map((field) => (
            <div key={field} className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400">{field.replace('_', ' ')} %</label>
              <input type="number" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-100 text-center font-bold text-amber-900 focus:ring-2 focus:ring-amber-200 outline-none transition" value={config.daily_recipe[field]} onChange={(e) => updateRecipe(field, e.target.value)} />
            </div>
          ))}
        </div>
        <div className={`p-4 rounded-xl text-center font-bold text-sm transition-colors ${config.daily_recipe.study_weight + config.daily_recipe.reflect_weight + config.daily_recipe.community_weight === 100 ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
          Total Allocation: {config.daily_recipe.study_weight + config.daily_recipe.reflect_weight + config.daily_recipe.community_weight}%
        </div>
      </section>
    </div>
  );
};

// --- SEEKER DASHBOARD ---
const SeekerInterface = ({ config, activeLang, setActiveLang }) => {
  const [activeSubView, setActiveSubView] = useState(null); 
  const currentLevelIndex = 1; 
  const levelData = config.levels.labels[(currentLevelIndex + 1).toString()];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl flex flex-col relative overflow-hidden z-10 font-serif animate-in fade-in duration-500">
      {!activeSubView ? (
        <>
          <header className="px-5 py-4 bg-white/95 border-b border-orange-100 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
            <AppBrand />
            <div className="flex flex-col items-end gap-1.5">
               <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">{Array.from({length: config.levels.count}).map((_, i) => <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i <= currentLevelIndex ? 'bg-amber-500' : 'bg-amber-100'}`} />)}</div>
                  <span className="text-[10px] font-black text-amber-800 uppercase tracking-tighter">{levelData?.[activeLang]}</span>
               </div>
               <div className="flex gap-1">{config.languages.supported.map(lang => <button key={lang} onClick={() => setActiveLang(lang)} className={`px-2 py-1 rounded-lg text-[10px] font-black border ${activeLang === lang ? 'bg-orange-50 border-orange-300 text-orange-700 shadow-sm' : 'bg-white border-transparent text-slate-300'}`}>{lang === 'en' ? 'EN' : 'संस्कृत'}</button>)}</div>
            </div>
          </header>
          
          <main className="flex-1 p-6 space-y-6 overflow-y-auto pb-32 bg-white">
            <section className="bg-orange-50/40 border border-orange-100 rounded-2xl p-4 flex items-center justify-between text-[11px] font-bold text-orange-800/60 shadow-inner">
               <div className="flex items-center gap-2"><Info size={14} className="text-orange-400"/><span>Companion: {config.meta.branch_title}</span></div>
               <ChevronDown size={14} />
            </section>
            
            <section className="relative group">
               <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none"><Search className="text-orange-400" size={20} /></div>
               <input className="w-full pl-12 pr-6 py-5 bg-orange-50/20 border-2 border-orange-100 rounded-2xl text-base font-medium placeholder-orange-300 focus:bg-white focus:border-amber-400 outline-none transition shadow-inner" placeholder="Search concepts or texts..." />
            </section>

            <section className="bg-white border-2 border-orange-50 rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition cursor-pointer group shadow-sm">
               <div className="p-2 bg-orange-50 rounded-lg text-orange-400 group-hover:text-orange-600 transition"><History size={16}/></div>
               <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-orange-800/40 uppercase tracking-widest leading-none mb-1">Last reflection · Atman</p>
                  <p className="text-sm font-medium text-slate-600 truncate italic">"The Atman is not the mind, body, or ego..."</p>
               </div>
               <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider ml-2">View →</span>
            </section>

            <div className="flex justify-between items-center px-1 mb-1">
               <h2 className="text-[11px] font-black text-amber-600/50 uppercase tracking-widest">Guided Sadhana</h2>
               <button onClick={() => setActiveSubView('assessments')} className="text-[10px] font-black text-amber-600 uppercase tracking-wider underline underline-offset-4 decoration-amber-200">{config.ui_labels.assessments[activeLang]} →</button>
            </div>

            <button onClick={() => setActiveSubView('plan_day')} className="w-full p-7 rounded-[2.5rem] flex items-center justify-between shadow-xl active:scale-95 transition bg-gradient-to-br from-orange-500 to-amber-500 text-white">
               <div className="flex items-center gap-4 text-left">
                  <CalendarDays size={24}/>
                  <div><h3 className="font-black text-lg leading-tight">Plan My Day</h3><p className="text-[10px] font-bold uppercase opacity-80">Curated specifically for you</p></div>
               </div>
               <ChevronRight className="opacity-60"/>
            </button>

            <div className="grid grid-cols-2 gap-4">
              <ActionCard icon={<BookOpen size={32}/>} label={config.ui_labels.study[activeLang]} color="bg-amber-500" onClick={() => setActiveSubView('study')} />
              <ActionCard icon={<MessageCircle size={32}/>} label={config.ui_labels.gathering[activeLang]} color="bg-orange-600" onClick={() => setActiveSubView('gathering')} />
              <ActionCard icon={<PenTool size={32}/>} label={config.ui_labels.diary[activeLang]} color="bg-yellow-500" onClick={() => setActiveSubView('diary')} />
              <ActionCard icon={<Library size={32}/>} label={config.ui_labels.library[activeLang]} color="bg-amber-800/80" onClick={() => setActiveSubView('library')} />
            </div>

            <div className="space-y-4 pt-6 border-t border-orange-100">
              <h2 className="text-[11px] font-black text-amber-600/50 uppercase tracking-widest px-2">Continuing Inquiries</h2>
              {PARALLEL_PATHS.map(path => (
                <div key={path.id} onClick={() => setActiveSubView('study')} className="p-6 rounded-[2.5rem] border-2 border-orange-50 bg-orange-50/10 flex items-center gap-5 hover:border-amber-200 transition active:scale-[0.98] cursor-pointer group shadow-sm">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 shadow-inner group-hover:bg-amber-200 transition">{path.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-1">{path.type}</p>
                    <h3 className="text-xl font-bold text-slate-800 leading-tight truncate">{path.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-white h-1 rounded-full overflow-hidden border border-orange-100"><div className="bg-amber-500 h-full" style={{ width: `${path.progress}%` }} /></div>
                      <span className="text-[10px] font-black text-amber-700">{path.progress}%</span>
                    </div>
                  </div>
                  <ChevronRight className="text-amber-200 group-hover:text-amber-500 transition" />
                </div>
              ))}
            </div>
          </main>
        </>
      ) : (
        <DetailView type={activeSubView} config={config} activeLang={activeLang} onClose={() => setActiveSubView(null)} onNavigate={setActiveSubView} />
      )}
      
      <nav className="p-5 bg-white border-t border-orange-100 flex justify-around items-center sticky bottom-0 z-30 shadow-[0_-10px_30px_rgba(255,153,51,0.1)] backdrop-blur-md">
         <NavItem icon={<BookOpen size={24}/>} label="Home" active onClick={() => setActiveSubView(null)}/>
         <NavItem icon={<MessageCircle size={24}/>} label="Satsang" onClick={() => setActiveSubView('gathering')} />
         <NavItem icon={<PenTool size={24}/>} label="Diary" onClick={() => setActiveSubView('diary')} />
         <NavItem icon={<User size={24}/>} label="Profile" />
      </nav>
    </div>
  );
};

// --- IMMERSIVE FEATURE VIEWS ---
const DetailView = ({ type, config, activeLang, onClose, onNavigate }) => {
  const getLabel = (key) => config.ui_labels[key] ? config.ui_labels[key][activeLang] : key;
  
  const renderContent = () => {
    switch(type) {
      case 'plan_day': return <DailyPlanUX config={config} activeLang={activeLang} onClose={onClose} onNavigate={onNavigate} />;
      case 'study': return <StudyUX />;
      case 'gathering': return <GatheringUX />;
      case 'diary': return <DiaryUX />;
      case 'library': return <LibraryUX />;
      case 'assessments': return <AssessmentsUX />;
      default: return <div className="p-10 text-center font-bold text-amber-600">Module underway...</div>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative animate-in slide-in-from-right duration-300">
      {type !== 'plan_day' && (
        <header className="p-6 flex items-center border-b border-orange-100 sticky top-0 z-30 bg-white/90 backdrop-blur">
          <button onClick={onClose} className="p-3 -ml-3 rounded-full hover:bg-orange-50 active:scale-90 transition outline-none"><ArrowLeft size={32} className="text-amber-700" /></button>
          <h2 className="text-xl font-black text-slate-800 ml-4 uppercase tracking-widest">{getLabel(type)}</h2>
        </header>
      )}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

// Sub-Module: Study
const StudyUX = () => (
  <div className="p-6 space-y-8 animate-in fade-in duration-300">
    <div className="p-8 bg-amber-900 rounded-[3rem] text-white text-center space-y-4 shadow-xl border-4 border-amber-500/20">
      <Sparkles className="mx-auto text-amber-400" size={32} />
      <h4 className="text-2xl font-black italic">Focus Mode</h4>
      <p className="text-amber-100/70 text-sm px-4 italic">"Resume Vivekachudamani Verse 42."</p>
      <button className="px-10 py-5 bg-white text-amber-900 rounded-2xl font-black shadow-lg">Begin Reading</button>
    </div>
    <div className="space-y-4">
      <h3 className="text-[11px] font-black text-amber-600/50 uppercase tracking-widest px-2">Continuing Inquiries</h3>
      {PARALLEL_PATHS.map(p => (
        <div key={p.id} className="p-6 bg-amber-50/50 rounded-[2rem] border-2 border-orange-100 flex items-center gap-5">
           <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-amber-600 shadow-sm">{p.icon}</div>
           <div className="flex-1 min-w-0"><h4 className="text-lg font-black text-slate-800 truncate">{p.title}</h4><div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden"><div className="bg-amber-500 h-full" style={{ width: `${p.progress}%` }} /></div></div>
           <ChevronRight size={18} className="text-amber-200"/>
        </div>
      ))}
    </div>
  </div>
);

// Sub-Module: Gathering
const GatheringUX = () => (
  <div className="p-6 space-y-6 animate-in fade-in duration-300">
    <div className="bg-amber-100/40 p-5 rounded-[2rem] border border-amber-200 shadow-inner">
       <p className="text-[10px] font-black text-amber-900 uppercase tracking-widest mb-3 px-1">Replies for you</p>
       <div className="p-4 bg-white rounded-2xl shadow-sm border border-amber-100 flex items-center gap-4 active:scale-[0.98] transition cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">KM</div>
          <p className="text-sm font-medium text-slate-700 leading-tight">Murali shared an insight on your thread...</p>
          <ChevronRight size={14} className="ml-auto text-slate-300"/>
       </div>
    </div>
    <div className="space-y-4 pt-2">
       <h3 className="text-[11px] font-black text-amber-600/50 uppercase tracking-widest px-2">Active Satsangs</h3>
       {[1, 2].map(i => (
          <div key={i} className="p-6 bg-white border-2 border-orange-50 rounded-[2.5rem] shadow-sm space-y-4 hover:border-orange-200 transition group cursor-pointer">
             <h4 className="text-lg font-black text-slate-800 leading-tight">Does direct experience require silence of mind?</h4>
             <div className="flex gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <span className="flex items-center gap-1.5"><MessageCircle size={14}/> 12</span>
               <span className="flex items-center gap-1.5 text-amber-600"><CheckCircle2 size={14}/> 3 Helpful</span>
             </div>
          </div>
       ))}
    </div>
  </div>
);

// Sub-Module: Diary
const DiaryUX = () => (
  <div className="p-6 space-y-8 animate-in fade-in duration-300">
    <div className="p-8 bg-amber-50/50 rounded-[3rem] border-2 border-dashed border-amber-200 text-center">
       <Sparkles className="mx-auto text-amber-500 mb-2" size={24} />
       <p className="text-sm italic text-amber-900/60 leading-relaxed px-4">"How did the concept of the 'Observer' show up in your day today?"</p>
    </div>
    <div className="grid grid-cols-2 gap-4">
       <button className="flex flex-col items-center gap-3 p-8 bg-white border-2 border-orange-50 rounded-[2.5rem] shadow-sm active:scale-95 transition hover:border-amber-400 hover:shadow-md"><div className="p-4 bg-amber-500 text-white rounded-2xl shadow-lg"><PenTool size={32}/></div><span className="font-black text-sm text-slate-700">Write Note</span></button>
       <button className="flex flex-col items-center gap-3 p-8 bg-white border-2 border-orange-50 rounded-[2.5rem] shadow-sm active:scale-95 transition hover:border-amber-400 hover:shadow-md"><div className="p-4 bg-orange-600 text-white rounded-2xl shadow-lg"><Mic size={32}/></div><span className="font-black text-sm text-slate-700">Record Voice</span></button>
    </div>
  </div>
);

// Sub-Module: Library
const LibraryUX = () => (
  <div className="p-6 space-y-6 animate-in fade-in duration-300">
    <div className="relative group">
       <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none"><Search className="text-amber-400" size={20} /></div>
       <input className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-amber-100 rounded-2xl text-sm font-medium placeholder-amber-200 outline-none" placeholder="Search traditional archives..." />
    </div>
    {[1, 2, 3].map(i => (
      <div key={i} className="p-5 bg-white border-2 border-orange-50 rounded-[2rem] flex items-center gap-5 hover:border-amber-200 transition cursor-pointer group shadow-sm">
         <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-amber-600 shadow-inner group-hover:bg-amber-50 transition">{i % 2 === 0 ? <FileText /> : <Volume2 />}</div>
         <div className="flex-1"><h4 className="text-base font-black text-slate-800">Archive Text Vol {i}</h4><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Archive</p></div>
         <ChevronRight className="text-slate-200 group-hover:text-amber-500 transition" />
      </div>
    ))}
  </div>
);

// Sub-Module: Assessments
const AssessmentsUX = () => (
  <div className="p-6 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-300">
    <div className="p-10 bg-amber-50 border-4 border-dashed border-amber-200 rounded-[4rem] text-center space-y-6 shadow-inner w-full">
       <div className="w-20 h-20 bg-amber-500 rounded-full mx-auto flex items-center justify-center text-white shadow-xl"><Sparkles size={40} /></div>
       <div className="space-y-2"><h3 className="text-2xl font-black text-amber-950 leading-tight">Verification Check</h3><p className="text-sm font-medium text-amber-900/60 leading-relaxed italic">Ready to move to the next stage?</p></div>
       <button className="w-full py-6 bg-amber-600 text-white rounded-3xl font-black text-lg shadow-xl active:scale-95 transition">Start Inquiry</button>
    </div>
  </div>
);

// Sub-Module: Daily Plan
const DailyPlanUX = ({ config, activeLang, onClose, onNavigate }) => {
  const [hours, setHours] = useState(2);
  return (
    <div className="flex flex-col h-full bg-orange-50/20 font-serif">
      <header className="p-6 bg-white flex items-center justify-between border-b border-orange-100 shadow-sm sticky top-0 z-30">
        <button onClick={onClose} className="p-3 -ml-3 rounded-full hover:bg-orange-50 transition active:scale-90"><ArrowLeft size={32} className="text-amber-700" /></button>
        <h2 className="text-xl font-black text-slate-800">Sadhana Plan</h2>
        <Sparkles className="text-amber-500" />
      </header>
      <div className="flex-1 overflow-y-auto space-y-8 p-6 pb-32">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-b border-orange-100 flex flex-col items-center">
           <p className="text-[11px] font-black text-amber-600 uppercase tracking-widest mb-6 text-center leading-relaxed px-4">How many hours can you spare today for Sadhana?</p>
           <div className="flex items-center gap-10">
              <button onClick={() => setHours(Math.max(1, hours - 1))} className="w-16 h-16 rounded-full bg-orange-50 border-2 border-orange-200 text-orange-600 shadow-sm active:scale-90 transition outline-none"><Minus size={28}/></button>
              <div className="text-center"><span className="text-6xl font-black text-slate-900 leading-none">{hours}</span><span className="text-[10px] font-black text-amber-600 block uppercase tracking-widest mt-1">Hours</span></div>
              <button onClick={() => setHours(Math.min(8, hours + 1))} className="w-16 h-16 rounded-full bg-orange-50 border-2 border-orange-200 text-orange-600 shadow-sm active:scale-90 transition outline-none"><Plus size={28}/></button>
           </div>
        </div>
        <div className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Your Recommended Sequence</h3>
           <div onClick={() => onNavigate('study')} className="p-8 rounded-[3rem] border-2 border-orange-100 shadow-sm space-y-4 cursor-pointer active:scale-[0.98] transition-all bg-amber-50/50 hover:border-amber-300">
              <div className="flex items-center gap-4"><div className="p-3 rounded-2xl text-white shadow-md bg-amber-500"><BookOpen size={24}/></div><h4 className="text-xl font-black text-slate-800 leading-tight">Guided Study</h4><span className="ml-auto text-[10px] font-bold text-amber-700">{Math.round(hours*30)}m</span></div>
              <p className="text-base font-medium text-slate-600 leading-relaxed italic">"Resume: Vivekachudamani Verse 42."</p>
           </div>
        </div>
      </div>
      <div className="p-6 bg-white/90 backdrop-blur border-t border-orange-100 sticky bottom-0 z-30 shadow-2xl">
         <button onClick={onClose} className="w-full py-6 bg-amber-600 text-white rounded-3xl font-black text-xl active:scale-95 transition shadow-lg outline-none">Begin Session</button>
      </div>
    </div>
  );
};

// --- UTILITY COMPONENTS ---
const ActionCard = ({ icon, label, color, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur rounded-[2.5rem] border-2 border-orange-50 shadow-sm hover:shadow-xl hover:scale-105 transition-all active:scale-95 text-center group outline-none`}>
    <div className={`p-4 rounded-2xl text-white mb-4 shadow-lg group-hover:scale-110 transition-transform ${color}`}>{icon}</div>
    <span className="text-lg font-black text-slate-800 leading-tight">{label}</span>
  </button>
);

const NavItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 group outline-none">
    <div className={`p-3 rounded-2xl transition-all ${active ? 'bg-orange-100 shadow-inner text-orange-600' : 'text-orange-300 hover:text-orange-400'}`}>{icon}</div>
    <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-slate-900' : 'text-orange-300'}`}>{label}</span>
  </button>
);

export default App;
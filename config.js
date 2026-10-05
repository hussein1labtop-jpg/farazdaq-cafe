const FB={apiKey:"AIzaSyAUbErNSLMpIRO90XFnyPr_HSbNR1AjdMc",authDomain:"farazdaq-cafe.firebaseapp.com",projectId:"farazdaq-cafe",storageBucket:"farazdaq-cafe.firebasestorage.app",messagingSenderId:"880321906540",appId:"1:880321906540:web:dfb2fa3cb93e8662745549"};
const ADMIN_EMAIL="admin@farazdaq.com"; // حساب الإدارة (الباسورد = fz + الرمز 4 أرقام)
const CATS=[{id:'today',t:'🔥 عروض اليوم'},{id:'jbasa',t:'🍔 جباسه'},{id:'juice',t:'🥤 عصائر'},{id:'sweet',t:'🍰 حلويات'},{id:'hot',t:'☕ كوفي ومشروبات ساخنة'},{id:'other',t:'🍽️ أخرى'}];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>Number(n||0).toLocaleString('en-US')+' د.ع';
const $=i=>document.getElementById(i);
const td=()=>new Date().toLocaleDateString('en-CA');
if('serviceWorker' in navigator)navigator.serviceWorker.register('../sw.js');
let dp;addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;const b=$('ib');if(b)b.hidden=false});
function inst(){if(dp){dp.prompt();dp=null;$('ib').hidden=true}}
// ===== أصوات (بدون ملفات) =====
let AC;const ac=()=>{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.state=='suspended'&&AC.resume();return AC};
['pointerdown','keydown','touchstart'].forEach(e=>addEventListener(e,()=>{try{ac()}catch(x){}},{once:true}));
function tone(f,t,d,v=.18,ty='sine'){const a=ac(),o=a.createOscillator(),g=a.createGain(),s=a.currentTime+t;o.type=ty;o.frequency.value=f;g.gain.setValueAtTime(v,s);g.gain.exponentialRampToValueAtTime(.001,s+d);o.connect(g);g.connect(a.destination);o.start(s);o.stop(s+d)}
const SN={order:[[784,0,.3],[988,.16,.3],[1319,.32,.5]],note:[[660,0,.25],[880,.14,.4]],rep:[[880,0,.2],[1175,.15,.4]],ok:[[523,0,.15],[659,.1,.15],[784,.2,.15],[1047,.3,.4]],add:[[700,0,.09,.1,'triangle']],del:[[330,0,.2,.14,'triangle'],[220,.12,.3,.14,'triangle']]};
function snd(k){try{(SN[k]||[]).forEach(n=>tone(...n))}catch(e){}}

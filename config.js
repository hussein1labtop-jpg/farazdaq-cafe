// 1) الصق هنا إعدادات Firebase (من Project settings > Your apps > Web)
const FB={apiKey:"AIzaSyAUbErNSLMpIRO90XFnyPr_HSbNR1AjdMc",authDomain:"farazdaq-cafe.firebaseapp.com",projectId:"farazdaq-cafe",storageBucket:"farazdaq-cafe.firebasestorage.app",messagingSenderId:"880321906540",appId:"1:880321906540:web:dfb2fa3cb93e8662745549"};
// الأقسام (تكدر تضيف قسم جديد بسطر)
const CATS=[{id:'offers',t:'🔥 عروض اليوم / الجديد'},{id:'jbasa',t:'🍔 جباسه'},{id:'juice',t:'🥤 عصائر'},{id:'sweet',t:'🍰 حلويات'},{id:'hot',t:'☕ كوفي ومشروبات ساخنة'},{id:'other',t:'🍽️ أخرى'}];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>Number(n||0).toLocaleString('en-US')+' د.ع';
const $=i=>document.getElementById(i);
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');
let dp;addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;const b=$('ib');if(b)b.hidden=false});
function inst(){if(dp){dp.prompt();dp=null;$('ib').hidden=true}}

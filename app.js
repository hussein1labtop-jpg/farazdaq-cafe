firebase.initializeApp(FB);const db=firebase.firestore(),A=document.body.dataset.m=='admin',auth=A?firebase.auth():null;
let P=[],cart={},cat='today',nm=localStorage.nm||'',eid='',img='',O=[],per='today',first=true,booted=0,cleaned=0;
const vis=p=>p.cat!='today'||p.keep||p.day==td();
function boot(){tabs();if(A)$('eg').innerHTML=CATS.map(c=>`<option value="${c.id}">${c.t}</option>`).join('');
db.collection('products').onSnapshot(s=>{P=s.docs.map(d=>({id:d.id,...d.data()}));
if(A&&!cleaned){cleaned=1;P.filter(p=>p.cat=='today'&&!p.keep&&p.day!=td()).forEach(p=>db.collection('products').doc(p.id).delete())}show()});if(A)orders()}
if(A){auth.onAuthStateChanged(u=>{$('lg').hidden=!!u;$('ap').hidden=!u;if(u&&!booted){booted=1;boot()}})}
else if(nm)startS();
function pin(v){if(v.length<4)return;$('err').textContent='';auth.signInWithEmailAndPassword(ADMIN_EMAIL,'fz'+v).catch(()=>{$('err').textContent='الرمز غلط';$('pn').value=''})}
function startS(){$('lg').hidden=true;$('ap').hidden=false;$('hi').textContent='هلا '+nm;if(!booted){booted=1;boot()}}
function enter(){const v=$('nm').value.trim();if(!v)return;nm=v;localStorage.nm=v;startS()}
function logout(){if(A)auth.signOut();else{localStorage.removeItem('nm');location.reload()}}
function tabs(){$('tabs').innerHTML=CATS.map(c=>`<button class="${c.id==cat?'on':''}" onclick="cat='${c.id}';tabs();show()">${c.t}</button>`).join('')}
const card=p=>`<div class="p ${p.out?'out':''}"><div class="im">${p.img?`<img src="${p.img}">`:'🍽️'}${p.out?'<i>نفذ</i>':''}${A&&p.keep?'<u>📌</u>':''}</div><b>${esc(p.name)}</b>${p.desc?`<small>${esc(p.desc)}</small>`:''}<span class="pr">${fmt(p.price)}</span>`+(A?`<div class="ac"><button onclick="edit('${p.id}')">✏️ تعديل</button><button onclick="tg('${p.id}')">${p.out?'✅ متوفر':'⛔ نفذ'}</button><button onclick="del('${p.id}')">🗑</button></div>`:`<button class="btn" ${p.out?'disabled':''} onclick="add('${p.id}')">${p.out?'نفذ':'+ أضف للسلة'}</button>`)+'</div>';
function show(){const l=P.filter(p=>p.cat==cat&&vis(p)).sort((a,b)=>(a.out?1:0)-(b.out?1:0)||(a.at||0)-(b.at||0));
$('list').innerHTML=(A?`<button class="addb" onclick="edit()">➕ إضافة ${cat=='today'?'لعروض اليوم':'منتج'}</button>`:'')+(l.length?l.map(card).join(''):`<p class="mut">${cat=='today'?'ماكو عروض اليوم':'ماكو منتجات بهذا القسم'}</p>`);bar()}
// ===== الطالب =====
function add(id){cart[id]=(cart[id]||0)+1;bar()}
function items(){return Object.keys(cart).map(id=>{const p=P.find(x=>x.id==id);return p&&!p.out&&{id,name:p.name,price:p.price,q:cart[id]}}).filter(Boolean)}
const sum=it=>it.reduce((a,x)=>a+x.price*x.q,0);
function bar(){if(A)return;const it=items(),c=it.reduce((a,x)=>a+x.q,0);$('bar').hidden=!c;$('bar').innerHTML=`<span>🛒 ${c} • ${fmt(sum(it))}</span><span>شوف السلة ◀</span>`;$('cc').hidden=!c;$('cc').textContent=c}
function openCart(){const it=items();$('cl').innerHTML=it.length?it.map(x=>`<div class="row"><span>${esc(x.name)}<br><small>${fmt(x.price)}</small></span><span class="q"><button onclick="ch('${x.id}',-1)">−</button>${x.q}<button onclick="ch('${x.id}',1)">+</button></span><b>${fmt(x.price*x.q)}</b><button class="x" onclick="rm('${x.id}')">🗑</button></div>`).join(''):'<p class="mut">السلة فاضية</p>';$('tot').textContent=fmt(sum(it));$('sb').hidden=!it.length;$('m').hidden=false}
function ch(id,d){cart[id]+=d;if(cart[id]<=0)delete cart[id];openCart();bar()}
function rm(id){delete cart[id];openCart();bar()}
async function send(){const it=items();if(!it.length)return;$('sb').disabled=true;let n;const total=sum(it);
try{const ref=db.doc('counters/orders');await db.runTransaction(async t=>{const s=await t.get(ref);n=(s.exists?s.data().n:1000)+1;t.set(ref,{n});
t.set(db.collection('orders').doc(),{n,name:nm,items:it.map(({name,price,q})=>({name,price,q})),total,status:'new',at:Date.now()})});
cart={};bar();$('m').hidden=true;$('on').textContent='#'+n;$('ot').textContent='المجموع: '+fmt(total);$('dn').hidden=false}
catch(e){alert('صار خطأ، جرب مرة ثانية')}$('sb').disabled=false}
// ===== الإدارة: المنتجات =====
function kp(){$('ekw').hidden=$('eg').value!='today'}
function edit(id){const p=P.find(x=>x.id==id)||{};eid=id||'';img='';$('en').value=p.name||'';$('ep').value=p.price||'';$('ed').value=p.desc||'';$('eg').value=p.cat||cat;$('ek').checked=!!p.keep;$('pv').src=p.img||'';$('pv').hidden=!p.img;$('et').textContent=id?'تعديل المنتج':'منتج جديد';kp();$('em').hidden=false}
function pick(f){if(!f.files[0])return;const r=new FileReader();r.onload=e=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas'),k=Math.min(1,400/Math.max(i.width,i.height));c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);img=c.toDataURL('image/jpeg',.72);$('pv').src=img;$('pv').hidden=false};i.src=e.target.result};r.readAsDataURL(f.files[0])}
async function savep(){const d={name:$('en').value.trim(),price:+$('ep').value,desc:$('ed').value.trim(),cat:$('eg').value};d.keep=$('ek').checked&&d.cat=='today';if(!d.name||!d.price)return alert('اكتب الاسم والسعر');if(img)d.img=img;
const old=P.find(x=>x.id==eid)||{};if(!old.day)d.day=td();const c=db.collection('products');
if(eid)await c.doc(eid).update(d);else await c.add({...d,out:false,at:Date.now()});$('em').hidden=true}
function tg(id){db.collection('products').doc(id).update({out:!P.find(x=>x.id==id).out})}
function del(id){confirm('تحذف المنتج؟')&&db.collection('products').doc(id).delete()}
// ===== الإدارة: الطلبات =====
function orders(){db.collection('orders').orderBy('at','desc').limit(3000).onSnapshot(s=>{if(!first)s.docChanges().forEach(c=>c.type=='added'&&ping(c.doc.data()));first=false;O=s.docs.map(d=>({id:d.id,...d.data()}));const n=O.filter(o=>o.status=='new').length;$('nb').hidden=!n;$('nb').textContent=n;rO();rA()})}
function ping(o){try{const a=new AudioContext(),s=a.createOscillator();s.connect(a.destination);s.frequency.value=880;s.start();s.stop(a.currentTime+.4)}catch(e){}
navigator.vibrate&&navigator.vibrate(300);const t=$('toast');t.hidden=false;t.textContent=`🔔 طلب جديد #${o.n} — ${o.name} — ${fmt(o.total)}`;setTimeout(()=>t.hidden=true,6000)}
const sod=t=>new Date(t).setHours(0,0,0,0);
function sts(id,s){db.collection('orders').doc(id).update({status:s})}
function rO(){const q=$('q').value.trim().replace('#',''),st=$('st').value,d=$('dy').value;
const l=O.filter(o=>(st=='all'||o.status==st)&&(d=='all'||o.at>=sod(Date.now()))&&(!q||String(o.n)==q||o.name.includes(q)));
$('ol').innerHTML=l.slice(0,150).map(o=>`<div class="card o ${o.status}"><div class="h"><b>#${o.n}</b><span>${esc(o.name)}</span><small>${new Date(o.at).toLocaleString('ar-IQ')}</small></div>${o.items.map(i=>`<div class="row"><span>${esc(i.name)} × ${i.q}</span><span>${fmt(i.price*i.q)}</span></div>`).join('')}<div class="row"><b>المجموع</b><b>${fmt(o.total)}</b></div><div class="act">${o.status=='new'?`<button class="btn" onclick="sts('${o.id}','paid')">✓ استلمت المبلغ</button><button class="btn red" onclick="sts('${o.id}','cancel')">إلغاء</button>`:`<span class="tag">${o.status=='paid'?'✅ مدفوع':'❌ ملغي'}</span><button class="btn ghost" onclick="sts('${o.id}','new')">رجوع</button>`}</div></div>`).join('')||'<p class="mut">ماكو طلبات</p>'}
// ===== الإدارة: المحاسبة =====
function range(){const n=new Date();let a,b=Infinity;if(per=='today')a=sod(n);else if(per=='week'){const d=new Date(sod(n));d.setDate(d.getDate()-6);a=+d}else if(per=='month')a=+new Date(n.getFullYear(),n.getMonth(),1);else{const[y,m]=($('mo').value||td().slice(0,7)).split('-');a=+new Date(y,m-1,1);b=+new Date(y,m,1)}return[a,b]}
const inR=()=>{const[a,b]=range();return O.filter(o=>o.at>=a&&o.at<b)};
function rA(){const l=inR(),pd=l.filter(o=>o.status=='paid'),s=pd.reduce((x,o)=>x+o.total,0);
$('sg').innerHTML=[['الطلبات المدفوعة',pd.length],['إجمالي المبيعات',fmt(s)],['متوسط الطلب',fmt(pd.length?s/pd.length:0)],['جديد / ملغي',l.filter(o=>o.status=='new').length+' / '+l.filter(o=>o.status=='cancel').length]].map(x=>`<div class="st">${x[0]}<b>${x[1]}</b></div>`).join('');
const tp={},dd={};pd.forEach(o=>{o.items.forEach(i=>{const t=tp[i.name]||(tp[i.name]={q:0,r:0});t.q+=i.q;t.r+=i.price*i.q});const k=new Date(o.at).toLocaleDateString('en-CA'),t=dd[k]||(dd[k]={n:0,s:0});t.n++;t.s+=o.total});
$('dt').innerHTML='<table><tr><th>اليوم</th><th>طلبات</th><th>مبيعات</th></tr>'+Object.keys(dd).sort().reverse().map(k=>`<tr><td>${k}</td><td>${dd[k].n}</td><td>${fmt(dd[k].s)}</td></tr>`).join('')+'</table>';
$('tp').innerHTML='<table><tr><th>المنتج</th><th>الكمية</th><th>المبيعات</th></tr>'+Object.entries(tp).sort((a,b)=>b[1].q-a[1].q).slice(0,15).map(([k,t])=>`<tr><td>${esc(k)}</td><td>${t.q}</td><td>${fmt(t.r)}</td></tr>`).join('')+'</table>'}
function csv(){const r=[['رقم','الاسم','التاريخ','المنتجات','المجموع','الحالة']];inR().forEach(o=>r.push([o.n,o.name,new Date(o.at).toLocaleString('en-CA'),o.items.map(i=>i.name+'x'+i.q).join(' + '),o.total,{new:'جديد',paid:'مدفوع',cancel:'ملغي'}[o.status]]));
const t='\ufeff'+r.map(x=>x.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n'),a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/csv'}));a.download='تقرير-الكافتريا.csv';a.click()}

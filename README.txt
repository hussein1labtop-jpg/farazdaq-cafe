خطوات التشغيل (مرة وحدة بس):
1) روح console.firebase.google.com ← Add project (اسمه أي شي) ← عطّل Analytics.
2) Build ← Firestore Database ← Create database (اختار Production mode).
3) تبويب Rules بنفس الصفحة ← امسح كل شي والصق محتوى ملف firestore.rules ← Publish.
4) Build ← Authentication ← Get started ← Sign-in method ← فعّل Email/Password ← تبويب Users ← Add user (هذا ايميل وباسورد حسابك للإدارة).
5) Project settings (ترس) ← Your apps ← اضغط </> (Web) ← سجّل التطبيق ← انسخ firebaseConfig والصق القيم داخل config.js.
6) Authentication ← Settings ← Authorized domains ← Add domain ← اكتب: USERNAME.github.io
7) ارفع كل الملفات (بدون مجلد خارجي) على GitHub Pages.
8) افتح admin.html، سجل دخول، وضيف المنتجات (لا تنسى سعر الشراء حتى يطلع الربح صح).
روابط التثبيت: student.html للطلاب، admin.html للإدارة (كل واحد يتثبت كتطبيق مستقل).

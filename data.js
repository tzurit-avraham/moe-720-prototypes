// data.js - fake data for the faculty dashboard. Edit freely.

window.APP_DATA = {
  teacher: { firstName: "יעל", fullName: "יעל הרפז" },

  groups: [
    { id: "t2", name: "כיתה ט'2", students: 36 },
    { id: "h3", name: "כיתה ח'3", students: 34 },
    { id: "tigbur-h", name: "תגבור - שכבת ח'", students: 17 },
    { id: "z-math-a", name: "כיתה ז - הקבצה א - מתמטיקה", students: 42 },
    { id: "focus-t", name: "מיקוד - שכבה ט'", students: 6 }
  ],

  // Shown before any group is picked
  totalStudents: 96,

  stats: {
    active: "13",
    attention: "12",
    avgTime: { value: "35", unit: "דקות" },
    tutor: { questions: "15", minutes: "125" },
    units: { value: "2", note: "3 תלמידים לא השלימו בכלל" },
    steps: { value: "36", note: "כל התלמידים השלימו לפחות שלב 1" },
    success: { value: "89%", trend: "+6%" }
  }
};

// Landing page (landing.html) text, Hebrew and Arabic. Keys match data-i18n in the HTML.
// Story order: promise (hero) -> the problem -> Kali in action (video)
// -> how it works (pillars) -> try it yourself (demo) -> call to action.
window.LANDING_I18N = {
  he: {
    tagBadge: "DEMO",
    brandText: "פרויקט 720 · סביבת הדגמה חיה",
    ctaLogin: "כניסה למערכת",

    // 1. Promise
    heroBadge: "סוכנת למידה אישית מבוססת AI · פרויקט 720",
    heroTitle: "זה כל הסיפור.",
    heroSubtitle: "כל הכיתה לומדת את אותו הסיפור. כל תלמיד לומד אותו ברמה שלו. והמורה רואה הכול.",
    heroCtaBtn: "היכנסו לסביבת ההדגמה",
    heroCtaNote: "פתוחה למורים, למנהלים ולצוותי פדגוגיה",
    heroCardPill: "צפו בקאלי מלמדת",

    // 2. The problem
    problemEyebrow: "האתגר",
    problemTitle: "כיתה אחת. ארבע רמות. שיעור אחד.",
    problemText: "בשיעור אנגלית רגיל יושבים זה לצד זה תלמידים שרק מתחילים ותלמידים שכבר קוראים בשטף. כשכולם לומדים באותה רמה:",
    problem1: "התלמידים המתקדמים משתעממים",
    problem2: "התלמידים המתחילים נשארים מאחור",
    problem3: "ולמורה אין דרך להגיע לכולם",
    problemClose: "קאלי נבנתה בדיוק בשביל זה.",
    problemCta: "ראו איך זה עובד",

    // 3. Kali in action
    videoEyebrow: "קאלי בפעולה",
    videoTitle: "ראו את קאלי מלמדת: שיעור אמיתי ב־2 דקות",
    videoSub: "צפו איך קאלי מובילה שיעור מתחילתו ועד סופו, ומאפשרת לכל תלמיד להתקדם בקצב שלו.",
    videoTag: "שיעור אנגלית · כיתות ז׳–ח׳",
    videoTime: "אורך הסרטון: 2:04 דק׳",

    // 4. How it works
    pillarsEyebrow: "איך זה עובד",
    pillarsTitle: "שלושה עקרונות שעושים את ההבדל",
    pillarsSub: "עלילה משותפת, הוראה מותאמת לכל תלמיד, ושליטה מלאה בידי המורה.",
    p1Title: "סיפור אחד לכל הכיתה",
    p1Desc: "תשע יחידות לימוד סביב עלילה אחת. כל הכיתה עוקבת אחרי אותו סיפור ויכולה לדבר עליו יחד, אבל הטקסט, המשימות ואוצר המילים מותאמים לכל תלמיד באחת מארבע רמות.",
    p2Title: "קאלי מלמדת, פנים מול פנים",
    p2Desc: "לא עוד צ'אטבוט בפינת המסך. קאלי היא מורה-אוואטר שמובילה את השיעור: מדברת, שואלת, מקשיבה ומלווה את התלמיד בכל שלב, מהגדרת המטרה ועד בדיקת השליטה.",
    p3Title: "המורה תמיד בשליטה",
    p3Desc: "דשבורד בזמן אמת מראה מי מתקדם, מי נתקע ומי צריך עזרה עכשיו, ומציע תובנות מוכנות לפגישת המנטורינג הבאה.",
    chipGoal: "מטרה",
    chipWords: "מילים",
    chipQuestions: "שאלות",
    chipPronounce: "הגייה",
    chipMastery: "שליטה",
    chipRealtime: "מעקב בזמן אמת",
    chipAlerts: "התראות קושי",
    chipInsights: "תובנות פדגוגיות",

    // 5. Try it yourself
    demoEyebrow: "נסו בעצמכם",
    demoExpTitle: "מה מחכה לכם בסביבת ההדגמה",
    demoExpSub: "התחברו וחוו את שני צידי הכיתה: את השיעור דרך עיני התלמיד, ואת התמונה המלאה דרך עיני המורה.",
    w1Title: "יחידות הלימוד",
    w1Desc: "עיינו ביחידות שנבנו לפי תוכנית הלימודים, עם משימות כתיבה, דיבור והאזנה.",
    w2Title: "שיעור עם קאלי",
    w2Desc: "היכנסו לנעלי התלמיד: נהלו שיחה פנים מול פנים עם קאלי וקבלו משוב מיידי על הגייה והבנה.",
    w3Title: "דשבורד המורה",
    w3Desc: "ראו את תמונת המצב של הכיתה במבט אחד: מי בכל רמה, מי זקוק לעזרה ואיך מתקדמת כל יחידה.",
    w4Title: "פגישות מנטורינג",
    w4Desc: "תעדו פגישות אישיות, הגדירו יעדים לכל תלמיד ושמרו על רצף פדגוגי מפגישה לפגישה.",

    // 6. Call to action
    bottomTitle: "מוכנים לראות את זה בכיתה שלכם?",
    bottomDesc: "היכנסו עם פרטי הגישה שקיבלתם, וגלו איך קאלי עוזרת לכל תלמיד להצליח ומשאירה את המורה בשליטה מלאה.",
    bottomCtaBtn: "היכנסו לסביבת ההדגמה",
    trustKaltura: "Kaltura · מובילה עולמית בטכנולוגיות וידאו ולמידה",
    trustSec: "אבטחת מידע ונגישות מלאה",
    trustMoe: "ספק סוכן למידה מאושר במשרד החינוך"
  },
  ar: {
    tagBadge: "DEMO",
    brandText: "مشروع 720 · بيئة العرض التوضيحي المباشرة",
    ctaLogin: "تسجيل الدخول",

    // 1. Promise
    heroBadge: "وكيلة تعلّم شخصية بالذكاء الاصطناعي · مشروع 720",
    heroTitle: "هذه هي القصة كلها.",
    heroSubtitle: "الصف كله يتعلم القصة نفسها. كل طالب يتعلمها بمستواه. والمعلم يرى كل شيء.",
    heroCtaBtn: "ادخلوا إلى بيئة العرض التوضيحي",
    heroCtaNote: "متاحة للمعلمين والمديرين وطواقم التربية",
    heroCardPill: "شاهدوا كالي وهي تُعلّم",

    // 2. The problem
    problemEyebrow: "التحدي",
    problemTitle: "صف واحد. أربعة مستويات. درس واحد.",
    problemText: "في حصة الإنجليزية العادية يجلس جنبًا إلى جنب طلاب بدأوا للتو وطلاب يقرؤون بطلاقة. وعندما يتعلم الجميع بالمستوى نفسه:",
    problem1: "الطلاب المتقدمون يشعرون بالملل",
    problem2: "الطلاب المبتدئون يتأخرون",
    problem3: "والمعلم لا يستطيع الوصول إلى الجميع",
    problemClose: "كالي صُمّمت من أجل ذلك بالضبط.",
    problemCta: "شاهدوا كيف يعمل",

    // 3. Kali in action
    videoEyebrow: "كالي أثناء العمل",
    videoTitle: "شاهدوا كالي وهي تُعلّم: درس حقيقي في دقيقتين",
    videoSub: "تابعوا كيف تقود كالي الدرس من بدايته إلى نهايته، وتتيح لكل طالب أن يتقدم بسرعته.",
    videoTag: "درس لغة إنجليزية · الصفوف 7–8",
    videoTime: "مدة الفيديو: 2:04 دقيقة",

    // 4. How it works
    pillarsEyebrow: "كيف يعمل",
    pillarsTitle: "ثلاثة مبادئ تصنع الفرق",
    pillarsSub: "قصة مشتركة، وتعليم مُكيَّف لكل طالب، وتحكم كامل بيد المعلم.",
    p1Title: "قصة واحدة للصف كله",
    p1Desc: "تسع وحدات تعليمية حول حبكة واحدة. يتابع الصف كله القصة نفسها ويمكنه النقاش فيها معًا، لكن النصوص والمهام والمفردات مُكيَّفة لكل طالب في أحد أربعة مستويات.",
    p2Title: "كالي تُعلّم وجهًا لوجه",
    p2Desc: "ليست روبوت محادثة في زاوية الشاشة. كالي معلمة افتراضية تقود الدرس: تتحدث وتسأل وتصغي وترافق الطالب في كل خطوة، من تحديد الهدف حتى فحص التمكّن.",
    p3Title: "المعلم دائمًا في موقع التحكم",
    p3Desc: "لوحة متابعة فورية تُظهر من يتقدم ومن تعثّر ومن يحتاج إلى مساعدة الآن، وتقدّم رؤى جاهزة للقاء التوجيه القادم.",
    chipGoal: "الهدف",
    chipWords: "الكلمات",
    chipQuestions: "الأسئلة",
    chipPronounce: "النطق",
    chipMastery: "التمكن",
    chipRealtime: "متابعة فورية",
    chipAlerts: "تنبيهات الصعوبة",
    chipInsights: "رؤى تربوية",

    // 5. Try it yourself
    demoEyebrow: "جرّبوا بأنفسكم",
    demoExpTitle: "ما الذي ينتظركم في بيئة العرض التوضيحي",
    demoExpSub: "سجّلوا الدخول وعيشوا جانبي الصف: الدرس بعيون الطالب، والصورة الكاملة بعيون المعلم.",
    w1Title: "الوحدات التعليمية",
    w1Desc: "تصفّحوا وحدات بُنيت وفق المنهج الدراسي، مع مهام كتابة وتحدث واستماع.",
    w2Title: "درس مع كالي",
    w2Desc: "ضعوا أنفسكم مكان الطالب: أجروا محادثة وجهًا لوجه مع كالي واحصلوا على ملاحظات فورية حول النطق والفهم.",
    w3Title: "لوحة المعلم",
    w3Desc: "شاهدوا صورة الصف بنظرة واحدة: من في كل مستوى، ومن يحتاج إلى مساعدة، وكيف تتقدم كل وحدة.",
    w4Title: "لقاءات التوجيه",
    w4Desc: "وثّقوا اللقاءات الفردية، وحدّدوا أهدافًا لكل طالب، وحافظوا على استمرارية تربوية من لقاء إلى آخر.",

    // 6. Call to action
    bottomTitle: "مستعدون لرؤية ذلك في صفكم؟",
    bottomDesc: "ادخلوا ببيانات الدخول التي حصلتم عليها، واكتشفوا كيف تساعد كالي كل طالب على النجاح وتُبقي المعلم في موقع التحكم الكامل.",
    bottomCtaBtn: "ادخلوا إلى بيئة العرض التوضيحي",
    trustKaltura: "Kaltura · رائدة عالمية في تكنولوجيا الفيديو والتعلم",
    trustSec: "أمان معلومات كامل وإمكانية وصول شاملة",
    trustMoe: "مزود وكيل تعلم معتمد لدى وزارة التربية والتعليم"
  }
};

// Design concepts for concepts.html (the picker panel). id = class on the page root.
// All use the graphic language of the Figma "Illustrations" file: flat brand shapes,
// the blue ribbon wave, speech bubbles, tilted cards and the red play card.
window.CONCEPTS = [
  { id: "d1", theme: "dark",  name: "זרקור",          desc: "המראה של kaltura.com: זוהר מותגי, כרטיס וידאו ואלמנטים מהאיורים שמרחפים סביבו." },
  { id: "d2", theme: "dark",  name: "הסרט הכחול",     desc: "סרט כחול גלי מהאיורים זורם לאורך העמוד ומחבר בין הפרקים. מינימליסטי, כרטיסים עם מסגרת דקה." },
  { id: "d3", theme: "dark",  name: "שיחה",           desc: "העמוד כשיחה: בכותרת קאלי ותלמידה מדברות, והבעיות מוצגות כבועות צ׳אט." },
  { id: "d4", theme: "dark",  name: "בנטו",           desc: "רשת של אריחים צבעוניים בגדלים שונים, כל רעיון באריח משלו, כמו לוח מוצר." },
  { id: "d5", theme: "dark",  name: "קולנוע",         desc: "הווידאו הוא הבמה: הכותרת על הפוסטר, כרטיס פליי אדום גדול, והעקרונות כפס סרט נגלל." },
  { id: "l1", theme: "light", name: "שמיים",          desc: "רקע תכלת כמו בקובץ האיורים, האיור הראשי לצד הכותרת, כרטיסים לבנים ונקיים." },
  { id: "l2", theme: "light", name: "קולאז׳",          desc: "כרטיסים מוטים כמו מדבקות עם סלוטייפ, קשקושים ובועות. שובב ומלא אנרגיה." },
  { id: "l3", theme: "light", name: "מגזין",          desc: "טיפוגרפיה ענקית, הדגשת מרקר צהובה ומספרים במתאר. נקי, בטוח, מעט איורים." },
  { id: "l4", theme: "light", name: "בלוקים של צבע",  desc: "כל פרק בצבע מותג מלא, צהוב, ורוד, תכלת ואדום, עם כרטיסים לבנים מעליו." },
  { id: "l5", theme: "light", name: "ספר סיפורים",    desc: "העמוד כספר קומיקס: פאנלים עם מסגרת וצל, פרקים ובועות דיבור. ״זה כל הסיפור״ ממש." }
];

// Unit page (unit.html): one learning unit and its lessons.
window.UNIT_DATA = {
  subject: "English",
  title: "Unit 1: Send a Message!",
  goals: "Describe your smartphone and phone habits (There is / There are, Present Simple, Who / What questions), scan forum replies, read and explain a survey bar graph, and read about teens who use phones to help others.",
  topic: "Technology & Digital Life",
  subtopic: "Smartphones & Online Communication",

  // Learning goals per CEFR level, shown when a lesson row is expanded
  levelGoals: [
    { level: "A1", text: "Can understand some words and expressions when people are talking about themselves, family, school, hobbies or surroundings" },
    { level: "A2", text: "I can say hello and goodbye in English" },
    { level: "B1", text: "I can understand some English words when people talk about themselves, their family, school and hobbies" },
    { level: "B2", text: "I can understand some English words when people talk about themselves, their family, school and hobbies" }
  ],

  lessons: [
    { name: "Talk to Jerry", mandatory: false, purpose: "הוראה", skills: 4, mastery: "בסיסי", minutes: 15, difficulty: 2 },
    { name: "Talk to Jerry", mandatory: false, purpose: "הוראה", skills: 4, mastery: "בסיסי", minutes: 15, difficulty: 2 },
    { name: "What Do People Do with Their Phones?", mandatory: false, purpose: "תרגול", skills: 4, mastery: "בסיסי", minutes: 18, difficulty: 3 },
    { name: "Danny Helps", mandatory: true, purpose: "תרגול", skills: 4, mastery: "ממוצע", minutes: 12, difficulty: 3 },
    { name: "Debby and Roy Help", mandatory: true, purpose: "הוראה", skills: 4, mastery: "ממוצע", minutes: 14, difficulty: 2 },
    { name: "Ask Like a Reporter", mandatory: false, purpose: "תרגול", skills: 4, mastery: "מתקדם", minutes: 10, difficulty: 2 },
    { name: "My Message to Jerry", mandatory: false, purpose: "תרגול", skills: 4, mastery: "מתקדם", minutes: 10, difficulty: 2 }
  ]
};

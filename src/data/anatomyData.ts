export type SystemId = 'digestive' | 'cardiovascular' | 'endocrine';
export type TabId = SystemId | 'mixed';

export interface OrganItem {
  id: string;
  system: SystemId;
  name: string;
  latinName: string;
  category: string;
  locationAndStructure: string;
  mainFunction: string;
  physiologicalRole: string;
  cluePrompt: string;
  ospeTip: string;
  keyFacts: string[];
}

export interface PhysiologyStep {
  title: string;
  detail: string;
  highlightOrganIds: string[];
}

export interface PhysiologyFlow {
  id: string;
  system: SystemId;
  title: string;
  summary: string;
  steps: PhysiologyStep[];
}

export interface QuizQuestion {
  id: string;
  system: SystemId;
  relatedOrganId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const SYSTEM_META: Record<
  SystemId,
  { label: string; shortLabel: string; subtitle: string; accentColor: string }
> = {
  digestive: {
    label: 'Sistem Pencernaan',
    shortLabel: 'Pencernaan',
    subtitle: 'Saluran gastrointestinal, organ aksesoris, enzim, serta alur digesti dan defekasi',
    accentColor: '#0F766E',
  },
  cardiovascular: {
    label: 'Sistem Cardiovaskuler',
    shortLabel: 'Cardiovaskuler',
    subtitle: 'Lapisan dinding jantung, 4 ruang, 4 katup, pembuluh besar, dan konduksi listrik',
    accentColor: '#BE123C',
  },
  endocrine: {
    label: 'Sistem Endokrin',
    shortLabel: 'Endokrin',
    subtitle: 'Kelenjar hormon utama, aksis hipotalamus-hipofisis, dan umpan balik negatif',
    accentColor: '#0284C7',
  },
};

export const ORGANS: OrganItem[] = [
  // ===================== 1. SISTEM PENCERNAAN =====================
  {
    id: 'dig-cavum-oris',
    system: 'digestive',
    name: 'Kavum Oris (Rongga Mulut)',
    latinName: 'Cavum Oris',
    category: 'Saluran Atas',
    locationAndStructure:
      'Pintu masuk saluran cerna. Tersusun atas palatum durum (langit-langit keras bertulang di anterior), palatum molle (langit-langit lunak berotot di posterior) dengan uvula di ujungnya, lidah (lingua) berotot rangka, serta gigi (dentes) untuk mastikasi.',
    mainFunction:
      'Menerima makanan (ingesti), melakukan penghancuran mekanik oleh gigi, serta mencampur makanan dengan saliva menggunakan lidah untuk membentuk bolus.',
    physiologicalRole:
      'Saat menelan, palatum molle dan uvula terangkat menutup nasofaring agar bolus tidak masuk ke rongga hidung. Lidah mendorong bolus ke orofaring untuk memicu refleks menelan.',
    cluePrompt:
      'Rongga pintu masuk pencernaan yang memiliki palatum durum, palatum molle, uvula, lidah, dan gigi untuk membentuk bolus.',
    ospeTip: 'Bedakan palatum durum (keras, anterior) dan palatum molle (lunak, menutup nasofaring saat menelan).',
    keyFacts: ['Palatum durum & molle', 'Uvula & Lingua', 'Pembentukan bolus'],
  },
  {
    id: 'dig-saliva',
    system: 'digestive',
    name: 'Kelenjar Saliva',
    latinName: 'Glandulae Salivariae',
    category: 'Organ Aksesoris Oral',
    locationAndStructure:
      'Terdiri dari 3 pasang kelenjar eksokrin: Parotis (terbesar, di anterior-inferior telinga), Submandibularis (di dasar mulut dekat mandibula), dan Sublingualis (paling kecil, di bawah lidah).',
    mainFunction:
      'Memproduksi saliva (1–1,5 L/hari) yang mengandung air, mukus pelumas, lisozim antibakteri, dan enzim amilase saliva (ptialin).',
    physiologicalRole:
      'Memulai digesti kimiawi karbohidrat (amilum menjadi maltosa) sejak di rongga mulut dan melarutkan molekul rasa agar dapat dideteksi papila lidah.',
    cluePrompt:
      'Tiga pasang kelenjar eksokrin (parotis, submandibularis, sublingualis) yang mensekresikan enzim amilase/ptialin.',
    ospeTip: 'Parotis adalah kelenjar saliva terbesar (duktus Stensen bermuara di dekat molar kedua atas).',
    keyFacts: ['Parotis · Submandibularis · Sublingualis', 'Enzim ptialin (amilase)', 'pH saliva 6,5–7,5'],
  },
  {
    id: 'dig-pharynx',
    system: 'digestive',
    name: 'Faring',
    latinName: 'Pharynx',
    category: 'Saluran Atas',
    locationAndStructure:
      'Saluran fibromuskular sepanjang ±12–14 cm di posterior rongga hidung, mulut, dan laring. Terbagi menjadi 3 bagian: Nasofaring, Orofaring, dan Laringofaring (hipofaring).',
    mainFunction:
      'Menghubungkan kavum oris ke esofagus serta menjadi persimpangan jalur udara (respirasi) dan makanan (digesti).',
    physiologicalRole:
      'Pada fase faringeal menelan, otot konstriktor faring berkontraksi mendorong bolus ke esofagus sementara epiglotis menutup aditus laringis agar bolus tidak masuk ke trakea.',
    cluePrompt:
      'Saluran persimpangan napas-cerna yang terbagi atas nasofaring, orofaring, dan laringofaring serta berperan dalam refleks menelan.',
    ospeTip: 'Orofaring dan laringofaring dilalui makanan; nasofaring khusus udara dan tertutup palatum molle saat menelan.',
    keyFacts: ['Nasofaring · Orofaring · Laringofaring', 'Fase faringeal menelan', 'Proteksi jalan napas oleh epiglotis'],
  },
  {
    id: 'dig-esophagus',
    system: 'digestive',
    name: 'Esofagus',
    latinName: 'Oesophagus',
    category: 'Saluran Atas',
    locationAndStructure:
      'Tabung muskular lurus sepanjang ±25 cm di posterior trakea, berjalan di mediastinum posterior dan menembus diafragma melalui hiatus esofagus menuju lambung.',
    mainFunction:
      'Menyalurkan bolus dari faring ke lambung menggunakan gelombang kontraksi otot terkoordinasi (gerak peristaltik).',
    physiologicalRole:
      'Memiliki sfingter esofagus atas dan bawah (LES/kardia). LES berelaksasi saat bolus tiba dan menutup kembali untuk mencegah refluks asam lambung (GERD).',
    cluePrompt:
      'Saluran muskular sepanjang ±25 cm yang menembus diafragma untuk menghantarkan bolus dari faring ke lambung melalui gerak peristaltik.',
    ospeTip: 'Ingat ukuran standar OSPE: Esofagus ±25 cm; sepertiga atas otot lurik, tengah campuran, bawah otot polos.',
    keyFacts: ['Panjang ±25 cm', 'Gerak peristaltik', 'Sfingter esofagus bawah (LES)'],
  },
  {
    id: 'dig-stomach',
    system: 'digestive',
    name: 'Lambung (Gaster)',
    latinName: 'Gaster / Ventriculus',
    category: 'Saluran Tengah',
    locationAndStructure:
      'Kantong muskular berbentuk huruf J di kuadran kiri atas abdomen (regio epigastrika & hipokondrium kiri). Bagian utamanya: Kardia, Fundus (kubah atas), Korpus (badan utama), dan Pilorus (ujung distal dengan sfingter pilorus).',
    mainFunction:
      'Menampung makanan sementara, mencerna protein secara kimiawi oleh enzim pepsin (aktivasi pepsinogen oleh HCl), dan mengaduk makanan menjadi bubur kim (chyme).',
    physiologicalRole:
      'Sel parietal mensekresi HCl (pH 1,5–2,0) untuk membunuh patogen dan faktor intrinsik untuk absorpsi B12; sel utama (chief cell) mensekresi pepsinogen yang diubah menjadi pepsin.',
    cluePrompt:
      'Organ berbentuk huruf J dengan bagian fundus, korpus, dan pilorus yang menghasilkan enzim pepsin serta mengubah bolus menjadi bubur kim.',
    ospeTip: 'Wajib hafal 3 bagian utama (Fundus, Korpus, Pilorus), enzim Pepsin untuk protein, dan hasil adukan berupa bubur kim.',
    keyFacts: ['Fundus · Korpus · Pilorus', 'Enzim pepsin & HCl', 'Membentuk bubur kim'],
  },
  {
    id: 'dig-liver',
    system: 'digestive',
    name: 'Hati (Hepar)',
    latinName: 'Hepar',
    category: 'Organ Aksesoris',
    locationAndStructure:
      'Kelenjar terbesar tubuh dengan berat ±1,5 kg, terletak di kuadran kanan atas abdomen tepat di bawah diafragma. Terdiri atas lobus dekstra (lebih besar) dan lobus sinistra yang dipisahkan ligamen falsiformis.',
    mainFunction:
      'Memproduksi cairan empedu (garam empedu untuk emulsifikasi lemak), metabolisme karbohidrat-protein-lemak, sintesis albumin & faktor pembekuan darah, serta detoksifikasi obat/toksin.',
    physiologicalRole:
      'Menerima darah kaya nutrien dari saluran cerna melalui vena porta hepatika sebelum masuk ke sirkulasi sistemik (first-pass metabolism) serta menyalurkan empedu melalui duktus hepatikus.',
    cluePrompt:
      'Organ aksesoris terbesar seberat ±1,5 kg di kuadran kanan atas yang memproduksi empedu dan melakukan detoksifikasi.',
    ospeTip: 'Bedakan fungsi Hati (memproduksi empedu, ±1,5 kg) dengan Kantung Empedu (menyimpan & memekatkan empedu).',
    keyFacts: ['Berat ±1,5 kg', 'Produksi cairan empedu', 'Metabolisme & detoksifikasi'],
  },
  {
    id: 'dig-gallbladder',
    system: 'digestive',
    name: 'Kantung Empedu',
    latinName: 'Vesica Biliaris / Vesica Fellea',
    category: 'Organ Aksesoris',
    locationAndStructure:
      'Kantong berbentuk buah pir sepanjang 8–12 cm yang menempel pada permukaan inferior lobus kanan hati, terhubung ke duktus biliaris komunis melalui duktus sistikus.',
    mainFunction:
      'Menyimpan, menampung, dan memekatkan cairan empedu yang diproduksi oleh hati hingga dibutuhkan saat makanan berlemak masuk ke duodenum.',
    physiologicalRole:
      'Hormon kolesistokinin (CCK) dari duodenum merangsang kontraksi dinding kantung empedu dan relaksasi sfingter Oddi sehingga empedu mengalir mengemulsikan lemak.',
    cluePrompt:
      'Kantong berbentuk pir berukuran 8–12 cm di bawah lobus kanan hati yang menyimpan dan memekatkan cairan empedu.',
    ospeTip: 'Ukuran kunci OSPE: 8–12 cm. Kontraksinya dipicu hormon CCK saat ada lemak di duodenum.',
    keyFacts: ['Panjang 8–12 cm', 'Menyimpan & memekatkan empedu', 'Emulsifikasi lemak di duodenum'],
  },
  {
    id: 'dig-pancreas',
    system: 'digestive',
    name: 'Pankreas (Eksokrin)',
    latinName: 'Pancreas',
    category: 'Organ Aksesoris',
    locationAndStructure:
      'Organ retroperitoneal memanjang (±15 cm) di belakang lambung. Terbagi menjadi Kaput (kepala di lengkung C duodenum), Korpus (badan), dan Kauda/Ekor (mengarah ke limpa).',
    mainFunction:
      'Bagian eksokrin (sel asinar) memproduksi getah pankreas berisi enzim amilase, lipase, tripsinogen/kimotripsinogen, serta ion bikarbonat (HCO3-) untuk menetralkan asam lambung.',
    physiologicalRole:
      'Bikarbonat menetralkan bubur kim asam di duodenum menjadi pH basa (±7,5–8) agar enzim pencernaan bekerja optimal; bagian endokrinnya (Pulau Langerhans) mengatur gula darah.',
    cluePrompt:
      'Organ retroperitoneal dengan bagian kaput, korpus, dan ekor yang menghasilkan enzim pencernaan (amilase, lipase, tripsin) serta bikarbonat.',
    ospeTip: 'Kaput pankreas berada tepat di lengkung C duodenum; duktus pankreatikus bermuara di papila duodeni mayor.',
    keyFacts: ['Kaput · Korpus · Ekor', 'Amilase, Lipase, Tripsin', 'Bikarbonat penetral kim'],
  },
  {
    id: 'dig-small-intestine',
    system: 'digestive',
    name: 'Usus Halus',
    latinName: 'Intestinum Minor',
    category: 'Saluran Tengah',
    locationAndStructure:
      'Saluran berliku sepanjang ±6–7 meter dengan vili dan mikrovili. Terdiri dari 3 segmen: Duodenum (±25 cm, berbentuk huruf C), Jejunum (2–3 m, vili paling lebat), dan Ileum (4–5 m, berakhir di katup ileosekal).',
    mainFunction:
      'Lokasi utama pencernaan enzimatik lanjutan dan absorpsi >90% zat gizi (monosakarida, asam amino, asam lemak, vitamin, dan air).',
    physiologicalRole:
      'Duodenum menerima kim, empedu, dan enzim pankreas; Jejunum menyerap sebagian besar karbohidrat & protein; Ileum menyerap vitamin B12 dan garam empedu kembali ke sirkulasi enterohepatik.',
    cluePrompt:
      'Saluran absorpsi utama yang terdiri dari duodenum (±25 cm), jejunum (2–3 m), dan ileum (4–5 m).',
    ospeTip: 'Hafalkan panjang segmen: Duodenum ±25 cm, Jejunum 2–3 m, Ileum 4–5 m.',
    keyFacts: ['Duodenum ±25 cm', 'Jejunum 2–3 m · Ileum 4–5 m', 'Vili & mikrovili absorpsi'],
  },
  {
    id: 'dig-large-intestine',
    system: 'digestive',
    name: 'Usus Besar',
    latinName: 'Intestinum Mayor',
    category: 'Saluran Bawah',
    locationAndStructure:
      'Saluran berdiameter lebar (±1,5 m) dengan kantong haustra dan taenia coli yang membingkai usus halus. Bagiannya: Sekum, Apendiks vermiformis, Kolon Asendens, Kolon Transversum, Kolon Desendens, dan Kolon Sigmoid.',
    mainFunction:
      'Mengabsorpsi sisa air dan elektrolit dari kim cair, memadatkan sisa pencernaan menjadi feses, serta menjadi tempat sintesis vitamin K dan B oleh bakteri flora normal.',
    physiologicalRole:
      'Apendiks berperan dalam jaringan limfoid mukosa; gerakan massa (mass movement) di kolon mendorong feses ke kolon sigmoid lalu masuk ke rektum.',
    cluePrompt:
      'Saluran berhaustra yang mencakup sekum, apendiks, serta kolon asendens, transversum, desendens, dan sigmoid untuk menyerap air.',
    ospeTip: 'Titik McBurney di kuadran kanan bawah merupakan proyeksi lokasi apendiks vermiformis pada sekum.',
    keyFacts: ['Sekum & Apendiks', 'Kolon Asendens–Transversum–Desendens–Sigmoid', 'Absorpsi air & sintesis Vit K'],
  },
  {
    id: 'dig-rectum-anus',
    system: 'digestive',
    name: 'Rektum & Anus',
    latinName: 'Rectum et Canalis Analis',
    category: 'Saluran Terminal',
    locationAndStructure:
      'Rektum (±12–15 cm) berada di rongga pelvis anterior sakrum sebagai ruang tampung feses. Kanalis analis berakhir di anus yang dikelilingi dua cincin otot: Sfingter Ani Internus (otot polos) dan Sfingter Ani Eksternus (otot lurik).',
    mainFunction:
      'Menyimpan feses sementara sebelum eliminasi dan mengontrol pengeluaran feses secara involunter maupun sadar.',
    physiologicalRole:
      'Distensi rektum memicu refleks defekasi: sfingter ani internus (polos/involunter) berelaksasi secara refleks, sedangkan sfingter ani eksternus (lurik/volunter) dikendalikan secara sadar oleh korteks serebri.',
    cluePrompt:
      'Bagian terminal saluran cerna dengan sfingter otot polos (involunter) dan otot lurik (volunter) yang mengatur refleks defekasi.',
    ospeTip: 'Waspada soal OSPE: Sfingter internus = otot polos (otonom/tak sadar); Sfingter eksternus = otot lurik (somatik/sadar).',
    keyFacts: ['Rektum penampung feses', 'Sfingter internus (polos)', 'Sfingter eksternus (lurik)'],
  },

  // ===================== 2. SISTEM CARDIOVASKULER =====================
  {
    id: 'cv-pericardium',
    system: 'cardiovascular',
    name: 'Perikardium',
    latinName: 'Pericardium',
    category: 'Lapisan Dinding Jantung',
    locationAndStructure:
      'Kantong fibroserosa berlapis ganda yang membungkus seluruh jantung dan pangkal pembuluh darah besar. Tersusun atas perikardium fibrosa di luar serta perikardium serosa (parietal & viseral/epikardium) dengan rongga berisi ±15–50 mL cairan serosa.',
    mainFunction:
      'Melindungi jantung dari trauma dan infeksi, menjaga posisi jantung di mediastinum, mencegah overdistensi ruang jantung, dan mengurangi gesekan saat jantung berdetak.',
    physiologicalRole:
      'Cairan perikardial bertindak sebagai pelumas mekanis selama siklus sistolik-diastolik; penumpukan cairan berlebih dapat menyebabkan tamponade jantung.',
    cluePrompt:
      'Lapisan kantong pelindung terluar jantung yang memiliki cairan serosa untuk mencegah gesekan saat jantung memompa.',
    ospeTip: 'Perikardium viseral juga dikenal sebagai epikardium (lapisan paling luar dinding jantung).',
    keyFacts: ['Lapisan terluar jantung', 'Rongga berisi cairan serosa', 'Cegah gesekan & overdistensi'],
  },
  {
    id: 'cv-myocardium',
    system: 'cardiovascular',
    name: 'Miokardium',
    latinName: 'Myocardium',
    category: 'Lapisan Dinding Jantung',
    locationAndStructure:
      'Lapisan tengah dan paling tebal dari dinding jantung, tersusun atas jaringan otot jantung (kardiomiosit) lurik bercabang yang terhubung oleh diskus interkalaris. Paling tebal pada ventrikel sinistra.',
    mainFunction:
      'Menghasilkan gaya kontraksi mekanis untuk memompa darah ke sirkulasi pulmonal dan sirkulasi sistemik.',
    physiologicalRole:
      'Diskus interkalaris (gap junction) memungkinkan potensial aksi menyebar cepat antarsel sehingga seluruh otot atrium atau ventrikel berkontraksi secara sinkron (sinsitium fungsional).',
    cluePrompt:
      'Lapisan otot tengah dinding jantung yang paling tebal (terutama di ventrikel kiri) dan berfungsi memompa darah.',
    ospeTip: 'Miokardium ventrikel kiri ±3 kali lebih tebal dibanding ventrikel kanan karena melawan tahanan sistemik tinggi.',
    keyFacts: ['Lapisan otot jantung tengah', 'Diskus interkalaris', 'Tertebal di ventrikel sinistra'],
  },
  {
    id: 'cv-endocardium',
    system: 'cardiovascular',
    name: 'Endokardium',
    latinName: 'Endocardium',
    category: 'Lapisan Dinding Jantung',
    locationAndStructure:
      'Lapisan terdalam berupa selapis epitel pipih selapis (endotel) halus yang melapisi seluruh permukaan dalam keempat ruang jantung, trabekula karneae, serta membentuk lipatan katup jantung.',
    mainFunction:
      'Menyediakan permukaan licin bebas hambatan agar darah mengalir lancar tanpa memicu pembekuan darah (trombus) di dalam ruang jantung.',
    physiologicalRole:
      'Berkelanjutan langsung dengan tunika intima seluruh pembuluh darah besar dan melindungi sistem konduksi subendokardial (serabut Purkinje).',
    cluePrompt:
      'Lapisan endotel terdalam yang licin melapisi ruang dalam jantung dan membentuk katup jantung.',
    ospeTip: 'Infeksi pada lapisan ini disebut endokarditis yang sering menyerang daun katup jantung.',
    keyFacts: ['Lapisan terdalam (endotel)', 'Permukaan licin cegah trombus', 'Membentuk daun katup'],
  },
  {
    id: 'cv-ra',
    system: 'cardiovascular',
    name: 'Atrium Dextra (Atrium Kanan)',
    latinName: 'Atrium Dextrum',
    category: 'Ruang Jantung',
    locationAndStructure:
      'Ruang jantung kanan atas dengan dinding tipis. Menerima muara Vena Cava Superior, Vena Cava Inferior, dan Sinus Koronarius. Pada dinding superiornya terdapat SA Node.',
    mainFunction:
      'Menampung darah deoksigenasi (miskin O2, kaya CO2) yang kembali dari seluruh sirkulasi sistemik dan otot jantung, lalu meneruskannya ke ventrikel kanan.',
    physiologicalRole:
      'Sekitar 70–80% darah mengalir pasif ke ventrikel kanan saat diastole, sisanya (20–30%) didorong oleh kontraksi atrium (atrial kick) melewati katup trikuspidalis.',
    cluePrompt:
      'Ruang kanan atas jantung yang menerima darah miskin oksigen dari vena cava superior dan inferior.',
    ospeTip: 'Ingat posisi anatomis: Sisi kanan pasien berada di sebelah kiri pengamat gambar!',
    keyFacts: ['Terima darah dari VCS & VCI', 'Darah miskin O2 (vena)', 'Lokasi SA Node'],
  },
  {
    id: 'cv-rv',
    system: 'cardiovascular',
    name: 'Ventrikel Dextra (Ventrikel Kanan)',
    latinName: 'Ventriculus Dexter',
    category: 'Ruang Jantung',
    locationAndStructure:
      'Ruang jantung kanan bawah berbentuk bulan sabit dengan dinding otot lebih tipis dibanding ventrikel kiri. Di dalamnya terdapat muskulus papilaris dan korda tendinea.',
    mainFunction:
      'Memompa darah deoksigenasi melewati katup semilunaris pulmonal masuk ke arteri pulmonalis menuju paru-paru (sirkulasi pulmonal).',
    physiologicalRole:
      'Bekerja pada tekanan sistolik lebih rendah (±25 mmHg) karena resistensi pembuluh paru rendah.',
    cluePrompt:
      'Ruang kanan bawah jantung yang memompa darah miskin oksigen menuju paru-paru melalui arteri pulmonalis.',
    ospeTip: 'Awal dari peredaran darah kecil (pulmonal): Ventrikel kanan → Arteri pulmonalis → Paru.',
    keyFacts: ['Pompa ke sirkulasi pulmonal', 'Tekanan sistolik ~25 mmHg', 'Darah miskin O2'],
  },
  {
    id: 'cv-la',
    system: 'cardiovascular',
    name: 'Atrium Sinistra (Atrium Kiri)',
    latinName: 'Atrium Sinistrum',
    category: 'Ruang Jantung',
    locationAndStructure:
      'Ruang jantung kiri atas di bagian posterior jantung, menerima muara 4 buah vena pulmonalis (2 kiri dan 2 kanan).',
    mainFunction:
      'Menerima darah teroksigenasi (kaya O2) yang baru kembali dari paru-paru dan menyalurkannya ke ventrikel kiri melalui katup bikuspidalis (mitral).',
    physiologicalRole:
      'Menjaga aliran balik vena pulmonal tetap lancar agar tidak terjadi kongesti cairan di paru-paru (edema paru).',
    cluePrompt:
      'Ruang kiri atas jantung yang menerima darah kaya oksigen dari paru-paru melalui empat vena pulmonalis.',
    ospeTip: 'Muara akhir peredaran darah kecil (pulmonal) sebelum darah masuk ke ventrikel kiri.',
    keyFacts: ['Terima 4 vena pulmonalis', 'Darah kaya O2 (arterial)', 'Terhubung ke katup mitral'],
  },
  {
    id: 'cv-lv',
    system: 'cardiovascular',
    name: 'Ventrikel Sinistra (Ventrikel Kiri)',
    latinName: 'Ventriculus Sinister',
    category: 'Ruang Jantung',
    locationAndStructure:
      'Ruang jantung kiri bawah yang membentuk apeks jantung (iktus kordis pada ICS 5 garis midklavikula kiri). Memiliki dinding miokardium paling tebal (±10–15 mm).',
    mainFunction:
      'Memompa darah kaya oksigen bertekanan tinggi (±120 mmHg) melewati katup semilunaris aorta ke aorta untuk diedarkan ke seluruh tubuh.',
    physiologicalRole:
      'Menghasilkan curah jantung (cardiac output) sistemik yang menjamin perfusi otak, koroner, ginjal, dan jaringan perifer.',
    cluePrompt:
      'Ruang jantung dengan dinding miokardium paling tebal yang memompa darah kaya oksigen ke aorta menuju seluruh tubuh.',
    ospeTip: 'Apeks ventrikel kiri diraba sebagai iktus kordis di ruang interkostal V midklavikula sinistra.',
    keyFacts: ['Miokardium paling tebal', 'Pompa ke aorta (sistemik)', 'Membentuk apeks jantung'],
  },
  {
    id: 'cv-valve-tricuspid',
    system: 'cardiovascular',
    name: 'Katup Trikuspidalis',
    latinName: 'Valva Tricuspidalis',
    category: 'Katup Jantung',
    locationAndStructure:
      'Katup atrioventrikularis (AV) kanan yang memiliki 3 daun katup (kuspis) fibrosa, ditahan oleh korda tendinea yang melekat pada muskulus papilaris ventrikel kanan.',
    mainFunction:
      'Mengalirkan darah satu arah dari atrium kanan ke ventrikel kanan dan mencegah aliran balik saat ventrikel kanan berkontraksi.',
    physiologicalRole:
      'Menutup bersama katup mitral pada awal fase sistolik ventrikel, menghasilkan komponen bunyi jantung pertama (S1 / "LUB").',
    cluePrompt:
      'Katup berdaun tiga antara atrium kanan dan ventrikel kanan yang menutup saat fase sistolik untuk mencegah regurgitasi.',
    ospeTip: 'Trikuspid = Kanan (3 daun katup); Bikuspid/Mitral = Kiri (2 daun katup).',
    keyFacts: ['Antara Atrium & Ventrikel Kanan', '3 daun katup + korda tendinea', 'Menutup saat sistole (S1)'],
  },
  {
    id: 'cv-valve-mitral',
    system: 'cardiovascular',
    name: 'Katup Bikuspidalis (Mitral)',
    latinName: 'Valva Bicuspidalis / Mitralis',
    category: 'Katup Jantung',
    locationAndStructure:
      'Katup atrioventrikularis (AV) kiri yang terdiri atas 2 daun katup (anterior dan posterior) serta ditambatkan oleh korda tendinea ke muskulus papilaris ventrikel kiri.',
    mainFunction:
      'Menjaga aliran darah satu arah dari atrium kiri ke ventrikel kiri dan menahan tekanan tinggi ventrikel kiri agar darah tidak berbalik ke atrium kiri saat sistole.',
    physiologicalRole:
      'Penutupan katup mitral dan trikuspidalis saat awal sistole menimbulkan bunyi jantung S1 ("LUB"), paling jelas diauskultasi di apeks jantung.',
    cluePrompt:
      'Katup berdaun dua (mitral) antara atrium kiri dan ventrikel kiri yang menahan tekanan sistolik tinggi.',
    ospeTip: 'Area auskultasi katup mitral berada di ICS 5 garis midklavikularis kiri (apeks jantung).',
    keyFacts: ['Antara Atrium & Ventrikel Kiri', '2 daun katup (bikuspid)', 'Bunyi jantung S1 di apeks'],
  },
  {
    id: 'cv-valve-pulmonary',
    system: 'cardiovascular',
    name: 'Katup Semilunaris Pulmonal',
    latinName: 'Valva Trunci Pulmonalis',
    category: 'Katup Jantung',
    locationAndStructure:
      'Katup berbentuk tiga bulan sabit (semilunar) yang terletak di pangkal trunkus/arteri pulmonalis pada muara keluar ventrikel kanan.',
    mainFunction:
      'Membuka saat sistole ventrikel kanan untuk mengalirkan darah ke arteri pulmonalis dan menutup saat diastole agar darah tidak turun kembali ke ventrikel kanan.',
    physiologicalRole:
      'Penutupan katup semilunaris pulmonal bersama katup aorta pada awal diastole menghasilkan bunyi jantung kedua (S2 / "DUB").',
    cluePrompt:
      'Katup berbentuk bulan sabit di pintu keluar ventrikel kanan menuju arteri pulmonalis yang menutup saat fase diastolik.',
    ospeTip: 'Katup semilunar tidak memiliki korda tendinea; menutup akibat tekanan balik darah di arteri.',
    keyFacts: ['Pangkal Arteri Pulmonalis', '3 daun bulan sabit', 'Menutup saat diastole (S2)'],
  },
  {
    id: 'cv-valve-aortic',
    system: 'cardiovascular',
    name: 'Katup Semilunaris Aorta',
    latinName: 'Valva Aortae',
    category: 'Katup Jantung',
    locationAndStructure:
      'Katup dengan 3 kuspis semilunar yang terletak di pintu keluar ventrikel kiri menuju pangkal aorta asendens (tepat di atasnya terdapat muara arteri koroner kiri dan kanan).',
    mainFunction:
      'Membuka saat ejeksi sistolik ventrikel kiri ke aorta dan menutup rapat saat diastole untuk mencegah regurgitasi aorta sekaligus membantu perfusi arteri koroner.',
    physiologicalRole:
      'Menutup cepat pada awal fase diastolik (komponen A2 dari bunyi jantung S2) ketika tekanan aorta melebihi tekanan ventrikel kiri yang berelaksasi.',
    cluePrompt:
      'Katup bulan sabit di pintu keluar ventrikel kiri menuju aorta yang menutup pada awal diastole.',
    ospeTip: 'Arteri koronaria terisi darah justru saat diastole ketika katup aorta menutup dan darah memantul di sinus Valsalva.',
    keyFacts: ['Pangkal Aorta Asendens', 'Membuka saat sistole LV', 'Menutup saat diastole (S2)'],
  },
  {
    id: 'cv-vena-cava',
    system: 'cardiovascular',
    name: 'Vena Cava Superior & Inferior',
    latinName: 'Vena Cava Superior et Inferior',
    category: 'Pembuluh Besar',
    locationAndStructure:
      'Dua pembuluh balik sistemik terbesar bermuara langsung ke atrium kanan. Vena Cava Superior (VCS) dari bagian superior diafragma (kepala, leher, lengan); Vena Cava Inferior (VCI) dari abdomen, pelvis, dan ekstremitas bawah.',
    mainFunction:
      'Mengembalikan darah vena deoksigenasi (kaya CO2) dari seluruh jaringan tubuh menuju atrium kanan jantung.',
    physiologicalRole:
      'Aliran balik vena (venous return) sangat menentukan preload ventrikel kanan dan volume sekuncup jantung sesuai hukum Frank-Starling.',
    cluePrompt:
      'Dua pembuluh balik besar yang mengembalikan darah miskin oksigen dari tubuh bagian atas dan bawah ke atrium kanan.',
    ospeTip: 'VCS dan VCI bermuara ke Atrium Dextra (kanan) — merupakan titik akhir peredaran darah sistemik.',
    keyFacts: ['VCS (tubuh atas) & VCI (tubuh bawah)', 'Darah deoksigenasi', 'Bermuara di Atrium Dextra'],
  },
  {
    id: 'cv-pulm-artery',
    system: 'cardiovascular',
    name: 'Arteri Pulmonalis',
    latinName: 'Truncus / Arteria Pulmonalis',
    category: 'Pembuluh Besar',
    locationAndStructure:
      'Keluar dari ventrikel kanan sebagai trunkus pulmonalis lalu bercabang dua menjadi arteri pulmonalis dekstra dan sinistra menuju masing-masing paru.',
    mainFunction:
      'Mengalirkan darah deoksigenasi dari ventrikel kanan ke kapiler alveolus paru-paru untuk proses pertukaran gas.',
    physiologicalRole:
      'Satu-satunya arteri dalam sirkulasi dewasa normal yang membawa darah miskin oksigen (kaya CO2).',
    cluePrompt:
      'Pembuluh besar yang keluar dari ventrikel kanan menuju paru-paru dan merupakan satu-satunya arteri yang membawa darah miskin oksigen.',
    ospeTip: 'Prinsip anatomi: Arteri = keluar dari jantung (bukan selalu kaya O2!). Arteri pulmonalis membawa darah kaya CO2.',
    keyFacts: ['Dari Ventrikel Dextra ke Paru', 'Membawa darah miskin O2', 'Bercabang kanan & kiri'],
  },
  {
    id: 'cv-pulm-vein',
    system: 'cardiovascular',
    name: 'Vena Pulmonalis',
    latinName: 'Venae Pulmonales',
    category: 'Pembuluh Besar',
    locationAndStructure:
      'Empat buah pembuluh darah (2 dari paru kanan, 2 dari paru kiri) yang masuk ke dinding posterior atrium sinistra.',
    mainFunction:
      'Mengembalikan darah teroksigenasi (kaya O2) dari kapiler paru-paru ke atrium kiri jantung.',
    physiologicalRole:
      'Satu-satunya vena dalam sirkulasi dewasa normal yang membawa darah kaya oksigen untuk diteruskan ke sirkulasi sistemik.',
    cluePrompt:
      'Empat pembuluh balik dari paru-paru ke atrium kiri yang menjadi satu-satunya vena pembawa darah kaya oksigen.',
    ospeTip: 'Vena = menuju jantung. Keempat vena pulmonalis membawa darah segar kaya O2 ke Atrium Sinistra.',
    keyFacts: ['4 pembuluh dari paru ke Atrium Kiri', 'Membawa darah kaya O2', 'Akhir sirkulasi pulmonal'],
  },
  {
    id: 'cv-aorta',
    system: 'cardiovascular',
    name: 'Aorta',
    latinName: 'Aorta',
    category: 'Pembuluh Besar',
    locationAndStructure:
      'Arteri elastik terbesar di tubuh, berpangkal dari ventrikel kiri (aorta asendens), melengkung membentuk arkus aorta (dengan 3 cabang besar: trunkus brakiosefalika, karotis komunis kiri, subklavia kiri), lalu turun sebagai aorta desendens.',
    mainFunction:
      'Menyalurkan darah kaya oksigen dari ventrikel kiri ke seluruh cabang arteri sistemik tubuh.',
    physiologicalRole:
      'Dinding elastik aorta mengembang saat sistole dan melakukan rekoil elastik saat diastole (efek Windkessel) sehingga menjaga aliran darah perifer tetap kontinyu dan memelihara tekanan diastolik.',
    cluePrompt:
      'Arteri terbesar yang keluar dari ventrikel kiri membentuk lengkungan arkus untuk mengedarkan darah kaya oksigen ke seluruh tubuh.',
    ospeTip: '3 cabang Arkus Aorta dari kanan ke kiri: Brakiosefalika, Karotis Komunis Sinistra, Subklavia Sinistra.',
    keyFacts: ['Keluar dari Ventrikel Sinistra', 'Asendens · Arkus · Desendens', 'Arteri sistemik utama'],
  },
  {
    id: 'cv-sa-node',
    system: 'cardiovascular',
    name: 'SA Node (Nodus Sinoatrial)',
    latinName: 'Nodus Sinoatrialis',
    category: 'Sistem Konduksi Listrik',
    locationAndStructure:
      'Sekelompok sel otot jantung khusus (sel pacemaker) di dinding atas atrium kanan tepat di dekat muara vena cava superior.',
    mainFunction:
      'Menjadi pemacu jantung alami (natural pacemaker) yang menghasilkan impuls listrik spontan secara ritmis.',
    physiologicalRole:
      'Mencetuskan laju intrinsik 60–100 kali/menit (sinus rhythm), menyebarkan depolarisasi ke kedua atrium (gelombang P pada EKG) hingga mencapai AV Node.',
    cluePrompt:
      'Pacemaker alami jantung di dinding atas atrium kanan dekat muara vena cava superior dengan laju 60–100 denyut/menit.',
    ospeTip: 'SA Node = Pacemaker utama (60–100 bpm). Depolarisasi atrium tampak sebagai gelombang P pada EKG.',
    keyFacts: ['Pacemaker alami (60–100 bpm)', 'Dinding atas Atrium Dextra', 'Mencetuskan gelombang P EKG'],
  },
  {
    id: 'cv-av-node',
    system: 'cardiovascular',
    name: 'AV Node (Nodus Atrioventrikular)',
    latinName: 'Nodus Atrioventricularis',
    category: 'Sistem Konduksi Listrik',
    locationAndStructure:
      'Simpul konduksi di dasar septum interatrial bagian kanan (segitiga Koch), tepat di atas katup trikuspidalis.',
    mainFunction:
      'Menerima impuls dari SA Node melalui jalur internodal dan menjadi satu-satunya jembatan listrik normal antara atrium dan ventrikel.',
    physiologicalRole:
      'Menunda hantaran impuls selama ±0,1 detik (segmen PR pada EKG) agar atrium selesai berkontraksi dan mengisi ventrikel penuh sebelum ventrikel berkontraksi. Laju cadangan 40–60 bpm.',
    cluePrompt:
      'Simpul listrik di dasar septum interatrial yang menunda impuls ±0,1 detik agar atrium selesai mengosongkan darah ke ventrikel.',
    ospeTip: 'Fungsi kunci AV Node: "Physiological Delay" (~0,1 detik) agar kontraksi atrium dan ventrikel tidak bersamaan.',
    keyFacts: ['Dasar septum interatrial', 'Tunda impuls ~0,1 detik', 'Laju cadangan 40–60 bpm'],
  },
  {
    id: 'cv-his-purkinje',
    system: 'cardiovascular',
    name: 'Berkas His & Serabut Purkinje',
    latinName: 'Fasciculus Atrioventricularis et Rami Subendocardiales',
    category: 'Sistem Konduksi Listrik',
    locationAndStructure:
      'Berkas His (AV bundle) menembus rangka fibrosa jantung lalu bercabang dua di septum interventrikularis menjadi cabang berkas kanan & kiri, berakhir sebagai jalinan Serabut Purkinje di subendokardium dinding ventrikel.',
    mainFunction:
      'Menghantarkan impuls listrik berkecepatan sangat tinggi ke seluruh miokardium ventrikel kanan dan kiri.',
    physiologicalRole:
      'Memastikan kontraksi ventrikel dimulai dari apeks ke arah basal secara serempak (kompleks QRS pada EKG) agar darah terdorong optimal ke atas menuju katup semilunar.',
    cluePrompt:
      'Jalur konduksi di septum interventrikularis hingga dinding subendokardium yang menyebarkan impuls cepat agar ventrikel berkontraksi serempak dari apeks.',
    ospeTip: 'Arah depolarisasi ventrikel lewat Serabut Purkinje: dari apeks ke basis (searah pintu keluar katup pulmonal & aorta).',
    keyFacts: ['Berkas His di septum', 'Serabut Purkinje ke miokardium', 'Menghasilkan kompleks QRS'],
  },

  // ===================== 3. SISTEM ENDOKRIN =====================
  {
    id: 'end-hypothalamus',
    system: 'endocrine',
    name: 'Hipotalamus',
    latinName: 'Hypothalamus',
    category: 'Pusat Neuroendokrin',
    locationAndStructure:
      'Bagian ventral diensefalon otak yang terletak tepat di bawah talamus dan di atas kelenjar hipofisis, dihubungkan oleh tangkai infundibulum.',
    mainFunction:
      'Menghubungkan sistem saraf dan sistem endokrin; menghasilkan hormon pelepas (RH) dan penghambat (IH) seperti TRH, CRH, GnRH, GHRH, serta menyintesis ADH dan Oksitosin.',
    physiologicalRole:
      'Mengatur suhu tubuh, rasa lapar/haus, ritme sirkadian, serta mengendalikan sekresi hipofisis anterior melalui sistem portal hipofisis.',
    cluePrompt:
      'Pusat kendali neuroendokrin di dasar otak yang mensekresi hormon pelepas (TRH, CRH, GnRH) untuk mengatur kelenjar hipofisis.',
    ospeTip: 'ADH dan Oksitosin sebenarnya DISINTESIS oleh hipotalamus, lalu disalurkan untuk DISIMPAN & DILEPAS di hipofisis posterior.',
    keyFacts: ['Diensefalon otak', 'Sekresi RH & IH (TRH, CRH, GnRH)', 'Sintesis ADH & Oksitosin'],
  },
  {
    id: 'end-pituitary-ant',
    system: 'endocrine',
    name: 'Hipofisis Anterior (Adenohipofisis)',
    latinName: 'Adenohypophysis',
    category: 'Master Gland (Lobus Depan)',
    locationAndStructure:
      'Lobus depan kelenjar pituitari yang terletak di sella tursika tulang sfenoid, tersusun atas jaringan kelenjar epitelial di bawah pengaruh sistem portal hipotalamus.',
    mainFunction:
      'Menyintesis dan mensekresi 6 hormon utama: GH (pertumbuhan tulang/otot), TSH (merangsang tiroid), ACTH (merangsang korteks adrenal), FSH & LH (gonadotropin), serta Prolaktin (produksi ASI).',
    physiologicalRole:
      'Menerima stimulasi hormon pelepas dari hipotalamus dan merespons mekanisme umpan balik negatif dari hormon organ target (misal T3/T4 menghambat TSH).',
    cluePrompt:
      'Lobus depan kelenjar pituitari yang memproduksi dan mensekresi hormon GH, TSH, ACTH, FSH, LH, dan Prolaktin.',
    ospeTip: 'Jembatan keledai hormon Hipofisis Anterior: FLAT PEG (FSH, LH, ACTH, TSH, Prolaktin, Endorfin, GH).',
    keyFacts: ['GH · TSH · ACTH · FSH/LH · Prolaktin', 'Diatur sistem portal hipotalamus', 'Di sella tursika'],
  },
  {
    id: 'end-pituitary-post',
    system: 'endocrine',
    name: 'Hipofisis Posterior (Neurohipofisis)',
    latinName: 'Neurohypophysis',
    category: 'Master Gland (Lobus Belakang)',
    locationAndStructure:
      'Lobus belakang kelenjar pituitari yang merupakan perpanjangan akson saraf dari nukleus supraoptik dan paraventrikuler hipotalamus melalui infundibulum.',
    mainFunction:
      'Menyimpan dan melepaskan 2 hormon neurohipofisis: ADH / Vasopresin (meningkatkan reabsorpsi air di tubulus ginjal) dan Oksitosin (kontraksi otot polos uterus saat persalinan & refleks ejeksi ASI).',
    physiologicalRole:
      'Saat osmolaritas darah naik atau dehidrasi, osmoreseptor hipotalamus memicu pelepasan ADH untuk menghemat air dan memekatkan urin.',
    cluePrompt:
      'Lobus belakang kelenjar pituitari yang menyimpan dan melepaskan hormon ADH (Vasopresin) serta Oksitosin.',
    ospeTip: 'Ingat: Hipofisis posterior tidak membuat hormon sendiri, hanya menyimpan & melepaskan ADH dan Oksitosin dari hipotalamus.',
    keyFacts: ['ADH / Vasopresin (retensi air)', 'Oksitosin (kontraksi uterus & ASI)', 'Ujung akson hipotalamus'],
  },
  {
    id: 'end-thyroid',
    system: 'endocrine',
    name: 'Kelenjar Tiroid',
    latinName: 'Glandula Thyroidea',
    category: 'Kelenjar Leher',
    locationAndStructure:
      'Kelenjar endokrin berbentuk kupu-kupu (terdiri atas lobus dekstra & sinistra dihubungkan oleh isthmus) di bagian anterior leher, tepat di bawah kartilago tiroid dan di depan cincin trakea.',
    mainFunction:
      'Menghasilkan hormon T3 (Triiodotironin) dan T4 (Tiroksin) oleh sel folikular untuk mengatur laju metabolisme basal, serta hormon Kalsitonin oleh sel parafolikular (sel C).',
    physiologicalRole:
      'T3/T4 meningkatkan konsumsi oksigen, produksi panas, dan perkembangan sistem saraf. Kalsitonin MENURUNKAN kadar kalsium darah saat hiperkalsemia dengan menghambat osteoklas tulang.',
    cluePrompt:
      'Kelenjar berbentuk kupu-kupu di leher anterior yang menghasilkan hormon T3, T4, dan Kalsitonin.',
    ospeTip: 'Cara mudah ingat: Kalsi-TON-in = "Tone down" (menurunkan) kadar kalsium darah dengan menyimpannya ke tulang.',
    keyFacts: ['Bentuk kupu-kupu di leher', 'T3 & T4 (metabolisme basal)', 'Kalsitonin (turunkan Ca2+ darah)'],
  },
  {
    id: 'end-parathyroid',
    system: 'endocrine',
    name: 'Kelenjar Paratiroid',
    latinName: 'Glandulae Parathyroideae',
    category: 'Kelenjar Leher (Posterior)',
    locationAndStructure:
      'Empat buah kelenjar kecil seukuran kacang hijau (2 superior, 2 inferior) yang menempel pada permukaan posterior lobus kiri dan kanan kelenjar tiroid.',
    mainFunction:
      'Mensekresi Parathormon / Hormon Paratiroid (PTH) sebagai pengatur utama peningkatan kadar kalsium (Ca2+) dalam darah.',
    physiologicalRole:
      'Saat kalsium darah rendah (hipokalsemia), PTH merangsang osteoklas melepaskan Ca2+ dari tulang, meningkatkan reabsorpsi Ca2+ di ginjal, serta mengaktifkan vitamin D untuk absorpsi Ca2+ di usus.',
    cluePrompt:
      'Empat kelenjar kecil di permukaan belakang tiroid yang menghasilkan hormon PTH untuk menaikkan kadar kalsium darah.',
    ospeTip: 'PTH antagonis terhadap Kalsitonin: PTH menaikkan Ca2+ darah, Kalsitonin menurunkan Ca2+ darah.',
    keyFacts: ['4 kelenjar di posterior tiroid', 'Hormon PTH (Parathormon)', 'Naikkan Ca2+ darah (tulang, ginjal, usus)'],
  },
  {
    id: 'end-adrenal',
    system: 'endocrine',
    name: 'Kelenjar Adrenal (Suprarenal)',
    latinName: 'Glandula Suprarenalis',
    category: 'Kelenjar Abdomen/Retroperitoneal',
    locationAndStructure:
      'Sepasang kelenjar berbentuk piramida/topi yang duduk di kutub atas kedua ginjal. Terdiri dari 2 lapisan fungsional berbeda: Korteks Adrenal (bagian luar) dan Medula Adrenal (bagian dalam).',
    mainFunction:
      'Korteks menghasilkan Kortisol (glukokortikoid: respons stres kronis, naikkan glukosa, antiinflamasi) dan Aldosteron (mineralokortikoid: retensi Na+ & air, ekskresi K+). Medula menghasilkan Epinefrin/Adrenalin & Norepinefrin.',
    physiologicalRole:
      'Medula adrenal bekerja sinergis dengan saraf simpatis memicu respons cepat "fight-or-flight" (meningkatkan denyut jantung, tekanan darah, bronkodilatasi, dan glikogenolisis).',
    cluePrompt:
      'Kelenjar di atas kedua ginjal yang terbagi menjadi korteks (penghasil kortisol & aldosteron) dan medula (penghasil adrenalin/epinefrin).',
    ospeTip: 'Ingat 3S Korteks Adrenal: Salt (Aldosteron), Sugar (Kortisol), Sex (Androgen); Medula = Adrenalin/Epinefrin.',
    keyFacts: ['Korteks: Kortisol & Aldosteron', 'Medula: Epinefrin (Adrenalin)', 'Terletak di kutub atas ginjal'],
  },
  {
    id: 'end-pancreas-islets',
    system: 'endocrine',
    name: 'Pankreas Endokrin (Pulau Langerhans)',
    latinName: 'Insulae Pancreaticae',
    category: 'Kelenjar Metabolik',
    locationAndStructure:
      'Gugusan sel endokrin mikroskopis (Pulau Langerhans) yang tersebar di jaringan pankreas (terbanyak di bagian korpus dan ekor). Mengandung Sel Alfa, Sel Beta, dan Sel Delta.',
    mainFunction:
      'Sel Beta mensekresi Insulin (menurunkan glukosa darah); Sel Alfa mensekresi Glukagon (menaikkan glukosa darah).',
    physiologicalRole:
      'Insulin memfasilitasi masuknya glukosa ke sel otot & adiposa serta merangsang glikogenesis di hati; Glukagon memecah glikogen hati menjadi glukosa (glikogenolisis) saat berpuasa.',
    cluePrompt:
      'Gugusan Pulau Langerhans di pankreas yang memiliki sel beta penghasil insulin dan sel alfa penghasil glukagon.',
    ospeTip: 'Beta = Insulin (turunkan gula darah); Alfa = Glukagon (naikkan gula darah).',
    keyFacts: ['Sel Beta → Insulin (turunkan gula)', 'Sel Alfa → Glukagon (naikkan gula)', 'Homeostasis glukosa darah'],
  },
  {
    id: 'end-ovary',
    system: 'endocrine',
    name: 'Gonad Wanita: Ovarium',
    latinName: 'Ovarium',
    category: 'Gonad / Reproduksi',
    locationAndStructure:
      'Sepasang kelenjar berbentuk oval seukuran kacang almond di rongga pelvis kanan dan kiri uterus, ditopang oleh ligamen di dekat ujung fimbriae tuba falopi.',
    mainFunction:
      'Menghasilkan ovum (fungsi gametogenesis) serta mensekresi hormon seks wanita utama yaitu Estrogen dan Progesteron di bawah kendali FSH dan LH hipofisis.',
    physiologicalRole:
      'Estrogen memicu ciri seks sekunder wanita dan fase proliferasi endometrium; Progesteron mempersiapkan dan mempertahankan ketebalan endometrium untuk implantasi dan kehamilan.',
    cluePrompt:
      'Kelenjar gonad wanita di rongga pelvis yang menghasilkan hormon estrogen dan progesteron.',
    ospeTip: 'Folikel ovarium menghasilkan Estrogen (fase folikular); Korpus luteum menghasilkan Progesteron (fase luteal).',
    keyFacts: ['Hormon Estrogen & Progesteron', 'Diatur FSH & LH hipofisis', 'Siklus menstruasi & kehamilan'],
  },
  {
    id: 'end-testis',
    system: 'endocrine',
    name: 'Gonad Pria: Testis',
    latinName: 'Testis',
    category: 'Gonad / Reproduksi',
    locationAndStructure:
      'Sepasang kelenjar oval di dalam kantong skrotum di luar rongga pelvis agar suhu tetap ±2–3°C lebih rendah dari suhu inti tubuh. Mengandung sel interstitial Leydig di antara tubulus seminiferus.',
    mainFunction:
      'Memproduksi sperma (tubulus seminiferus dengan sel Sertoli) dan hormon androgen utama yaitu Testosteron (oleh sel Leydig).',
    physiologicalRole:
      'LH merangsang sel Leydig menyintesis testosteron untuk perkembangan ciri seks sekunder pria, massa otot, libido, dan pematangan sperma bersama FSH.',
    cluePrompt:
      'Kelenjar gonad pria di dalam skrotum yang memiliki sel Leydig penghasil hormon testosteron.',
    ospeTip: 'Sel Leydig → Testosteron (dirangsang LH); Tubulus seminiferus/Sertoli → Spermatogenesis (dirangsang FSH).',
    keyFacts: ['Sel Leydig → Testosteron', 'Diatur LH & FSH hipofisis', 'Spermatogenesis & seks sekunder'],
  },
];

export const PHYSIOLOGY_FLOWS: PhysiologyFlow[] = [
  // DIGESTIVE FLOWS
  {
    id: 'flow-dig-4stages',
    system: 'digestive',
    title: '4 Tahap Utama Pencernaan',
    summary: 'Urutan proses pengolahan zat makanan dari masuk ke mulut hingga eliminasi feses.',
    steps: [
      {
        title: '1. Ingesti',
        detail: 'Memasukkan makanan dan cairan ke dalam kavum oris, dilanjutkan pengunyahan (mastikasi) serta pencampuran dengan saliva.',
        highlightOrganIds: ['dig-cavum-oris', 'dig-saliva'],
      },
      {
        title: '2. Digesti (Mekanik & Kimiawi)',
        detail: 'Pemecahan makromolekul secara mekanik (gigi, gerak aduk lambung) dan enzimatik (amilase saliva, pepsin lambung, amilase-lipase-tripsin pankreas, empedu).',
        highlightOrganIds: ['dig-stomach', 'dig-liver', 'dig-gallbladder', 'dig-pancreas'],
      },
      {
        title: '3. Absorbsi',
        detail: 'Penyerapan nutrien sederhana (glukosa, asam amino, asam lemak, vitamin) di vili usus halus (duodenum, jejunum, ileum) serta penyerapan air-elektrolit di usus besar.',
        highlightOrganIds: ['dig-small-intestine', 'dig-large-intestine'],
      },
      {
        title: '4. Eliminasi (Defekasi)',
        detail: 'Pemadatan sisa tak tercerna menjadi feses di usus besar, ditampung di rektum, lalu dikeluarkan melalui anus.',
        highlightOrganIds: ['dig-large-intestine', 'dig-rectum-anus'],
      },
    ],
  },
  {
    id: 'flow-dig-swallow',
    system: 'digestive',
    title: 'Mekanisme Menelan (Deglutisi)',
    summary: 'Koordinasi palatum lunak dan epiglotis mencegah aspirasi ke rongga hidung atau saluran napas.',
    steps: [
      {
        title: '1. Fase Oral (Volunter)',
        detail: 'Lidah menekan bolus ke arah palatum durum dan mendorongnya ke posterior menuju orofaring.',
        highlightOrganIds: ['dig-cavum-oris'],
      },
      {
        title: '2. Penutupan Nasofaring oleh Palatum Molle',
        detail: 'Palatum lunak (palatum molle) dan uvula terangkat ke atas-belakang menutup nasofaring agar makanan tidak masuk ke rongga hidung.',
        highlightOrganIds: ['dig-cavum-oris', 'dig-pharynx'],
      },
      {
        title: '3. Penutupan Laring oleh Epiglotis',
        detail: 'Laring terangkat dan epiglotis menekuk ke bawah menutup aditus laringis sehingga bolus tidak masuk ke trakea (mencegah tersedak).',
        highlightOrganIds: ['dig-pharynx'],
      },
      {
        title: '4. Fase Esofageal (Peristaltik)',
        detail: 'Sfingter esofagus atas terbuka, gelombang peristaltik esofagus (±25 cm) mendorong bolus ke lambung melewati sfingter esofagus bawah.',
        highlightOrganIds: ['dig-esophagus', 'dig-stomach'],
      },
    ],
  },
  {
    id: 'flow-dig-defecation',
    system: 'digestive',
    title: 'Mekanisme Refleks Defekasi',
    summary: 'Peran peregangan rektum dan koordinasi sfingter ani polos (involunter) vs lurik (volunter).',
    steps: [
      {
        title: '1. Peregangan Dinding Rektum',
        detail: 'Gerakan massa kolon mendorong feses dari kolon sigmoid masuk ke rektum, merangsang reseptor regang pada dinding rektum.',
        highlightOrganIds: ['dig-large-intestine', 'dig-rectum-anus'],
      },
      {
        title: '2. Refleks Spinal & Relaksasi Sfingter Internus',
        detail: 'Impuls saraf parasimpatis menuju medula spinalis sakral memicu kontraksi rektum dan relaksasi sfingter ani internus (otot polos / involunter).',
        highlightOrganIds: ['dig-rectum-anus'],
      },
      {
        title: '3. Kontrol Sadar Sfingter Eksternus',
        detail: 'Sinyal mencapai korteks serebri memberi sensasi ingin BAB. Jika kondisi sesuai, sfingter ani eksternus (otot lurik / volunter) direlaksasikan secara sadar sehingga feses keluar.',
        highlightOrganIds: ['dig-rectum-anus'],
      },
    ],
  },

  // CARDIOVASCULAR FLOWS
  {
    id: 'flow-cv-pulmonary',
    system: 'cardiovascular',
    title: 'Peredaran Darah Kecil (Pulmonal)',
    summary: 'Jalur oksigenasi darah miskin O2 dari jantung kanan menuju paru-paru dan kembali ke jantung kiri.',
    steps: [
      {
        title: '1. Ventrikel Dextra',
        detail: 'Darah miskin O2 dari atrium kanan dipompa oleh ventrikel kanan melewati katup semilunaris pulmonal.',
        highlightOrganIds: ['cv-rv', 'cv-valve-pulmonary'],
      },
      {
        title: '2. Arteri Pulmonalis ke Paru',
        detail: 'Arteri pulmonalis bercabang kanan dan kiri membawa darah deoksigenasi ke kapiler alveolus paru untuk melepaskan CO2 dan mengikat O2.',
        highlightOrganIds: ['cv-pulm-artery'],
      },
      {
        title: '3. Vena Pulmonalis → Atrium Sinistra',
        detail: 'Darah segar kaya O2 kembali ke jantung melalui 4 vena pulmonalis dan bermuara ke atrium sinistra.',
        highlightOrganIds: ['cv-pulm-vein', 'cv-la'],
      },
    ],
  },
  {
    id: 'flow-cv-systemic',
    system: 'cardiovascular',
    title: 'Peredaran Darah Besar (Sistemik)',
    summary: 'Distribusi darah kaya O2 ke seluruh jaringan tubuh dan kembalinya darah vena ke jantung kanan.',
    steps: [
      {
        title: '1. Ventrikel Sinistra → Katup Aorta',
        detail: 'Ventrikel kiri yang bermiokardium paling tebal berkontraksi kuat mendorong darah kaya O2 melewati katup semilunaris aorta.',
        highlightOrganIds: ['cv-lv', 'cv-valve-aortic'],
      },
      {
        title: '2. Aorta → Kapiler Seluruh Tubuh',
        detail: 'Aorta mendistribusikan darah ke seluruh organ tubuh; di kapiler jaringan terjadi pertukaran O2 & nutrien dengan CO2 & sisa metabolisme.',
        highlightOrganIds: ['cv-aorta'],
      },
      {
        title: '3. Vena Cava → Atrium Dextra',
        detail: 'Darah vena miskin O2 dikembalikan melalui Vena Cava Superior dan Vena Cava Inferior menuju atrium dextra.',
        highlightOrganIds: ['cv-vena-cava', 'cv-ra'],
      },
    ],
  },
  {
    id: 'flow-cv-systole-diastole',
    system: 'cardiovascular',
    title: 'Fase Sistolik, Diastolik & Konduksi',
    summary: 'Hubungan impuls listrik SA-AV-Purkinje dengan pembukaan/penutupan katup dan bunyi jantung.',
    steps: [
      {
        title: '1. Depolarisasi Atrium (SA Node → AV Node)',
        detail: 'SA Node mencetuskan impuls (60–100 bpm) membuat atrium berkontraksi (atrial kick), lalu ditahan sebentar (±0,1 dtk) di AV Node saat ventrikel masih diastole.',
        highlightOrganIds: ['cv-sa-node', 'cv-av-node'],
      },
      {
        title: '2. Fase Sistolik Ventrikel (Bunyi S1)',
        detail: 'Impuls melesat lewat Berkas His & Serabut Purkinje. Ventrikel berkontraksi, katup Trikuspidalis & Mitral menutup (bunyi S1 "LUB"), katup Pulmonal & Aorta membuka untuk memompa darah keluar.',
        highlightOrganIds: ['cv-his-purkinje', 'cv-valve-tricuspid', 'cv-valve-mitral'],
      },
      {
        title: '3. Fase Diastolik Ventrikel (Bunyi S2)',
        detail: 'Ventrikel berelaksasi; tekanan turun sehingga katup Semilunar Pulmonal & Aorta menutup (bunyi S2 "DUB"). Katup AV kembali membuka untuk pengisian darah berikutnya.',
        highlightOrganIds: ['cv-valve-pulmonary', 'cv-valve-aortic', 'cv-rv', 'cv-lv'],
      },
    ],
  },

  // ENDOCRINE FLOWS
  {
    id: 'flow-end-feedback',
    system: 'endocrine',
    title: 'Mekanisme Umpan Balik Negatif',
    summary: 'Prinsip homeostasis endokrin menggunakan contoh aksis Hipotalamus–Hipofisis–Tiroid.',
    steps: [
      {
        title: '1. Stimulus & Pelepasan TRH',
        detail: 'Saat metabolisme atau kadar T3/T4 darah turun, hipotalamus mensekresi hormon pelepas tirotropin (TRH) ke hipofisis anterior.',
        highlightOrganIds: ['end-hypothalamus'],
      },
      {
        title: '2. Sekresi TSH Hipofisis Anterior',
        detail: 'TRH merangsang adenohipofisis (hipofisis anterior) melepaskan TSH (Thyroid Stimulating Hormone) ke aliran darah.',
        highlightOrganIds: ['end-pituitary-ant'],
      },
      {
        title: '3. Sekresi T3/T4 & Inhibisi Balik (Negative Feedback)',
        detail: 'Kelenjar tiroid memproduksi T3 dan T4. Ketika kadar T3/T4 di darah mencapai rentang optimal, T3/T4 langsung menghambat hipotalamus (↓TRH) dan hipofisis anterior (↓TSH) agar tidak terjadi hipertiroidisme.',
        highlightOrganIds: ['end-thyroid', 'end-hypothalamus', 'end-pituitary-ant'],
      },
    ],
  },
  {
    id: 'flow-end-glucose',
    system: 'endocrine',
    title: 'Regulasi Glukosa Darah (Insulin & Glukagon)',
    summary: 'Keseimbangan antagonis Sel Beta dan Sel Alfa Pulau Langerhans menjaga normoglikemia.',
    steps: [
      {
        title: '1. Kondisi Hiperglikemia → Insulin (Sel Beta)',
        detail: 'Setelah makan, glukosa darah naik. Sel Beta Pulau Langerhans pankreas melepaskan Insulin yang memasukkan glukosa ke sel dan menyimpannya sebagai glikogen (glikogenesis) sehingga gula darah turun normal.',
        highlightOrganIds: ['end-pancreas-islets'],
      },
      {
        title: '2. Kondisi Hipoglikemia → Glukagon (Sel Alfa)',
        detail: 'Saat puasa atau gula darah turun, Sel Alfa Pulau Langerhans melepaskan Glukagon yang memecah glikogen hati menjadi glukosa (glikogenolisis) sehingga kadar gula darah naik kembali ke batas normal.',
        highlightOrganIds: ['end-pancreas-islets'],
      },
    ],
  },
  {
    id: 'flow-end-calcium',
    system: 'endocrine',
    title: 'Regulasi Kalsium Darah (Kalsitonin & PTH)',
    summary: 'Koordinasi Tiroid dan Paratiroid dalam menjaga homeostasis ion kalsium.',
    steps: [
      {
        title: '1. Hiperkalsemia → Kalsitonin (Tiroid)',
        detail: 'Saat Ca2+ darah terlalu tinggi, sel parafolikular kelenjar tiroid melepaskan Kalsitonin untuk menghambat osteoklas tulang dan mendorong deposisi kalsium ke matriks tulang sehingga Ca2+ darah turun.',
        highlightOrganIds: ['end-thyroid'],
      },
      {
        title: '2. Hipokalsemia → PTH (Paratiroid)',
        detail: 'Saat Ca2+ darah turun, 4 kelenjar paratiroid melepaskan PTH yang mengaktifkan osteoklas tulang melepas Ca2+, meningkatkan reabsorpsi Ca2+ di ginjal, dan mengaktifkan vit D untuk penyerapan Ca2+ di usus.',
        highlightOrganIds: ['end-parathyroid'],
      },
    ],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // DIGESTIVE (10)
  {
    id: 'q-dig-1',
    system: 'digestive',
    relatedOrganId: 'dig-pharynx',
    question:
      'Struktur yang terangkat menutup nasofaring agar makanan tidak masuk ke rongga hidung saat refleks menelan adalah...',
    options: [
      'Palatum durum',
      'Palatum molle (langit-langit lunak) & uvula',
      'Sfingter esofagus atas',
      'Kelenjar parotis',
    ],
    correctIndex: 1,
    explanation:
      'Saat fase faringeal menelan, palatum molle beserta uvula terangkat menutup nasofaring, sedangkan epiglotis menutup laring agar bolus tidak masuk trakea.',
  },
  {
    id: 'q-dig-2',
    system: 'digestive',
    relatedOrganId: 'dig-stomach',
    question:
      'Enzim yang disekresikan oleh sel utama lambung (dalam bentuk pepsinogen) untuk memulai pemecahan protein menjadi pepton di dalam bubur kim adalah...',
    options: ['Amilase saliva', 'Lipase pankreas', 'Pepsin', 'Tripsin'],
    correctIndex: 2,
    explanation:
      'HCl lambung mengaktifkan pepsinogen menjadi enzim pepsin yang bekerja optimal pada pH asam (1,5–2) untuk memecah ikatan peptida protein.',
  },
  {
    id: 'q-dig-3',
    system: 'digestive',
    relatedOrganId: 'dig-small-intestine',
    question:
      'Urutan panjang segmen usus halus (intestinum minor) dari proksimal ke distal yang paling tepat adalah...',
    options: [
      'Duodenum (±25 cm) → Jejunum (2–3 m) → Ileum (4–5 m)',
      'Jejunum (±25 cm) → Duodenum (2–3 m) → Ileum (4–5 m)',
      'Duodenum (2–3 m) → Jejunum (4–5 m) → Ileum (±25 cm)',
      'Ileum (±25 cm) → Jejunum (2–3 m) → Duodenum (4–5 m)',
    ],
    correctIndex: 0,
    explanation:
      'Usus halus dimulai dari duodenum yang pendek berbentuk huruf C (±25 cm), berlanjut ke jejunum (2–3 m), dan diakhiri ileum (4–5 m) di katup ileosekal.',
  },
  {
    id: 'q-dig-4',
    system: 'digestive',
    relatedOrganId: 'dig-gallbladder',
    question:
      'Manakah pernyataan yang benar mengenai perbedaan fungsi Hati (±1,5 kg) dan Kantung Empedu (8–12 cm)?',
    options: [
      'Hati menyimpan empedu, kantung empedu memproduksi empedu',
      'Hati memproduksi empedu, kantung empedu menyimpan dan memekatkan empedu',
      'Keduanya memproduksi enzim tripsin dan amilase',
      'Kantung empedu langsung menyerap glukosa ke vena porta',
    ],
    correctIndex: 1,
    explanation:
      'Hepatoyctes di hati memproduksi cairan empedu setiap hari, kemudian disalurkan ke kantung empedu (8–12 cm) untuk disimpan dan dipekatkan.',
  },
  {
    id: 'q-dig-5',
    system: 'digestive',
    relatedOrganId: 'dig-rectum-anus',
    question:
      'Pada refleks defekasi, kontrol penahanan feses secara sadar (volunter) dilakukan oleh...',
    options: [
      'Sfingter ani internus yang tersusun atas otot polos',
      'Sfingter ani eksternus yang tersusun atas otot lurik',
      'Sfingter pilorus di ujung lambung',
      'Katup ileosekal di perbatasan sekum',
    ],
    correctIndex: 1,
    explanation:
      'Sfingter ani internus (otot polos) berelaksasi secara refleks/involunter saat rektum meregang, sedangkan sfingter ani eksternus (otot lurik) dikendalikan secara sadar.',
  },
  {
    id: 'q-dig-6',
    system: 'digestive',
    relatedOrganId: 'dig-esophagus',
    question:
      'Saluran muskular sepanjang ±25 cm yang menghantarkan bolus dari faring ke lambung dengan menembus diafragma disebut...',
    options: ['Orofaring', 'Duodenum', 'Esofagus', 'Kolon desendens'],
    correctIndex: 2,
    explanation:
      'Esofagus memiliki panjang sekitar 25 cm dan menghantarkan bolus melalui gerak peristaltik menuju kardia lambung.',
  },
  {
    id: 'q-dig-7',
    system: 'digestive',
    relatedOrganId: 'dig-saliva',
    question:
      'Kelenjar saliva terbesar yang terletak di anterior-inferior telinga dan sering mengalami pembengkakan pada kasus parotitis (gondongan) adalah...',
    options: ['Kelenjar sublingualis', 'Kelenjar submandibularis', 'Kelenjar parotis', 'Kelenjar Brunner'],
    correctIndex: 2,
    explanation:
      'Kelenjar parotis adalah kelenjar saliva terbesar dari tiga pasang kelenjar saliva (parotis, submandibularis, sublingualis).',
  },
  {
    id: 'q-dig-8',
    system: 'digestive',
    relatedOrganId: 'dig-large-intestine',
    question:
      'Urutan segmen usus besar (intestinum mayor) setelah katup ileosekal menuju rektum adalah...',
    options: [
      'Sekum → Kolon asendens → Kolon transversum → Kolon desendens → Kolon sigmoid',
      'Sekum → Kolon desendens → Kolon transversum → Kolon asendens → Kolon sigmoid',
      'Kolon sigmoid → Sekum → Kolon asendens → Kolon transversum → Kolon desendens',
      'Duodenum → Sekum → Kolon transversum → Kolon desendens → Kolon sigmoid',
    ],
    correctIndex: 0,
    explanation:
      'Feses cair masuk ke sekum (tempat melekatnya apendiks), naik ke kolon asendens, melintang di transversum, turun ke desendens, lalu masuk kolon sigmoid berbentuk S menuju rektum.',
  },
  {
    id: 'q-dig-9',
    system: 'digestive',
    relatedOrganId: 'dig-pancreas',
    question:
      'Bagian pankreas yang terletak tepat di dalam lengkung C duodenum sekaligus menjadi muara duktus pankreatikus adalah...',
    options: ['Kauda (ekor) pankreas', 'Korpus pankreas', 'Kaput (kepala) pankreas', 'Fundus pankreas'],
    correctIndex: 2,
    explanation:
      'Pankreas tersusun atas kaput (kepala di lengkung duodenum), korpus (badan), dan kauda/ekor (mengarah ke limpa).',
  },
  {
    id: 'q-dig-10',
    system: 'digestive',
    relatedOrganId: 'dig-cavum-oris',
    question:
      'Urutan 4 tahap fisiologis sistem pencernaan secara berurutan dari awal hingga akhir adalah...',
    options: [
      'Digesti → Ingesti → Absorbsi → Eliminasi',
      'Ingesti → Absorbsi → Digesti → Eliminasi',
      'Ingesti → Digesti → Absorbsi → Eliminasi',
      'Ingesti → Digesti → Eliminasi → Absorbsi',
    ],
    correctIndex: 2,
    explanation:
      'Tahapan pencernaan dimulai dari pemasukan makanan (Ingesti), pemecahan mekanik & kimiawi (Digesti), penyerapan nutrien (Absorbsi), dan pembuangan sisa (Eliminasi).',
  },

  // CARDIOVASCULAR (10)
  {
    id: 'q-cv-1',
    system: 'cardiovascular',
    relatedOrganId: 'cv-pulm-artery',
    question:
      'Urutan lengkap peredaran darah kecil (sirkulasi pulmonal) yang benar adalah...',
    options: [
      'Ventrikel kiri → Aorta → Paru → Vena cava → Atrium kanan',
      'Ventrikel kanan → Arteri pulmonalis → Paru → Vena pulmonalis → Atrium kiri',
      'Atrium kanan → Arteri pulmonalis → Paru → Vena pulmonalis → Ventrikel kiri',
      'Ventrikel kanan → Vena pulmonalis → Paru → Arteri pulmonalis → Atrium kiri',
    ],
    correctIndex: 1,
    explanation:
      'Darah miskin O2 dipompa dari ventrikel kanan melewati katup pulmonal ke arteri pulmonalis menuju paru, lalu darah kaya O2 kembali lewat vena pulmonalis ke atrium kiri.',
  },
  {
    id: 'q-cv-2',
    system: 'cardiovascular',
    relatedOrganId: 'cv-sa-node',
    question:
      'Urutan jalannya impuls listrik pada sistem konduksi jantung normal adalah...',
    options: [
      'AV Node → SA Node → Berkas His → Serabut Purkinje',
      'SA Node → Berkas His → AV Node → Serabut Purkinje',
      'SA Node → AV Node → Berkas His → Serabut Purkinje',
      'Serabut Purkinje → Berkas His → AV Node → SA Node',
    ],
    correctIndex: 2,
    explanation:
      'Impuls dicetuskan oleh SA Node (pacemaker), ditunda ±0,1 detik di AV Node, lalu dihantarkan cepat melalui Berkas His dan Serabut Purkinje ke miokardium ventrikel.',
  },
  {
    id: 'q-cv-3',
    system: 'cardiovascular',
    relatedOrganId: 'cv-valve-mitral',
    question:
      'Bunyi jantung pertama (S1 / "LUB") terjadi pada awal fase sistolik ventrikel akibat...',
    options: [
      'Menutupnya katup semilunaris aorta dan pulmonal',
      'Menutupnya katup atrioventrikularis (trikuspidalis dan bikuspidalis/mitral)',
      'Membukanya katup bikuspidalis secara mendadak',
      'Aliran darah deras masuk ke atrium kanan',
    ],
    correctIndex: 1,
    explanation:
      'Saat ventrikel mulai berkontraksi (sistole), kenaikan tekanan menutup katup AV (trikuspidalis & mitral) agar darah tidak berbalik ke atrium, menghasilkan bunyi S1.',
  },
  {
    id: 'q-cv-4',
    system: 'cardiovascular',
    relatedOrganId: 'cv-lv',
    question:
      'Ruang jantung manakah yang memiliki lapisan miokardium paling tebal (~3 kali ruang pasangannya)?',
    options: ['Atrium dextra', 'Atrium sinistra', 'Ventrikel dextra', 'Ventrikel sinistra'],
    correctIndex: 3,
    explanation:
      'Ventrikel sinistra harus menghasilkan tekanan tinggi (±120 mmHg) untuk memompa darah melalui aorta ke seluruh sirkulasi sistemik yang beresistensi tinggi.',
  },
  {
    id: 'q-cv-5',
    system: 'cardiovascular',
    relatedOrganId: 'cv-myocardium',
    question:
      'Susunan 3 lapisan dinding jantung dari yang paling luar ke paling dalam adalah...',
    options: [
      'Endokardium → Miokardium → Perikardium',
      'Perikardium → Endokardium → Miokardium',
      'Perikardium → Miokardium → Endokardium',
      'Miokardium → Perikardium → Endokardium',
    ],
    correctIndex: 2,
    explanation:
      'Lapisan pelindung terluar adalah Perikardium, lapisan tengah berotot adalah Miokardium, dan lapisan endotel terdalam adalah Endokardium.',
  },
  {
    id: 'q-cv-6',
    system: 'cardiovascular',
    relatedOrganId: 'cv-av-node',
    question:
      'Mengapa AV Node memperlambat hantaran impuls listrik sekitar 0,1 detik sebelum diteruskan ke Berkas His?',
    options: [
      'Agar kedua ventrikel berkontraksi sebelum atrium selesai berelaksasi',
      'Memberi waktu bagi atrium menyelesaikan kontraksi untuk mengisi penuh ventrikel sebelum sistole ventrikel',
      'Untuk menurunkan denyut jantung menjadi di bawah 40 kali/menit',
      'Agar katup aorta menutup lebih awal saat diastole',
    ],
    correctIndex: 1,
    explanation:
      'Penundaan fisiologis di AV Node memastikan pengisian ventrikel maksimal (termasuk kontribusi atrial kick) sebelum ventrikel mulai berkontraksi.',
  },
  {
    id: 'q-cv-7',
    system: 'cardiovascular',
    relatedOrganId: 'cv-pulm-vein',
    question:
      'Pembuluh darah besar yang membawa darah kaya oksigen (teroksigenasi) masuk menuju atrium sinistra adalah...',
    options: ['Vena cava superior', 'Arteri pulmonalis', 'Vena pulmonalis', 'Aorta asendens'],
    correctIndex: 2,
    explanation:
      'Keempat vena pulmonalis membawa darah kaya O2 dari paru-paru langsung ke atrium kiri.',
  },
  {
    id: 'q-cv-8',
    system: 'cardiovascular',
    relatedOrganId: 'cv-valve-aortic',
    question:
      'Pada fase diastolik ventrikel (relaksasi), bunyi jantung kedua (S2 / "DUB") dihasilkan oleh...',
    options: [
      'Penutupan katup semilunaris aorta dan semilunaris pulmonal',
      'Penutupan katup trikuspidalis dan bikuspidalis',
      'Pembukaan katup semilunaris aorta',
      'Kontraksi otot papilaris ventrikel kiri',
    ],
    correctIndex: 0,
    explanation:
      'Saat ventrikel berelaksasi di awal diastole, tekanan arteri besar melebihi tekanan ventrikel sehingga katup semilunar aorta dan pulmonal menutup (S2).',
  },
  {
    id: 'q-cv-9',
    system: 'cardiovascular',
    relatedOrganId: 'cv-vena-cava',
    question:
      'Muara akhir peredaran darah besar (sistemik) yang mengembalikan darah miskin oksigen dari tubuh bagian atas dan bawah ke atrium dextra adalah...',
    options: [
      'Arteri pulmonalis',
      'Vena cava superior & vena cava inferior',
      'Vena pulmonalis dekstra & sinistra',
      'Arkus aorta',
    ],
    correctIndex: 1,
    explanation:
      'Vena cava superior mengembalikan darah dari tubuh bagian atas, sedangkan vena cava inferior dari tubuh bagian bawah ke atrium kanan.',
  },
  {
    id: 'q-cv-10',
    system: 'cardiovascular',
    relatedOrganId: 'cv-his-purkinje',
    question:
      'Struktur konduksi yang menyebarkan depolarisasi secara cepat ke seluruh miokardium ventrikel dimulai dari apeks ke arah basis adalah...',
    options: ['SA Node', 'Jalur internodal atrium', 'Serabut Purkinje', 'Katup trikuspidalis'],
    correctIndex: 2,
    explanation:
      'Serabut Purkinje menjalar di subendokardium ventrikel mulai dari apeks ke atas sehingga darah terpompa ke atas menuju katup pulmonal & aorta.',
  },

  // ENDOCRINE (10)
  {
    id: 'q-end-1',
    system: 'endocrine',
    relatedOrganId: 'end-pituitary-post',
    question:
      'Dua hormon yang disintesis oleh hipotalamus namun disimpan dan dilepaskan oleh hipofisis lobus posterior (neurohipofisis) adalah...',
    options: [
      'GH dan Prolaktin',
      'TSH dan ACTH',
      'ADH (Vasopresin) dan Oksitosin',
      'FSH dan LH',
    ],
    correctIndex: 2,
    explanation:
      'Hipofisis posterior melepaskan ADH (mengatur retensi air di ginjal) dan Oksitosin (kontraksi uterus & refleks pengeluaran ASI).',
  },
  {
    id: 'q-end-2',
    system: 'endocrine',
    relatedOrganId: 'end-pancreas-islets',
    question:
      'Saat kadar glukosa darah meningkat setelah makan, sel manakah pada Pulau Langerhans yang aktif menurunkan glukosa darah?',
    options: [
      'Sel alfa yang mensekresi glukagon',
      'Sel beta yang mensekresi insulin',
      'Korteks adrenal yang mensekresi kortisol',
      'Medula adrenal yang mensekresi epinefrin',
    ],
    correctIndex: 1,
    explanation:
      'Sel Beta Pulau Langerhans melepaskan Insulin yang meningkatkan uptake glukosa ke sel serta mendorong glikogenesis sehingga glukosa darah turun ke rentang normal.',
  },
  {
    id: 'q-end-3',
    system: 'endocrine',
    relatedOrganId: 'end-parathyroid',
    question:
      'Ketika seorang pasien mengalami hipokalsemia (kadar Ca2+ darah rendah), hormon apakah yang dilepaskan untuk menaikkan kembali kadar kalsium darah?',
    options: [
      'Kalsitonin dari kelenjar tiroid',
      'Hormon Paratiroid (PTH) dari 4 kelenjar paratiroid',
      'Aldosteron dari korteks adrenal',
      'Insulin dari sel beta pankreas',
    ],
    correctIndex: 1,
    explanation:
      'PTH menaikkan Ca2+ darah dengan merangsang resorpsi tulang oleh osteoklas, reabsorpsi Ca2+ di ginjal, dan absorpsi Ca2+ di usus melalui aktivasi vitamin D.',
  },
  {
    id: 'q-end-4',
    system: 'endocrine',
    relatedOrganId: 'end-thyroid',
    question:
      'Kelenjar berbentuk kupu-kupu di leher anterior yang menghasilkan hormon T3, T4, dan Kalsitonin adalah...',
    options: ['Kelenjar paratiroid', 'Kelenjar timus', 'Kelenjar tiroid', 'Hipofisis anterior'],
    correctIndex: 2,
    explanation:
      'Tiroid memiliki lobus kanan dan kiri yang dihubungkan isthmus di anterior trakea; memproduksi T3/T4 untuk metabolisme basal dan Kalsitonin untuk menurunkan Ca2+ darah.',
  },
  {
    id: 'q-end-5',
    system: 'endocrine',
    relatedOrganId: 'end-adrenal',
    question:
      'Pasangan bagian kelenjar adrenal dan hormon yang dihasilkannya dengan tepat adalah...',
    options: [
      'Korteks adrenal: Epinefrin; Medula adrenal: Kortisol & Aldosteron',
      'Korteks adrenal: Kortisol & Aldosteron; Medula adrenal: Adrenalin (Epinefrin)',
      'Korteks adrenal: Insulin; Medula adrenal: Glukagon',
      'Korteks adrenal: TSH; Medula adrenal: ADH',
    ],
    correctIndex: 1,
    explanation:
      'Korteks adrenal menghasilkan hormon steroid (Kortisol dan Aldosteron), sedangkan Medula adrenal menghasilkan katekolamin (Epinefrin/adrenalin dan Norepinefrin).',
  },
  {
    id: 'q-end-6',
    system: 'endocrine',
    relatedOrganId: 'end-hypothalamus',
    question:
      'Bagaimana cara mekanisme umpan balik negatif (negative feedback) menjaga kadar hormon tiroid tetap seimbang?',
    options: [
      'Kadar T3/T4 yang tinggi terus memacu hipotalamus melepas lebih banyak TRH',
      'Kadar T3/T4 yang tinggi menghambat pelepasan TRH dari hipotalamus dan TSH dari hipofisis anterior',
      'Kadar T3/T4 yang rendah menghentikan seluruh produksi TSH',
      'Hipofisis posterior langsung menghancurkan T3/T4 di aliran darah',
    ],
    correctIndex: 1,
    explanation:
      'Pada umpan balik negatif, peningkatan produk akhir (T3/T4) menghambat kelenjar pengaturnya (hipotalamus ↓TRH dan hipofisis anterior ↓TSH) agar tidak berlebihan.',
  },
  {
    id: 'q-end-7',
    system: 'endocrine',
    relatedOrganId: 'end-pituitary-ant',
    question:
      'Hormon tropik dari hipofisis anterior yang merangsang korteks adrenal untuk mensekresi kortisol adalah...',
    options: ['TSH', 'GH', 'ACTH', 'FSH'],
    correctIndex: 2,
    explanation:
      'ACTH (Adrenocorticotropic Hormone) disekresikan oleh lobus anterior hipofisis untuk menstimulasi korteks adrenal memproduksi kortisol.',
  },
  {
    id: 'q-end-8',
    system: 'endocrine',
    relatedOrganId: 'end-pancreas-islets',
    question:
      'Saat pasien berpuasa lama sehingga glukosa darah menurun, hormon yang merangsang pemecahan glikogen hati menjadi glukosa (glikogenolisis) adalah...',
    options: [
      'Glukagon dari sel alfa Pulau Langerhans',
      'Insulin dari sel beta Pulau Langerhans',
      'Kalsitonin dari sel parafolikular tiroid',
      'Oksitosin dari hipofisis posterior',
    ],
    correctIndex: 0,
    explanation:
      'Sel alfa Pulau Langerhans melepas Glukagon saat kadar glukosa rendah untuk memicu glikogenolisis di hati sehingga gula darah kembali naik.',
  },
  {
    id: 'q-end-9',
    system: 'endocrine',
    relatedOrganId: 'end-ovary',
    question:
      'Gonad wanita yang mensekresi hormon estrogen dan progesteron di bawah pengaruh FSH dan LH adalah...',
    options: ['Testis', 'Ovarium', 'Kelenjar adrenal', 'Hipofisis posterior'],
    correctIndex: 1,
    explanation:
      'Ovarium memproduksi estrogen (proliferasi endometrium & ciri seks sekunder) dan progesteron (mempertahankan endometrium selama fase luteal/kehamilan).',
  },
  {
    id: 'q-end-10',
    system: 'endocrine',
    relatedOrganId: 'end-testis',
    question:
      'Hormon yang diproduksi oleh sel Leydig di testis untuk spermatogenesis dan perkembangan ciri seks sekunder pria adalah...',
    options: ['Progesteron', 'Estrogen', 'Testosteron', 'Aldosteron'],
    correctIndex: 2,
    explanation:
      'LH merangsang sel interstitial Leydig pada testis untuk menghasilkan testosteron.',
  },
];

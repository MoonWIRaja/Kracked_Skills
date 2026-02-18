# PANDUAN LENGKAP KRAKCED_SKILLS (KD) v5.0.0

---

## 🎯 APA ITU KRACKED_SKILLS?

**Kracked_Skills (KD)** adalah sistem AI Skill untuk pembangunan produk perisian yang terstruktur. Sistem ini membantu developer dan AI bekerja bersama dengan workflow yang jelas dari idea hingga release.

---

## 🚀 CARA INSTALL

### Mac / Linux
```bash
curl -fsSL https://raw.githubusercontent.com/MoonWIRaja/Kracked_Skills/main/kd.sh | bash
```

### Windows PowerShell
```powershell
irm https://raw.githubusercontent.com/MoonWIRaja/Kracked_Skills/main/kd.ps1 | iex
```

### Non-Interactive Install
```bash
node kd.js install --target=cline --lang=ms --non-interactive
```

---

## 📊 KOMPONEN SISTEM

| Komponen | Jumlah | Status |
|----------|--------|--------|
| Stages | 10 | ✅ |
| Commands | 75 | ✅ |
| Roles | 16 | ✅ |
| Skills | 15 | ✅ |
| Tools | 8 | ✅ |
| Adapters | 6 | ✅ |

---

## 📁 STRUKTUR UTAMA

```
Kracked_skill/
├── kd.js                    ← Entry point TUI
├── kd.sh                    ← Wrapper Mac/Linux
├── kd.ps1                   ← Wrapper Windows
├── package.json             ← Node.js config
│
├── src/
│   ├── tui/                 ← TUI Application
│   │   ├── banner.js
│   │   └── screens/
│   │       ├── main-menu.js
│   │       ├── install.js
│   │       ├── update.js
│   │       ├── uninstall.js
│   │       └── about.js
│   │
│   ├── skills/              ← 15 Skills
│   ├── prompts/             ← AI Prompts
│   ├── adapters/            ← 6 AI Tool Adapters
│   ├── templates/           ← 9 Templates
│   └── version-checker/     ← Version Checker
│
└── docs/                    ← Documentation
```

---

## 📝 CARA PENGGUNAAN

### 1. Install KD
```bash
curl -fsSL https://raw.githubusercontent.com/MoonWIRaja/Kracked_Skills/main/kd.sh | bash
```

### 2. Pilih dari Menu
```
[1] 📦 Install KD - Install KD in current directory
[2] 🔄 Update KD - Update to latest version
[3] 🗑️  Uninstall KD - Remove KD from directory
[4] ℹ️  About - Information about KD
[5] 🚪 Exit - Exit the application
```

### 3. Ikut Langkah Install
- Pilih AI tool (Claude Code, Cursor, Cline, dll)
- Pilih bahasa (English, Bahasa Melayu, Custom)
- Confirm install

### 4. Guna KD dalam Projek
```
/KD                    # Show command menu
/KD-analyze            # Start discovery
/KD-brainstorm         # Brainstorming
/KD-architecture       # Design system
/KD-dev-story          # Implement story
```

---

## 🌍 SOKONGAN BAHASA

KD menyokong sebarang bahasa:
- English (en)
- Bahasa Melayu (ms)
- Custom - taip bahasa sendiri

---

## 🔧 TROUBLESHOOTING

### Masalah: TUI tidak menunggu input
**Penyelesaian:** Fix telah dibuat dengan redirect stdin ke `/dev/tty`

### Masalah: Command tidak dikenali
**Penyelesaian:** Pastikan Node.js dipasang (v18+)

---

## ✅ STATUS SISTEM

**SISTEM: LENGKAP - SEMUA KOMPONEN BERFUNGSI**

---

*KD finishes what it starts.* | KRACKEDDEVS | https://krackeddevs.com/
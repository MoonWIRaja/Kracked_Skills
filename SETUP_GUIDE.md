# KRACKED Skill - Setup Guide

## Sudah Siap! ✅

Plugin KRACKED Skill sudah siap dan siap digunakan!

### Apa Yang Telah Dibuat

```
kracked_skill/
├── plugin.json          # Manifest plugin untuk Claude Code
├── package.json         # Manifest NPM
├── README.md            # Dokumentasi lengkap (EN & BM)
├── INSTALL.md           # Panduan pemasangan
├── LICENSE              # MIT License
│
├── commands/            # Arahan CLI
│   ├── skills/        # 7 peringkat kerja
│   ├── multi-agent/    # Party Mode & Swarm
│   └── utility/       # help, language, status, dll
│
├── agents/              # 9 definisi peranan
│   ├── analyst.md
│   ├── product-manager.md
│   ├── architect.md
│   ├── tech-lead.md
│   ├── engineer.md
│   ├── qa.md
│   ├── security.md
│   ├── devops.md
│   └── release-manager.md
│
├── skills/              # 3 dokumen skill utama
│   ├── kracked-workflow.md
│   ├── kracked-multi-agent.md
│   └── kracked-language.md
│
├── scripts/             # Installer NPM
│   ├── install.js
│   ├── verify.js
│   └── uninstall.js
│
└── .claude/             # Konfigurasi
    └── local.md
```

### GitHub Repository

Repository sudah siap di:
https://github.com/MoonWIRaja/Kracked_skill

### Cara Guna (Untuk Pengguna)

Selepas pemasangan, mulakan semula Claude Code dan guna arahan:

```
/kracked-help      # Tunjuk semua arahan
/analyze          # Mulakan projek baharu
/language EN       # Pilih Bahasa Inggeris
/language MS       # Pilih Bahasa Melayu
/status            # Lihat keadaan projek
```

### Contoh Alur Kerja Lengkap

**1. Mula projek baharu:**
```
/analyze
```

**2. Cipta dokumen keperluan (PRD):**
```
/prd
```

**3. Reka bentuk seni bina:**
```
/architecture --depth=standard
```

**4. Laksanakan cerita (story):**
```
/dev-story AUTH-001 --focus=full
```

**5. Semak kod:**
```
/code-review --scope=full
```

**6. Rancang pemasangan:**
```
/deployment-plan --env=staging
```

**7. Ulangi tayangan:**
```
/scale-review
```

### Untuk Pengguna Baru

Pengguna baharu perlu:
1. Clone repository ke folder plugin Claude Code
2. Mulakan semula Claude Code
3. Guna `/kracked-help` untuk lihat semua arahan

### Hubungi

- Issues: https://github.com/MoonWIRaja/Kracked_skill/issues
- Repository: https://github.com/MoonWIRaja/Kracked_skill

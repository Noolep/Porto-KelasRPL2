// ==========================================
// 0. SISTEM AUDIO & FADE (ANTI ERROR)
// ==========================================
console.log("Hore! JavaScript berhasil terhubung.");

const homeAudio = new Audio("home.mp3");
homeAudio.loop = true;
homeAudio.volume = 0;
let isHomeAudioPlaying = false;
let currentAudio = null;

function fadeAudio(audio, type, targetVol = 0.5, callback) {
  if (!audio) return;
  clearInterval(audio.fadeInterval);

  try {
    if (type === "in") {
      let playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.warn("Audio belum ada atau diblokir browser.");
        });
      }

      let vol = audio.volume;
      audio.fadeInterval = setInterval(() => {
        try {
          if (vol < targetVol - 0.05) {
            vol += 0.05;
            audio.volume = Math.min(1, Math.max(0, vol));
          } else {
            audio.volume = Math.min(1, Math.max(0, targetVol));
            clearInterval(audio.fadeInterval);
            if (callback) callback();
          }
        } catch (e) {
          clearInterval(audio.fadeInterval);
        }
      }, 50);
    } else if (type === "out") {
      let vol = audio.volume;
      audio.fadeInterval = setInterval(() => {
        try {
          if (vol > 0.05) {
            vol -= 0.05;
            audio.volume = Math.min(1, Math.max(0, vol));
          } else {
            audio.volume = 0;
            audio.pause();
            clearInterval(audio.fadeInterval);
            if (callback) callback();
          }
        } catch (e) {
          clearInterval(audio.fadeInterval);
          if (callback) callback();
        }
      }, 50);
    }
  } catch (error) {
    console.warn("Sistem Audio Dilewati.");
  }
}

const bgmToggle = document.getElementById("bgmToggle");
bgmToggle.addEventListener("click", () => {
  if (homeAudio.paused || homeAudio.volume === 0) {
    fadeAudio(homeAudio, "in", 0.5);
    isHomeAudioPlaying = true;
    bgmToggle.classList.add(
      "text-neonRed",
      "border-neonRed",
      "shadow-[0_0_10px_#ff2a2a]",
    );
  } else {
    fadeAudio(homeAudio, "out");
    isHomeAudioPlaying = false;
    bgmToggle.classList.remove(
      "text-neonRed",
      "border-neonRed",
      "shadow-[0_0_10px_#ff2a2a]",
    );
  }
});

document.body.addEventListener("click", function firstPlay() {
  if (!isHomeAudioPlaying && homeAudio.paused) {
    fadeAudio(homeAudio, "in", 0.5);
    isHomeAudioPlaying = true;
    bgmToggle.classList.add(
      "text-neonRed",
      "border-neonRed",
      "shadow-[0_0_10px_#ff2a2a]",
    );
  }
  document.body.removeEventListener("click", firstPlay);
});

// ==========================================
// 1. DATA SISWA & MODAL
// ==========================================
const students = [
  {
    name: "Abdullah",
    fullName: "Abdullah",
    role: "Siswa",
    image: "image/siswa/Abdullah/image.png",
    bio: "Bio belum diisi",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Abdullah/music.mp3",
  },
  {
    name: "Rofiq",
    fullName: "Ahmad Rofiq Al Labib",
    role: "Siswa",
    image: "image/siswa/Rofiq/photo.jpeg",
    bio: "Kemana kau yang dulu. ",
    instagram: "https://www.instagram.com/pino_mini_ral?igsh=ZGY1Y3lsbWVhN2V0",
    tiktok: "https://www.tiktok.com/@ahmadrofiqallabib7?_r=1&_t=ZS-95Q0EOzgflE",
    audio: "image/siswa/Rofiq/music.mp3",
  },
  {
    name: "Akmal",
    fullName: "Akmal Rasyid",
    role: "Siswa",
    image: "image/siswa/Akmal/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Akmal/music.mp3",
  },
  {
    name: "Al Qonisa",
    fullName: "Al Qonisa",
    role: "Siswa",
    image: "image/siswa/Al_Qonisa/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Al_Qonisa/music.mp3",
  },
  {
    name: "Alwi",
    fullName: "Alif Alwiguna Syahir",
    role: "Siswa",
    image: "image/siswa/Alwi/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Alwi/music.mp3",
  },
  {
    name: "Anin",
    fullName: "Anin Aisyah",
    role: "Siswa",
    image: "image/siswa/Anin/photo.jpeg",
    bio: "我爱你",
    instagram: "https://www.instagram.com/allo0wwrawr?igsh=cmlxYXpnMDFra3A4",
    tiktok: "",
    audio: "image/siswa/Anin/music.mp3",
  },
  {
    name: "Asih",
    fullName: "Asih Nanda",
    role: "Siswa",
    image: "image/siswa/Asih/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Asih/music.mp3",
  },
  {
    name: "David",
    fullName: "David Prasetya Salim",
    role: "Wakil Kelas",
    image: "image/siswa/David/photo.jpg",
    bio: "Just a 17yo dev with a Made in Heaven mindset. ☁️💻",
    instagram: "https://www.instagram.com/debbido_ser?igsh=amJpYXludjVueXIx",
    tiktok: "https://www.tiktok.com/@dheybiddo_sf?_r=1&_t=ZS-95PtdcNs07Y",
    audio: "image/siswa/David/music.mp3",
  },
  {
    name: "Dehan",
    fullName: "Dehan Avrian Fajar",
    role: "Siswa",
    image: "image/siswa/Dehan/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Dehan/music.mp3",
  },
  {
    name: "Desika",
    fullName: "Desika",
    role: "Ketua Kelas",
    image: "image/siswa/Desika/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Desika/music.mp3",
  },
  {
    name: "Hani",
    fullName: "Hanifatul Fitriyah",
    role: "Siswa",
    image: "image/siswa/Hani/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Hani/music.mp3",
  },
  {
    name: "Riana",
    fullName: "Hijriyana",
    role: "Siswa",
    image: "image/siswa/Riana/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Riana/music.mp3",
  },
  {
    name: "Kaniyah",
    fullName: "Kaniyah Meriska",
    role: "Siswa",
    image: "image/siswa/Kaniyah/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Kaniyah/music.mp3",
  },
  {
    name: "Laela",
    fullName: "Laela",
    role: "Siswa",
    image: "image/siswa/Laela/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Laela/music.mp3",
  },
  {
    name: "Lulu",
    fullName: "Lu Lu'ul Umu Muhazah",
    role: "Siswa",
    image: "image/siswa/Lulu/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Lulu/music.mp3",
  },
  {
    name: "Natalia",
    fullName: "Natalia",
    role: "Siswa",
    image: "image/siswa/Natalia/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Natalia/music.mp3",
  },
  {
    name: "Nia",
    fullName: "Nia Naura Fadiyah",
    role: "Siswa",
    image: "image/siswa/Nia/photo.jpg",
    bio: "Bio belum diisi.",
    instagram:
      "https://www.instagram.com/naurafdyhl?igsh=MWdwYTg2NHd6cjBrMA==l",
    tiktok: "",
    audio: "image/siswa/Nia/music.mp3",
  },
  {
    name: "Niha",
    fullName: "Niha Khoerunnisa",
    role: "Siswa",
    image: "image/siswa/Niha/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Niha/music.mp3",
  },
  {
    name: "Nikita",
    fullName: "Nikita Willy",
    role: "Siswa",
    image: "image/siswa/Nikita/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Nikita/music.mp3",
  },
  {
    name: "Nova",
    fullName: "Nova Dwi Rizky Rudianti",
    role: "Siswa",
    image: "image/siswa/Nova/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Nova/music.mp3",
  },
  {
    name: "Rohman",
    fullName: "Nur Rohman",
    role: "Siswa",
    image: "image/siswa/Rohman/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Rohman/music.mp3",
  },
  {
    name: "Putri",
    fullName: "Putri Nurfadilah",
    role: "Siswa",
    image: "image/siswa/Putri/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Putri/music.mp3",
  },
  {
    name: "Ricard",
    fullName: "Renaissance Ricarda S.P",
    role: "Siswa",
    image: "image/siswa/Ricard/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    whatsapp: "https://wa.me/6281389695541",
    audio: "image/siswa/Ricard/music.mp3",
  },
  {
    name: "Risna",
    fullName: "Risna Anggi Amelia",
    role: "Siswa",
    image: "image/siswa/Risna/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Risna/music.mp3",
  },
  {
    name: "Milya",
    fullName: "Rizki Milya Putri",
    role: "Siswa",
    image: "image/siswa/Milya/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Milya/music.mp3",
  },
  {
    name: "Safa",
    fullName: "Safa Rahayu",
    role: "Siswa",
    image: "image/siswa/Safa/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Safa/music.mp3",
  },
  {
    name: "Sandy",
    fullName: "Sandy",
    role: "Siswa",
    image: "image/siswa/Sandy/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Sandy/music.mp3",
  },
  {
    name: "Shoofi",
    fullName: "Shoofi Nazhiifah",
    role: "Siswa",
    image: "image/siswa/Soofi/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "https://www.instagram.com/ursoo.phiaaa?igsh=N3E5aGU5NmR3NHg3",
    tiktok: "https://www.tiktok.com/@stunsst_?_r=1&_t=ZS-95Pz0aUtEZj",
    audio: "image/siswa/Soofi/music.mp3",
  },
  {
    name: "Tomi",
    fullName: "Tomi Adiansyah",
    role: "Siswa",
    image: "image/siswa/Tomi/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Tomi/music.mp3",
  },
  {
    name: "Vega",
    fullName: "Vega Ardelia Nurhayati",
    role: "Siswa",
    image: "image/siswa/Vega/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswaa/Vega/music.mp3",
  },
  {
    name: "Wawa",
    fullName: "Wawa Maey Rizza",
    role: "Siswa",
    image: "image/siswa/Wawa/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Wawa/music.mp3",
  },
  {
    name: "Witri",
    fullName: "Witri Nurhanah",
    role: "Siswa",
    image: "image/siswa/Witri/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Witri/music.mp3",
  },
  {
    name: "Wiwi",
    fullName: "Wiwi Agustin",
    role: "Siswa",
    image: "image/siswa/Wiwi/photo.jpeg",
    bio: "Nothing.",
    instagram:
      "https://www.instagram.com/wiwi4gstnn_?igsh=MTN0cG5xbGRzdHhlbw==",
    tiktok:
      "https://www.tiktok.com/@ur.grilxy?is_from_webapp=1&sender_device=pc",
    audio: "image/siswa/Wiwi/music.mp3",
  },
  {
    name: "Yolland",
    fullName: "Yolland Fairuz Ibrahim",
    role: "Siswa",
    image: "image/siswa/Yolland/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Yolland/music.mp3",
  },
  {
    name: "Zulfa",
    fullName: "Zulfa Koerunisa",
    role: "Siswa",
    image: "image/siswa/Zulfa/photo.jpg",
    bio: "Bio belum diisi.",
    instagram: "",
    tiktok: "",
    audio: "image/siswa/Zulfa/music.mp3",
  },
];

document.querySelectorAll(".student-card").forEach((card) => {
  card.addEventListener("click", function () {
    const cardName = this.querySelector("h3").textContent.trim();
    const student = students.find((s) => s.name === cardName);
    if (!student) return;

    fadeAudio(homeAudio, "out");

    if (currentAudio) {
      const audioToStop = currentAudio;
      currentAudio = null;
      fadeAudio(audioToStop, "out", 0, () => {
        try {
          audioToStop.currentTime = 0;
        } catch (e) {}
      });
    }

    document.getElementById("modalName").textContent = student.fullName;
    const modalImg = document.getElementById("modalImage");
    modalImg.src = student.image;
    modalImg.onerror = function () {
      this.src =
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(student.fullName) +
        "&background=1a1a1d&color=ff2a2a&size=200";
    };
    document.getElementById("modalBio").textContent = student.bio;

    const igLink = document.getElementById("igLink");
    const waLink = document.getElementById("waLink");
    const tiktokLink = document.getElementById("tiktokLink");
    igLink.href = student.instagram || "#";
    igLink.style.opacity = student.instagram ? "1" : "0.4";
    igLink.style.pointerEvents = student.instagram ? "auto" : "none";

    if (student.whatsapp) {
      waLink.href = student.whatsapp;
      waLink.classList.remove("hidden");
      tiktokLink.classList.add("hidden");
    } else {
      waLink.classList.add("hidden");
      tiktokLink.classList.remove("hidden");
      tiktokLink.href = student.tiktok || "#";
      tiktokLink.style.opacity = student.tiktok ? "1" : "0.4";
      tiktokLink.style.pointerEvents = student.tiktok ? "auto" : "none";
    }

    if (student.audio) {
      currentAudio = new Audio(student.audio);
      currentAudio.loop = true;
      currentAudio.volume = 0;
      fadeAudio(currentAudio, "in", 0.8);
    }

    document.getElementById("studentModal").classList.remove("hidden");
    document.getElementById("studentModal").classList.add("flex");
  });
});

function closeModal() {
  document.getElementById("studentModal").classList.add("hidden");
  document.getElementById("studentModal").classList.remove("flex");

  if (currentAudio) {
    const audioToStop = currentAudio;
    currentAudio = null;
    fadeAudio(audioToStop, "out", 0, () => {
      try {
        audioToStop.currentTime = 0;
      } catch (e) {}
    });
  }

  if (isHomeAudioPlaying) {
    fadeAudio(homeAudio, "in", 0.5);
  }
}

document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("studentModal").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// ==========================================
// 2. SCRIPT TEKS 3D BERPUTAR
// ==========================================
const textToSpinPillar =
  "SOFTWARE ENGINEERING • XI RPL 2 • DIGITAL CREATORS • ";
const ring = document.getElementById("ring");
const radius = 220;
const repeatCount = 3;
const fullTextPillar = textToSpinPillar.repeat(repeatCount);

const chars = fullTextPillar.split("");
const angleStep = 360 / chars.length;

chars.forEach((char, i) => {
  const span = document.createElement("span");
  span.className = "char-3d";
  span.innerText = char;
  const angle = i * angleStep;
  span.style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`;
  ring.appendChild(span);
});

// ==========================================
// 3. SCRIPT EFEK HUJAN MATRIX
// ==========================================
const canvas = document.getElementById("hujanTeks");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const teksHujanSource = "SOLIDARITAS TINGGI 0110101 •RPL•";
const charsHujan = teksHujanSource.split("");

const fontSizeHujan = 16;
const columns = canvas.width / fontSizeHujan;

const drops = [];
for (let x = 0; x < columns; x++) {
  drops[x] = Math.random() * -50;
}

function drawMatrixHujan() {
  ctx.fillStyle = "rgba(15, 15, 17, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ff2a2a";
  ctx.font = fontSizeHujan + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = charsHujan[Math.floor(Math.random() * charsHujan.length)];
    ctx.fillText(text, i * fontSizeHujan, drops[i] * fontSizeHujan);
    if (drops[i] * fontSizeHujan > canvas.height && Math.random() > 0.95) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrixHujan, 33);

// ==========================================
// 4. SCRIPT EFEK SCROLL TEKS RAKSASA
// ==========================================
window.addEventListener("scroll", () => {
  const wrapper = document.getElementById("section-3d-wrapper");
  const bgLeft = document.getElementById("bg-text-left");
  const bgRight = document.getElementById("bg-text-right");

  if (wrapper && bgLeft && bgRight) {
    const rect = wrapper.getBoundingClientRect();
    const centerOffset = window.innerHeight / 2 - (rect.top + rect.height / 2);
    bgLeft.style.transform = `translateX(${centerOffset * 0.8}px)`;
    bgRight.style.transform = `translateX(${-centerOffset * 0.8}px)`;
  }
});

// ==========================================
// 5. SCRIPT CHATBOT / TERMINAL SYSTEM
// ==========================================
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");
const robotAvatar = document.getElementById("robotAvatar");
const robotStatus = document.getElementById("robotStatus");

function appendToTerminal(text, isUser = false, isTypingEffect = false) {
  const div = document.createElement("div");
  if (isUser) {
    div.innerHTML = `<span class="text-neonRed font-bold">C:\\XIRPL2></span> <span class="text-white">${text}</span>`;
    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  } else {
    if (isTypingEffect) {
      terminalOutput.appendChild(div);
      let i = 0;
      robotAvatar.src = "response.png";
      robotStatus.textContent = "STATUS: TYPING...";
      robotStatus.classList.remove("text-neonRed", "border-neonRed");
      robotStatus.classList.add("text-green-500", "border-green-500");
      terminalInput.disabled = true;

      const typingInterval = setInterval(() => {
        if (text.substring(i, i + 4) === "<br>") {
          div.innerHTML += "<br>";
          i += 4;
        } else {
          div.innerHTML += text.charAt(i);
          i++;
        }
        terminalOutput.scrollTop = terminalOutput.scrollHeight;

        if (i >= text.length) {
          clearInterval(typingInterval);
          robotAvatar.src = "idle.png";
          robotStatus.textContent = "STATUS: IDLE";
          robotStatus.classList.remove("text-green-500", "border-green-500");
          robotStatus.classList.add("text-neonRed", "border-neonRed");
          terminalInput.disabled = false;
          terminalInput.focus();
        }
      }, 20);
    } else {
      div.innerHTML = text;
      terminalOutput.appendChild(div);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  }
}

function processCommand(cmd) {
  const lowerCmd = cmd.toLowerCase().trim();
  if (!lowerCmd) return;

  appendToTerminal(cmd, true);
  let response = "";

  // Variasi pertanyaan untuk memanggil RePelz & Sapaan
  const tanyaBot = [
    "siapa kamu",
    "kamu siapa",
    "namamu siapa",
    "nama kamu",
    "who are you",
    "kamu ini apa",
    "bot apa ini",
    "identitas",
    "repelz",
  ];
  const sapaanBot = [
    "halo",
    "hai",
    "hello",
    "hi ",
    "assalamualaikum",
    "selamat pagi",
    "selamat siang",
    "selamat malam",
    "pagi",
    "siang",
    "sore",
    "malam",
    "ping",
    "p",
  ];

  if (lowerCmd === "developer") {
    response =
      "[ SYSTEM DEVELOPER ]\nNama: Ricard\nPeran: Full Stack Developer XI RPL 2\nStatus: Online, siap ngoding!\n[VISUAL DEVELOPER]\nNama:David\nPeran:Mengedit Visual seperti menambah foto,audio,asset,dll\nStatus:BUSY/SIBUK Sedang input data";
  } else if (lowerCmd === "sejarah") {
    response =
      "[ SEJARAH KELAS ]\nKelas kami Terdiri Dari 35 Rekan rekan yang tangguh,Kami saat ini masih mencari ilmu pengetahuan untuk bekal masa depan kami,kami dari angkatan ke 22 dari SMKN2 Indramayu kami semua memiliki keunggulan masing masing makadari iru kami harus kompak saling membantu satu sama lain saat ini kami masih berproses untuk jadi yang terbaik dari yang terbaik.";
  } else if (lowerCmd === "guru") {
    response =
      "[ DATA GURU PEMBIMBI    NG ]\nNama: Ibu Galih Puja Asmayanto S.pd.\nPeran:Wali kelas XI Rpl2 \nPesan:jangan patah semangat tetap kompak kalian semua punya potensi yang luar biasa";
  } else if (tanyaBot.some((kata) => lowerCmd.includes(kata))) {
    response =
      "[ SYSTEM AI ]\nNamaku RePelz Gen 0.1 dan developerku adalah David Prasetya Salim.\nAda hal lain yang bisa kubantu? Maaf jika aku tak bisa jawab banyak.";
  } else if (sapaanBot.some((kata) => lowerCmd.includes(kata))) {
    response =
      "[ SYSTEM AI ]\nHalo! 👋 Aku RePelz Gen 0.1 siap melayani.\nSilakan cari nama temanmu atau ketik perintah seperti 'developer', 'sejarah', atau 'guru'.";
  } else {
    const matchedStudent = students.find(
      (s) =>
        s.name.toLowerCase().includes(lowerCmd) ||
        s.fullName.toLowerCase().includes(lowerCmd),
    );

    if (matchedStudent) {
      response = `[ DATA SISWA DITEMUKAN ]\nNama Lengkap: ${matchedStudent.fullName}\nRole: ${matchedStudent.role}\nBio: ${matchedStudent.bio}\nInstagram: ${matchedStudent.instagram || "-"}`;
    } else {
      response = `[ ERROR ] Perintah '${cmd}' tidak dikenali atau nama siswa tidak ditemukan.\nKetik: 'developer', 'sejarah', 'guru', atau cari nama siswa.`;
    }
  }

  response = response.replace(/\n/g, "<br>");
  setTimeout(() => {
    appendToTerminal(response, false, true);
  }, 300);
}

terminalInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const cmd = this.value;
    this.value = "";
    processCommand(cmd);
  }
});

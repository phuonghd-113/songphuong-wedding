"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationSec: number;
  subtitle?: string;
  audioUrl: string;
}

interface Phase {
  id: number;
  number: string;
  title: string;
  duration: string;
  description: string;
  songs: Song[];
}

const PHASES_DATA: Phase[] = [
  {
    id: 1,
    number: "01",
    title: "Đón Khách",
    duration: "45–60 phút",
    description:
      "Nhạc tình yêu nhẹ nhàng, lãng mạn đón tiếp quan khách hai họ chuyện trò sum vầy trang trọng",
    songs: [
      {
        id: "p1-1",
        title: "Until I Found You",
        artist: "Stephen Sanchez",
        duration: "02:58",
        durationSec: 178,
        subtitle: "Acoustic Pop Lãng Mạn",
        audioUrl: "/music/until-i-found-you.mp3",
      },
      {
        id: "p1-2",
        title: "Trộm Vía",
        artist: "Tình Ca Đính Ước",
        duration: "03:53",
        durationSec: 233,
        subtitle: "Giai Điệu Ngọt Ngào • Chúc Phúc Lứa Đôi",
        audioUrl: "/music/trom-via.mp3",
      },
      {
        id: "p1-3",
        title: "Em Đồng Ý (I Do)",
        artist: "Đức Phúc x 911",
        duration: "03:23",
        durationSec: 203,
        subtitle: "Bản Hit Cưới Quốc Dân",
        audioUrl: "/music/em-dong-y-i-do.mp3",
      },
      {
        id: "p1-4",
        title: "Thiên Đường Với Người Mình Thương",
        artist: "Tình Khúc Hạnh Phúc",
        duration: "03:38",
        durationSec: 218,
        subtitle: "Bình Yên Bên Người Mình Thương",
        audioUrl: "/music/thien-duong-voi-nguoi-thuong.mp3",
      },
      {
        id: "p1-5",
        title: "Ánh Nắng Của Anh",
        artist: "Đức Phúc",
        duration: "04:24",
        durationSec: 264,
        subtitle: "Piano Dịu Êm • Tình Ca Ngọt Ngào",
        audioUrl: "/music/anh-nang-cua-anh.mp3",
      },
      {
        id: "p1-6",
        title: "Perfect",
        artist: "Ed Sheeran",
        duration: "04:42",
        durationSec: 282,
        subtitle: "Tình Khúc Khiêu Vũ Đám Cưới",
        audioUrl: "/music/perfect-ed-sheeran.mp3",
      },
    ],
  },
  {
    id: 2,
    number: "02",
    title: "Nghi Lễ",
    duration: "20–30 phút",
    description:
      "Nhạc không lời, hòa tấu trang trọng dâng trào cảm xúc cho khoảnh khắc đính ước thiêng liêng",
    songs: [
      {
        id: "p2-1",
        title: "Beautiful In White",
        artist: "Shane Filan (Westlife)",
        duration: "03:52",
        durationSec: 232,
        subtitle: "Khúc Nhạc Bước Vào Lễ Đường (Canon in D)",
        audioUrl: "/music/beautiful-in-white.mp3",
      },
      {
        id: "p2-2",
        title: "A Thousand Years (Orchestral)",
        artist: "Christina Perri & Dàn Dây",
        duration: "04:48",
        durationSec: 288,
        subtitle: "Dàn Dây & Cello • Trao Nhẫn Đính Ước",
        audioUrl: "/music/a-thousand-years.mp3",
      },
      {
        id: "p2-3",
        title: "Canon in D (Pachelbel's Canon)",
        artist: "Cello & Piano Orchestra",
        duration: "05:02",
        durationSec: 302,
        subtitle: "Tuyệt Phẩm Hôn Lễ Thế Giới",
        audioUrl: "/music/canon-in-d.mp3",
      },
      {
        id: "p2-4",
        title: "Until I Found You (Violin Ver)",
        artist: "Dàn Nhạc Dây Sân Khấu",
        duration: "03:08",
        durationSec: 188,
        subtitle: "Violin Solo Trang Trọng • Rót Rượu Giao Bôi",
        audioUrl: "/music/until-i-found-you-violin.mp3",
      },
    ],
  },
  {
    id: 3,
    number: "03",
    title: "Chụp Ảnh & Đãi Tiệc",
    duration: "60–90 phút",
    description:
      "Nhạc cưới Việt Nam rộn rã, tươi vui nâng ly chúc phúc và lưu giữ khoảnh khắc cùng bạn bè, hai họ",
    songs: [
      {
        id: "p3-1",
        title: "Lá Ngọc Cành Vàng",
        artist: "Nhạc Cưới Sang Trọng",
        duration: "03:42",
        durationSec: 222,
        subtitle: "Xứng Đôi Vừa Lứa • Phúc Lộc Đầy Nhà",
        audioUrl: "/music/la-ngoc-canh-vang.mp3",
      },
      {
        id: "p3-2",
        title: "Mối Duyên Vàng",
        artist: "Giai Điệu Tơ Duyên",
        duration: "03:37",
        durationSec: 217,
        subtitle: "Tơ Hồng Duyên Thắm • Gắn Kết Trăm Năm",
        audioUrl: "/music/moi-duyen-vang.mp3",
      },
      {
        id: "p3-3",
        title: "Ngày Đầu Tiên",
        artist: "Đức Phúc",
        duration: "03:29",
        durationSec: 209,
        subtitle: "Hạnh Phúc Ngập Tràn Ngày Chung Đôi",
        audioUrl: "/music/ngay-dau-tien.mp3",
      },
      {
        id: "p3-4",
        title: "Một Nhà",
        artist: "Da LAB",
        duration: "03:06",
        durationSec: 186,
        subtitle: "Giai Điệu Sum Vầy Gắn Kết Hai Họ",
        audioUrl: "/music/mot-nha.mp3",
      },
      {
        id: "p3-5",
        title: "Hơn Cả Yêu",
        artist: "Đức Phúc",
        duration: "04:16",
        durationSec: 256,
        subtitle: "Lời Thề Nguyện Trọn Đời Bên Nhau",
        audioUrl: "/music/hon-ca-yeu.mp3",
      },
      {
        id: "p3-6",
        title: "Xứng Đôi Cưới Thôi",
        artist: "Lê Thiện Hiếu",
        duration: "02:26",
        durationSec: 146,
        subtitle: "Rộn Ràng Khai Tiệc • Nâng Ly Chúc Mừng",
        audioUrl: "/music/xung-doi-cuoi-thoi.mp3",
      },
      {
        id: "p3-7",
        title: "Yêu Là Cưới",
        artist: "Phát Hồ",
        duration: "02:59",
        durationSec: 179,
        subtitle: "Giai Điệu Rộn Rã Khai Tiệc Mừng",
        audioUrl: "/music/yeu-la-cuoi.mp3",
      },
      {
        id: "p3-8",
        title: "Marry You (Violin Ver)",
        artist: "Bruno Mars (Violin Cover)",
        duration: "01:33",
        durationSec: 93,
        subtitle: "Violin Tươi Vui Chúc Mừng Hạnh Phúc",
        audioUrl: "/music/marry-you-violin.mp3",
      },
    ],
  },
];

// Master flattened playlist of all wedding songs in sequence
const MASTER_PLAYLIST = PHASES_DATA.flatMap((phase) =>
  phase.songs.map((song) => ({
    ...song,
    phaseNumber: phase.number,
    phaseTitle: phase.title,
  }))
);

// Format seconds into MM:SS
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
}

export type WeddingFontStyle =
  | "great-vibes"
  | "charmonman"
  | "charm"
  | "cormorant-upright"
  | "dancing-script";

export interface FontOption {
  id: WeddingFontStyle;
  name: string;
  subtitle: string;
  fontFamily: string;
}

export const WEDDING_FONTS: FontOption[] = [
  {
    id: "great-vibes",
    name: "Great Vibes",
    subtitle: "Thư Pháp Lãng Mạn (Khuyên dùng)",
    fontFamily: "'Great Vibes', cursive",
  },
  {
    id: "charmonman",
    name: "Charmonman",
    subtitle: "Hoàng Gia Quý Phái",
    fontFamily: "'Charmonman', cursive",
  },
  {
    id: "charm",
    name: "Charm Calligraphy",
    subtitle: "Chữ Ký Nghệ Thuật",
    fontFamily: "'Charm', cursive",
  },
  {
    id: "cormorant-upright",
    name: "Cormorant Royal",
    subtitle: "Châu Âu Cổ Điển",
    fontFamily: "'Cormorant Upright', serif",
  },
  {
    id: "dancing-script",
    name: "Dancing Script",
    subtitle: "Mềm Mại Trẻ Trung",
    fontFamily: "'Dancing Script', cursive",
  },
];

export type WeddingDateFontStyle =
  | "harmonized-serif"
  | "cormorant-royal"
  | "cinzel-royal"
  | "montserrat-modern";

export interface WeddingDateFontOption {
  id: WeddingDateFontStyle;
  name: string;
  subtitle: string;
  dateFontFamily: string;
  lunarFontFamily: string;
  dateWeight: string;
  lunarWeight: string;
  dateTracking: string;
  lunarTracking: string;
}

export const WEDDING_DATE_FONTS: WeddingDateFontOption[] = [
  {
    id: "harmonized-serif",
    name: "Playfair Cân Đối",
    subtitle: "Thanh Lịch & Quý Phái (Khuyên dùng)",
    dateFontFamily: "'Montserrat', sans-serif",
    lunarFontFamily: "'Playfair Display', Georgia, serif",
    dateWeight: "500",
    lunarWeight: "500",
    dateTracking: "0.14em",
    lunarTracking: "0.08em",
  },
  {
    id: "cormorant-royal",
    name: "Cormorant Royal",
    subtitle: "Châu Âu Cổ Điển",
    dateFontFamily: "'Cormorant Garamond', 'Cormorant Upright', serif",
    lunarFontFamily: "'Cormorant Garamond', 'Cormorant Upright', serif",
    dateWeight: "600",
    lunarWeight: "500",
    dateTracking: "0.18em",
    lunarTracking: "0.12em",
  },
  {
    id: "cinzel-royal",
    name: "Cinzel Hoàng Gia",
    subtitle: "Khắc Đá Uy Nghi",
    dateFontFamily: "'Cinzel', Georgia, serif",
    lunarFontFamily: "'Cormorant Garamond', serif",
    dateWeight: "600",
    lunarWeight: "500",
    dateTracking: "0.20em",
    lunarTracking: "0.10em",
  },
  {
    id: "montserrat-modern",
    name: "Montserrat Hiện Đại",
    subtitle: "Tối Giản Tinh Tế",
    dateFontFamily: "'Montserrat', sans-serif",
    lunarFontFamily: "'Montserrat', sans-serif",
    dateWeight: "500",
    lunarWeight: "400",
    dateTracking: "0.20em",
    lunarTracking: "0.12em",
  },
];

export default function WeddingMusicPlayer() {
  // Navigation mode: "timeline-player" (Bảng điều khiển) or "presentation" (Trình chiếu)
  const [activeTab, setActiveTab] = useState<"timeline-player" | "presentation">(
    "timeline-player"
  );

  // Wedding calligraphy font selection for presentation mode
  const [selectedFont, setSelectedFont] = useState<WeddingFontStyle>("great-vibes");
  const [showFontMenu, setShowFontMenu] = useState<boolean>(false);
  const activeFont =
    WEDDING_FONTS.find((f) => f.id === selectedFont) || WEDDING_FONTS[0];

  // Wedding date font style for presentation mode
  const [selectedDateFont, setSelectedDateFont] =
    useState<WeddingDateFontStyle>("harmonized-serif");
  const activeDateFont =
    WEDDING_DATE_FONTS.find((f) => f.id === selectedDateFont) ||
    WEDDING_DATE_FONTS[0];

  // Playback state
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0); // Bắt đầu từ bài 1: Until I Found You
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activePhaseId, setActivePhaseId] = useState<number>(1);

  // Volume & controls
  const [volume, setVolume] = useState<number>(85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSong = MASTER_PLAYLIST[currentTrackIndex] || MASTER_PLAYLIST[0];
  const progressPercent = Math.min(
    100,
    (currentSeconds / currentSong.durationSec) * 100
  );

  // Đồng bộ trạng thái phát / tạm dừng với thẻ Audio thật
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay policy or playback blocked until user gesture:", err);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  // Đồng bộ âm lượng và trạng thái tắt tiếng (mute) với thẻ Audio thật
  useEffect(() => {
    if (audioRef.current && !isFadingOut) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted, isFadingOut]);

  // Lắng nghe cập nhật thời gian từ thẻ Audio để thanh tiến độ di chuyển chuẩn xác
  const handleAudioTimeUpdate = () => {
    if (audioRef.current && !isFadingOut) {
      setCurrentSeconds(Math.floor(audioRef.current.currentTime));
    }
  };

  // Tự động chuyển bài kế tiếp khi bài hát kết thúc (tự động lặp lại toàn bộ danh sách)
  const handleAudioEnded = () => {
    handleNextSong();
  };

  // Lắng nghe phím Escape (ESC) để thoát nhanh khỏi chế độ Trình Chiếu Sân Khấu về Bảng Điều Khiển
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeTab === "presentation") {
        setActiveTab("timeline-player");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab]);

  // SCREEN WAKE LOCK & KEEP-ALIVE: Ngăn Smart TV, màn hình LED và laptop tự động tắt màn hình (Display Sleep)
  const videoKeepAliveRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (activeTab !== "presentation") return;

    let wakeLockSentinel: any = null;

    // 1. Chuẩn W3C Screen Wake Lock API (Hỗ trợ Chrome, Edge, Safari 16.4+, Android TV, Samsung Browser)
    const requestWakeLock = async () => {
      if ("wakeLock" in navigator) {
        try {
          wakeLockSentinel = await (navigator as any).wakeLock.request("screen");
        } catch (err) {
          console.warn("Screen Wake Lock could not be acquired:", err);
        }
      }
    };

    requestWakeLock();

    // Tự động kích hoạt lại khi người dùng quay lại tab trình duyệt
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && activeTab === "presentation") {
        requestWakeLock();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 2. Fallback Media Stream Keep-Alive cho Smart TV (LG webOS, Samsung Tizen TV, v.v.)
    // Hệ điều hành Smart TV luôn giữ màn hình sáng khi phát hiện có luồng video đang chạy
    let stream: MediaStream | null = null;
    let animId: number;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 2;
      canvas.height = 2;
      const ctx = canvas.getContext("2d");

      let toggle = false;
      const tick = () => {
        if (ctx) {
          toggle = !toggle;
          ctx.fillStyle = toggle ? "#000000" : "#020202";
          ctx.fillRect(0, 0, 2, 2);
        }
        animId = requestAnimationFrame(tick);
      };
      tick();

      if ("captureStream" in canvas && videoKeepAliveRef.current) {
        stream = (canvas as any).captureStream(1); // 1 khung hình/giây, tối ưu 0% CPU
        videoKeepAliveRef.current.srcObject = stream;
        videoKeepAliveRef.current.play().catch(() => {});
      }
    } catch (e) {
      console.warn("TV keep-alive video stream error:", e);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animId);
      if (wakeLockSentinel) {
        wakeLockSentinel.release().catch(() => {});
        wakeLockSentinel = null;
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (videoKeepAliveRef.current) {
        videoKeepAliveRef.current.srcObject = null;
      }
    };
  }, [activeTab]);

  // Typewriter effect for presentation screen thank you message
  // "Xin cảm ơn hai bên gia đình đã yêu thương và vun đắp cho chúng con"
  // Runs character-by-character, pauses 2 seconds at the end, then repeats!
  const THANK_YOU_MESSAGE =
    "Chúng con xin cảm ơn ba mẹ và hai bên gia đình đã yêu thương và vun đắp cho chúng con!";
  const [typewriterIndex, setTypewriterIndex] = useState<number>(0);
  const [isTypewriterFading, setIsTypewriterFading] = useState<boolean>(false);

  useEffect(() => {
    if (activeTab !== "presentation") return;

    let timer: NodeJS.Timeout;

    if (typewriterIndex < THANK_YOU_MESSAGE.length) {
      // Type out character by character (60ms)
      timer = setTimeout(() => {
        setTypewriterIndex((prev) => prev + 1);
      }, 60);
    } else {
      // Reached full sentence: pause for 2 seconds (2000ms), then reset and loop!
      timer = setTimeout(() => {
        setIsTypewriterFading(true);
        setTimeout(() => {
          setTypewriterIndex(0);
          setIsTypewriterFading(false);
        }, 300);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [typewriterIndex, activeTab]);

  // Toggle Play / Pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Switch to presentation mode and auto-play sequentially
  const handleEnterPresentation = () => {
    setActiveTab("presentation");
    setIsPlaying(true);
  };

  // Chuyển sang bài tiếp theo (tự động quay lại bài đầu tiên khi hết playlist)
  const handleNextSong = () => {
    const nextIndex = (currentTrackIndex + 1) % MASTER_PLAYLIST.length;
    setCurrentTrackIndex(nextIndex);
    const nextSong = MASTER_PLAYLIST[nextIndex];
    setActivePhaseId(parseInt(nextSong.phaseNumber, 10));
    setCurrentSeconds(0);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  // Quay lại bài trước đó (quay về cuối danh sách nếu đang ở bài đầu)
  const handlePrevSong = () => {
    const prevIndex =
      (currentTrackIndex - 1 + MASTER_PLAYLIST.length) % MASTER_PLAYLIST.length;
    setCurrentTrackIndex(prevIndex);
    const prevSong = MASTER_PLAYLIST[prevIndex];
    setActivePhaseId(parseInt(prevSong.phaseNumber, 10));
    setCurrentSeconds(0);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  // Chọn một bài hát cụ thể từ danh sách các giai đoạn
  const handleSelectSong = (songTitle: string, phaseId: number) => {
    const idx = MASTER_PLAYLIST.findIndex((s) => s.title === songTitle);
    if (idx !== -1) {
      setCurrentTrackIndex(idx);
      setActivePhaseId(phaseId);
      setCurrentSeconds(0);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  };

  // Kích hoạt nhanh khoảnh khắc cao trào
  const handleTriggerMoment = (songName: string) => {
    const query = songName.toLowerCase();
    const idx = MASTER_PLAYLIST.findIndex((s) =>
      s.title.toLowerCase().includes(query)
    );
    if (idx !== -1) {
      setCurrentTrackIndex(idx);
      setActivePhaseId(parseInt(MASTER_PLAYLIST[idx].phaseNumber, 10));
      setCurrentSeconds(0);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }

    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  // Kích hoạt toàn bộ giai đoạn
  const handleActivatePhase = (phaseId: number) => {
    setActivePhaseId(phaseId);
    const firstSongInPhaseIdx = MASTER_PLAYLIST.findIndex(
      (s) => parseInt(s.phaseNumber, 10) === phaseId
    );
    if (firstSongInPhaseIdx !== -1) {
      setCurrentTrackIndex(firstSongInPhaseIdx);
      setCurrentSeconds(0);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  };

  // Hạ nhạc êm dịu (fade-out) trong 3s
  const handleFadeOut = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);

    const startVolume = audioRef.current ? audioRef.current.volume : volume / 100;
    const fadeSteps = 15;
    const stepDuration = 3000 / fadeSteps;
    let step = 0;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    fadeIntervalRef.current = setInterval(() => {
      step++;
      const factor = Math.max(0, 1 - step / fadeSteps);
      if (audioRef.current) {
        audioRef.current.volume = (isMuted ? 0 : startVolume) * factor;
      }
      if (step >= fadeSteps) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        setIsPlaying(false);
        setIsFadingOut(false);
        if (audioRef.current) {
          audioRef.current.volume = isMuted ? 0 : volume / 100;
        }
      }
    }, stepDuration);
  };

  // Tua nhạc khi bấm vào thanh tiến trình
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, clickX / rect.width));
    const targetSeconds = Math.floor(ratio * currentSong.durationSec);
    setCurrentSeconds(targetSeconds);
    if (audioRef.current) {
      audioRef.current.currentTime = targetSeconds;
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const currentPhaseObj = PHASES_DATA.find((p) => p.id === activePhaseId);

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col select-none">
      {/* Thẻ Audio thật điều khiển phát nhạc trực tiếp cho toàn bộ ứng dụng */}
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        preload="auto"
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnded}
      />
      {/* ============================================================== */}
      {/* PRESENTATION MODE (CHẾ ĐỘ TRÌNH CHIẾU SÂN KHẤU HÔN LỄ)        */}
      {/* ============================================================== */}
      {activeTab === "presentation" ? (
        <section
          className="fixed inset-0 z-50 w-screen h-screen overflow-hidden flex flex-col justify-center items-center bg-gradient-to-b from-[#fff6f4] via-[#fde9e7] to-[#fadad7] transition-all duration-300"
        >
          {/* INVISIBLE VIDEO KEEP-ALIVE: Ngăn Smart TV / Laptop tắt màn hình hoặc kích hoạt Screensaver */}
          <video
            ref={videoKeepAliveRef}
            muted
            playsInline
            loop
            aria-hidden="true"
            className="sr-only pointer-events-none opacity-0 absolute w-1 h-1"
          />

          {/* NÚT THOÁT KÍN ĐÁO: Ẩn trên màn LED, chỉ hiện khi rê chuột lên góc trên bên phải hoặc nhấn ESC */}
          <button
            type="button"
            onClick={() => setActiveTab("timeline-player")}
            title="Thoát chế độ trình chiếu sân khấu (Nhấn phím ESC)"
            className="fixed top-4 right-4 z-50 px-3.5 py-1.5 rounded-full bg-black/25 hover:bg-black/80 text-white/80 hover:text-white font-label-md text-xs backdrop-blur-md opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm select-none"
          >
            <span className="material-symbols-outlined text-[15px]">close</span>
            <span>Thoát Trình Chiếu (ESC)</span>
          </button>
          {/* BACKGROUND DECORATIONS: FLOATING HEARTS & MIST */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Soft pink watercolor mist/mountain at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-t from-[#f6bdc4]/30 via-[#f9d1d6]/20 to-transparent blur-xl"></div>

            {/* Watercolor Mountain Silhouette SVG */}
            <svg
              className="absolute bottom-0 left-0 right-0 w-full h-36 sm:h-52 opacity-25"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="#f09ca8"
                d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,218.7C960,235,1056,245,1152,229.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>

            {/* TOP RIGHT: FLOATING WATERCOLOR HEARTS */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-10 flex items-start gap-1 sm:gap-2 opacity-80 animate-pulse">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                className="w-10 h-10 sm:w-16 sm:h-16 text-[#f59ea8] fill-current drop-shadow-sm -rotate-12 transform"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                className="w-7 h-7 sm:w-11 sm:h-11 text-[#f8b4bc] fill-current drop-shadow-sm rotate-12 transform mt-2"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            {/* BOTTOM LEFT: FLOATING WATERCOLOR HEART BALLOONS */}
            <div className="absolute bottom-12 left-4 sm:bottom-16 sm:left-12 opacity-85 pointer-events-none">
              <div className="relative">
                {/* Heart Balloon 1 */}
                <svg
                  width="72"
                  height="72"
                  viewBox="0 0 24 24"
                  className="w-12 h-12 sm:w-16 sm:h-16 text-[#f28e9a] fill-current drop-shadow-md -rotate-6 transform"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {/* Balloon string 1 */}
                <svg
                  className="w-8 h-16 sm:w-10 sm:h-20 text-[#d48b94]"
                  viewBox="0 0 50 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M25,0 Q10,40 30,70 T20,100" />
                </svg>

                {/* Heart Balloon 2 (small) */}
                <div className="absolute -top-6 left-8 sm:left-10">
                  <svg
                    width="54"
                    height="54"
                    viewBox="0 0 24 24"
                    className="w-9 h-9 sm:w-12 sm:h-12 text-[#f6abb3] fill-current drop-shadow-sm rotate-12 transform"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <svg
                    className="w-6 h-14 sm:w-8 sm:h-16 text-[#d48b94]"
                    viewBox="0 0 50 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M25,0 Q35,40 15,70 T25,100" />
                  </svg>
                </div>
              </div>
            </div>

            {/* CENTER SILHOUETTE: LARGE CHINESE "SONG HỶ" (DOUBLE HAPPINESS 囍) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-[#f7b4af]/22 font-serif text-[240px] xs:text-[320px] sm:text-[440px] md:text-[540px] lg:text-[620px] leading-none transform translate-y-2 sm:translate-y-4 md:translate-y-6 lg:translate-y-8">
                囍
              </span>
            </div>
          </div>

          {/* MAIN STAGE POSTER CONTENT (EXACTLY MATCHING USER REFERENCE IMAGE) */}
          <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 sm:px-8 h-full flex flex-col justify-between items-center text-center py-8 sm:py-12 md:py-14 lg:py-16 xl:py-20 select-none">
            {/* Header: LỄ ĐÍNH HÔN (Không blur, nét sắc bén, khoảng cách chữ tự nhiên gọn gàng) */}
            <div className="w-full flex flex-col items-center pt-2 sm:pt-4 pb-4 sm:pb-8 md:pb-10 lg:pb-14 xl:pb-18">
              <h1
                style={{ fontWeight: 900 }}
                className="font-headline-lg font-black tracking-[0.02em] sm:tracking-[0.03em] text-[#ab293b] text-4xl sm:text-6xl md:text-7xl lg:text-[96px] xl:text-[112px] 2xl:text-[124px] uppercase leading-none"
              >
                LỄ ĐÍNH HÔN
              </h1>
            </div>

            {/* COUPLE NAMES & INTERTWINED WEDDING RINGS (Tầng giữa: hạ xuống trang nhã, không đè chữ) */}
            <div className="w-full flex items-center justify-center gap-3 sm:gap-6 md:gap-10 lg:gap-14 py-1 sm:py-2 my-auto">
              {/* Left Column: Mai Phương */}
              <div className="flex-1 flex flex-col items-center sm:items-end text-center sm:text-right">
                <span
                  style={{ fontFamily: activeFont.fontFamily }}
                  className="font-cursive text-5xl sm:text-[88px] md:text-[116px] lg:text-[144px] xl:text-[162px] text-[#e25757] font-normal leading-[0.88] drop-shadow-xs"
                >
                  Mai
                </span>
                <span
                  style={{ fontFamily: activeFont.fontFamily }}
                  className="font-cursive text-5xl sm:text-[88px] md:text-[116px] lg:text-[144px] xl:text-[162px] text-[#e25757] font-normal leading-[0.88] drop-shadow-xs mt-1.5 sm:mt-3"
                >
                  Phương
                </span>
              </div>

              {/* Center Column: Luxurious Intertwined Wedding Rings with 3D Rotation Animation */}
              <div className="shrink-0 px-2 sm:px-4 md:px-6 flex items-center justify-center">
                <style>{`
                  @keyframes ringSpin3D {
                    0% {
                      transform: perspective(600px) rotateX(12deg) rotate(0deg);
                    }
                    100% {
                      transform: perspective(600px) rotateX(12deg) rotate(360deg);
                    }
                  }
                `}</style>
                <div
                  className="relative w-32 h-28 sm:w-40 sm:h-36 md:w-52 md:h-44 lg:w-64 lg:h-54 xl:w-72 xl:h-60 flex items-center justify-center select-none"
                  style={{
                    animation: "ringSpin3D 14s linear infinite",
                    transformOrigin: "center center",
                  }}
                >
                  {/* Ambient Golden Halo Behind Rings */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f5be50]/15 to-[#ff7d8d]/15 blur-lg pointer-events-none scale-110"></div>
                  <svg
                    viewBox="0 0 240 180"
                    className="w-full h-full drop-shadow-[0_8px_20px_rgba(200,90,40,0.22)]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Gradients and Filters */}
                    <defs>
                      {/* 18K Yellow Gold Metallic Gradient */}
                      <linearGradient id="goldGradientRing" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fff8df" />
                        <stop offset="18%" stopColor="#f7cd6a" />
                        <stop offset="42%" stopColor="#cf911f" />
                        <stop offset="68%" stopColor="#ffea9f" />
                        <stop offset="85%" stopColor="#bd7a10" />
                        <stop offset="100%" stopColor="#f0bf57" />
                      </linearGradient>

                      {/* Rose Gold Metallic Gradient */}
                      <linearGradient id="roseGoldGradientRing" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fff2ef" />
                        <stop offset="22%" stopColor="#f8b6a9" />
                        <stop offset="48%" stopColor="#cf7263" />
                        <stop offset="72%" stopColor="#feddd6" />
                        <stop offset="88%" stopColor="#b45849" />
                        <stop offset="100%" stopColor="#f39d8e" />
                      </linearGradient>

                      {/* Solitaire Diamond Facet Gradients */}
                      <linearGradient id="diamondCrownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="40%" stopColor="#eef6fc" />
                        <stop offset="70%" stopColor="#cfe6f8" />
                        <stop offset="100%" stopColor="#b1d7f5" />
                      </linearGradient>
                      <linearGradient id="diamondPavilionGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#d1e8fa" />
                        <stop offset="50%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#fde4b8" />
                      </linearGradient>
                      <radialGradient id="starSparkleGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#ffe699" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#e25757" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* 1. Ring 2 (Rose Gold Band) - Back Segment (Behind Ring 1) */}
                    <g transform="translate(136, 102)">
                      {/* Outer Band Shadow & Body */}
                      <ellipse
                        cx="0"
                        cy="0"
                        rx="44"
                        ry="38"
                        transform="rotate(24)"
                        stroke="url(#roseGoldGradientRing)"
                        strokeWidth="8"
                        fill="none"
                      />
                      {/* Inner Gloss Rim */}
                      <ellipse
                        cx="0"
                        cy="0"
                        rx="39.5"
                        ry="34"
                        transform="rotate(24)"
                        stroke="#ffffff"
                        strokeOpacity="0.6"
                        strokeWidth="1.2"
                        fill="none"
                      />
                    </g>

                    {/* 2. Ring 1 (Yellow Gold Engagement Ring with Solitaire Diamond) */}
                    <g transform="translate(86, 96)">
                      {/* Ring 1 Band */}
                      <ellipse
                        cx="0"
                        cy="0"
                        rx="44"
                        ry="38"
                        transform="rotate(-24)"
                        stroke="url(#goldGradientRing)"
                        strokeWidth="8.5"
                        fill="none"
                      />
                      {/* Ring 1 Inner Bevel Rim */}
                      <ellipse
                        cx="0"
                        cy="0"
                        rx="39"
                        ry="33.5"
                        transform="rotate(-24)"
                        stroke="#ffffff"
                        strokeOpacity="0.75"
                        strokeWidth="1.4"
                        fill="none"
                      />
                      {/* Specular White Curve */}
                      <path
                        d="M -30,-15 A 44 38 0 0 1 0,-38"
                        transform="rotate(-24)"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                      />

                      {/* Prong Setting Base at Top */}
                      <g transform="translate(0, -38)">
                        {/* 4 Gold Prongs holding diamond */}
                        <path
                          d="M -12,2 L -8,-8 M 12,2 L 8,-8 M -5,4 L -2,-10 M 5,4 L 2,-10"
                          stroke="url(#goldGradientRing)"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                        />

                        {/* Solitaire Brilliant Cut Diamond */}
                        <g transform="translate(0, -14)">
                          {/* Pavilion (Lower facet cone) */}
                          <polygon
                            points="0,8 -14,-4 14,-4"
                            fill="url(#diamondPavilionGrad)"
                            stroke="#8ba4b8"
                            strokeWidth="0.8"
                          />
                          {/* Crown facets */}
                          <polygon
                            points="-14,-4 -9,-14 9,-14 14,-4"
                            fill="url(#diamondCrownGrad)"
                            stroke="#8ba4b8"
                            strokeWidth="0.8"
                          />
                          {/* Center Crown Table */}
                          <polygon
                            points="-6,-14 6,-14 9,-4 0,-4"
                            fill="#ffffff"
                            stroke="#9cb5c9"
                            strokeWidth="0.6"
                          />
                          <polygon
                            points="0,-4 -9,-4 -6,-14"
                            fill="#e3f2fd"
                            stroke="#9cb5c9"
                            strokeWidth="0.6"
                          />
                          {/* Facet lines */}
                          <line x1="0" y1="-14" x2="0" y2="8" stroke="#ffffff" strokeWidth="1" />
                          <line x1="-9" y1="-14" x2="-4" y2="-4" stroke="#ffffff" strokeWidth="0.8" />
                          <line x1="9" y1="-14" x2="4" y2="-4" stroke="#ffffff" strokeWidth="0.8" />

                          {/* Sparkling Diamond Star Glint (Animated ✦) */}
                          <g transform="translate(7, -15)" className="animate-diamond-sparkle">
                            <path
                              d="M 0,-14 Q 1.5,-2 14,0 Q 1.5,2 0,14 Q -1.5,2 -14,0 Q -1.5,-2 0,-14 Z"
                              fill="url(#starSparkleGlow)"
                            />
                            <circle cx="0" cy="0" r="3" fill="#ffffff" />
                            <circle cx="0" cy="0" r="1.2" fill="#fff5d1" />
                          </g>
                        </g>
                      </g>
                    </g>

                    {/* 3. Ring 2 (Front Overlap Section to create realistic 3D Interlocking) */}
                    <g transform="translate(136, 102)">
                      {/* Overlapping front arc passing through Ring 1 */}
                      <path
                        d="M -38,-12 A 44 38 0 0 1 -10,-36"
                        transform="rotate(24)"
                        stroke="url(#roseGoldGradientRing)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                      />
                      {/* Front Specular Highlight */}
                      <path
                        d="M -34,-16 A 44 38 0 0 1 -14,-34"
                        transform="rotate(24)"
                        stroke="#ffffff"
                        strokeOpacity="0.75"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Right Column: Hà Phương */}
              <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                <span
                  style={{ fontFamily: activeFont.fontFamily }}
                  className="font-cursive text-5xl sm:text-[88px] md:text-[116px] lg:text-[144px] xl:text-[162px] text-[#e25757] font-normal leading-[0.88] drop-shadow-xs"
                >
                  Hà
                </span>
                <span
                  style={{ fontFamily: activeFont.fontFamily }}
                  className="font-cursive text-5xl sm:text-[88px] md:text-[116px] lg:text-[144px] xl:text-[162px] text-[#e25757] font-normal leading-[0.88] drop-shadow-xs mt-1.5 sm:mt-3"
                >
                  Phương
                </span>
              </div>
            </div>

            {/* Bottom Group: Thank-You Message + Date & Lunar Date (Định vị phía dưới cân đối, thanh lịch) */}
            <div className="w-full flex flex-col items-center justify-center space-y-3 sm:space-y-4 md:space-y-5 pb-3 sm:pb-5 md:pb-6 lg:pb-8">
              {/* Heartwarming Thank-You Message in Cursive with Typewriter Animation (Strictly 1 line) */}
              <div className="w-full max-w-5xl mx-auto flex items-center justify-center min-h-[36px] sm:min-h-[44px] md:min-h-[52px] px-2 overflow-visible">
                <p
                  style={{ fontFamily: activeFont.fontFamily }}
                  className={`font-cursive text-sm sm:text-base md:text-xl lg:text-2xl xl:text-[34px] 2xl:text-[38px] text-[#d95252] italic whitespace-nowrap leading-none drop-shadow-xs text-center transition-opacity duration-300 ${
                    isTypewriterFading ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {THANK_YOU_MESSAGE.slice(0, typewriterIndex)}
                  {typewriterIndex < THANK_YOU_MESSAGE.length && (
                    <span className="inline-block w-0.5 h-3.5 sm:h-5 bg-[#d95252]/80 ml-1.5 align-middle animate-pulse" />
                  )}
                </p>
              </div>

              {/* Date & Lunar Date */}
              <div className="flex flex-col items-center justify-center space-y-1 sm:space-y-1.5 select-none">
                <p
                  style={{
                    fontFamily: activeDateFont.dateFontFamily,
                    fontWeight: activeDateFont.dateWeight,
                    letterSpacing: activeDateFont.dateTracking,
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[52px] 2xl:text-[58px] text-[#782230] leading-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
                >
                  28.10.2026
                </p>
                <p
                  style={{
                    fontFamily: activeDateFont.lunarFontFamily,
                    fontWeight: activeDateFont.lunarWeight,
                    letterSpacing: activeDateFont.lunarTracking,
                  }}
                  className="text-xs sm:text-sm md:text-base lg:text-[19px] xl:text-[23px] 2xl:text-[25px] text-[#8c2b3c] leading-normal"
                >
                  19.09 (Bính Ngọ)
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* ============================================================== */
        /* DJ CONTROLLER VIEW (BẢNG ĐIỀU PHỐI ÂM NHẠC LỄ ĐÍNH HÔN)        */
        /* ============================================================== */
        <>
          {/* HEADER */}
          <header className="fixed top-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(212,163,89,0.08)]">
            <div className="h-16 sm:h-20 w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 border-b border-surface-container-high/80">
              {/* Logo & Names */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-secondary-fixed/50 via-primary-fixed/40 to-surface-container-lowest flex items-center justify-center shadow-sm border border-white/60 shrink-0">
                  <span className="material-symbols-outlined text-primary text-[18px] sm:text-[20px]">
                    favorite
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="font-headline-sm text-sm sm:text-base lg:text-[18px] text-on-surface font-semibold tracking-tight truncate">
                      Hà Phương &amp; Mai Phương
                    </span>
                    <span className="hidden xs:inline-block px-1.5 sm:px-2 py-0.5 rounded-full bg-secondary-fixed/50 font-label-sm text-secondary font-semibold uppercase tracking-wider text-[9px] sm:text-[10px] shrink-0">
                      LỄ ĐÍNH HÔN
                    </span>
                  </div>
                  <p className="hidden md:flex font-label-md text-on-surface-variant items-center gap-1.5 text-xs truncate">
                    <span className="material-symbols-outlined text-[13px] text-secondary shrink-0">
                      library_music
                    </span>
                    <span className="truncate">
                      Hệ Thống Điều Khiển Âm Nhạc Lễ Đính Hôn
                    </span>
                  </p>
                </div>
              </div>

              {/* Desktop/Tablet Navigation Pills */}
              <div className="hidden md:flex items-center gap-3 shrink-0">
                <nav className="flex items-center p-1 bg-surface-container-low/90 rounded-full border border-surface-container-high/60 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setActiveTab("timeline-player")}
                    className={`px-3 py-1.5 rounded-full font-label-lg text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                      activeTab === "timeline-player"
                        ? "bg-surface-container-lowest text-primary font-bold shadow-sm"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      queue_music
                    </span>
                    <span>Phát Nhạc Theo Giai Đoạn</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleEnterPresentation}
                    className={`px-3.5 py-1.5 rounded-full font-label-lg text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer bg-primary text-on-primary font-bold shadow-sm hover:opacity-95`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      slideshow
                    </span>
                    <span>Bật Chế Độ Trình Chiếu</span>
                  </button>
                </nav>

                <div className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-tertiary-fixed/40 border border-tertiary/20 text-on-tertiary-fixed-variant shrink-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
                  </span>
                  <span className="font-label-md font-semibold text-xs tracking-wide truncate">
                    Đang phát: Giai Đoạn {currentPhaseObj?.number || "02"} -{" "}
                    {currentPhaseObj?.title || "Nghi Lễ"}
                  </span>
                </div>
              </div>

              {/* Right Controls: Mobile Tab Toggle, Volume, Fullscreen */}
              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                {/* Mobile Tab Toggle Button */}
                <button
                  type="button"
                  onClick={handleEnterPresentation}
                  className="flex md:hidden items-center gap-1 px-2.5 py-1 rounded-xl bg-primary text-on-primary font-label-md text-xs font-semibold shadow-xs cursor-pointer"
                  title="Bật Chế Độ Trình Chiếu"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    slideshow
                  </span>
                  <span>Trình Chiếu</span>
                </button>

                {/* BỘ CHỌN PHÔNG CHỮ SÂN KHẤU (ĐÃ CHUYỂN TỪ PREVIEW VỀ SETTING) */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowFontMenu(!showFontMenu)}
                    title="Đổi kiểu phông chữ nghệ thuật sân khấu LED"
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-surface-container-low/90 hover:bg-surface-container text-on-surface font-label-md text-xs font-semibold border border-surface-container-high/60 transition-colors shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[17px] text-primary">
                      font_download
                    </span>
                    <span className="hidden sm:inline text-on-surface-variant font-normal">
                      Phông Sân Khấu:
                    </span>
                    <span className="text-primary font-bold">{activeFont.name}</span>
                    <span className="material-symbols-outlined text-[14px]">
                      {showFontMenu ? "expand_less" : "expand_more"}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {showFontMenu && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl p-2.5 shadow-[0_15px_40px_rgba(156,62,84,0.18)] border border-primary/20 z-50 flex flex-col gap-1">
                      <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary border-b border-primary/10">
                        Chọn Phông Chữ Sân Khấu LED
                      </div>
                      {WEDDING_FONTS.map((font) => (
                        <button
                          key={font.id}
                          type="button"
                          onClick={() => {
                            setSelectedFont(font.id);
                            setShowFontMenu(false);
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                            selectedFont === font.id
                              ? "bg-primary-fixed/30 text-primary font-bold border border-primary/30"
                              : "hover:bg-surface-container-low text-on-surface"
                          }`}
                        >
                          <div>
                            <p
                              className="text-base sm:text-lg leading-tight"
                              style={{ fontFamily: font.fontFamily }}
                            >
                              Mai &amp; Hà Phương
                            </p>
                            <p className="text-[10px] sm:text-[11px] text-on-surface-variant font-normal mt-0.5">
                              {font.name} • {font.subtitle}
                            </p>
                          </div>
                          {selectedFont === font.id && (
                            <span className="material-symbols-outlined text-[18px] text-primary">
                              check
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Volume Control Box */}
                <div className="flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-surface-container-low/90 rounded-xl border border-surface-container-high/60 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="flex items-center justify-center text-primary cursor-pointer hover:opacity-80 transition-opacity"
                    title={isMuted ? "Bật âm thanh" : "Tắt tiếng"}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isMuted || volume === 0 ? "volume_off" : "volume_up"}
                    </span>
                  </button>

                  <input
                    aria-label="Volume Slider"
                    className="w-12 xs:w-16 sm:w-20 h-1.5 accent-primary bg-surface-container-high rounded-full cursor-pointer"
                    max="100"
                    min="0"
                    type="range"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value));
                      if (isMuted) setIsMuted(false);
                    }}
                  />

                  <button
                    className={`hidden sm:inline-block px-2 py-0.5 rounded-md font-label-sm text-[11px] font-semibold border border-surface-container-high transition-colors shadow-2xs cursor-pointer ${
                      isMuted
                        ? "bg-primary text-on-primary border-primary"
                        : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface"
                    }`}
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? "Unmute" : "Mute"}
                  </button>
                </div>

                {/* Fullscreen Button */}
                {/* <button
                  className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low/90 hover:bg-secondary-fixed/40 text-on-surface font-label-md text-xs font-semibold border border-surface-container-high/60 transition-colors shadow-sm shrink-0 cursor-pointer"
                  title="Toàn màn hình sân khấu"
                  type="button"
                  onClick={toggleFullscreen}
                >
                  <span className="material-symbols-outlined text-[17px] text-secondary">
                    {isFullscreen ? "fullscreen_exit" : "fullscreen"}
                  </span>
                  <span className="hidden xl:inline">Toàn Màn Hình</span>
                </button> */}
              </div>
            </div>
          </header>

          {/* MAIN DASHBOARD CONTENT */}
          <main className="w-full pt-20 sm:pt-24 lg:pt-28 bg-background min-h-screen">
            <div className="flex flex-col w-full">
              <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-8">
                {/* BANNER TRẠNG THÁI HÔN LỄ & GIAI ĐOẠN ĐANG PHÁT */}
                <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-6 lg:p-8 shadow-[0_10px_35px_rgba(212,163,89,0.08)] relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"></div>
                  <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-primary-fixed/40 blur-3xl pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-container font-label-md text-[11px] sm:text-label-md font-semibold tracking-wider uppercase shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                          Đang diễn ra trực tiếp
                        </span>
                        <span className="font-label-md text-xs sm:text-label-md text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-primary">
                            calendar_today
                          </span>{" "}
                          Thứ Tư, 28/10/2026 • 08:00 - 12:00 • Grand Ballroom
                        </span>
                      </div>

                      <h1 className="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg text-on-surface font-semibold tracking-tight leading-snug">
                        Lễ Đính Hôn Hà Phương &amp; Mai Phương
                      </h1>

                      <div className="font-title-md text-sm sm:text-base lg:text-title-md text-primary font-medium flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span>Bản giao hưởng ngày đính ước</span>
                        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        <span className="text-on-surface-variant font-normal">
                          Hệ thống điều khiển nhạc nghi lễ
                        </span>
                      </div>
                    </div>

                    {/* PRESENTATION MODE CALL-TO-ACTION CARD & STAGE SETTINGS */}
                    <div className="bg-gradient-to-br from-primary/10 via-secondary-fixed/20 to-surface-container-low rounded-2xl p-4 sm:p-5 border border-primary/25 shadow-sm w-full lg:w-auto space-y-3.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md shrink-0">
                            <span className="material-symbols-outlined text-[24px]">
                              slideshow
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-label-sm text-[10px] sm:text-[11px] text-primary uppercase tracking-widest font-bold">
                                Chế độ màn hình LED
                              </p>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary font-label-sm text-[10px] font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                                Đang phát {currentTrackIndex + 1}/{MASTER_PLAYLIST.length}: {currentSong.title}
                              </span>
                            </div>
                            <p className="font-title-md text-sm sm:text-base text-on-surface font-bold">
                              Màn Hình Trình Chiếu Sân Khấu (Giao Diện Thuần Túy)
                            </p>
                            <p className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                              <span className="material-symbols-outlined text-[14px] text-secondary">
                                autorenew
                              </span>
                              Tự động phát lần lượt {MASTER_PLAYLIST.length} bài &amp; lặp lại • Phím ESC để thoát
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleEnterPresentation}
                          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-[#863346] text-on-primary font-label-md text-xs sm:text-sm font-bold shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            open_in_full
                          </span>
                          <span>Bật Trình Chiếu</span>
                        </button>
                      </div>

                      {/* Quick Stage Font Selector Chips */}
                      <div className="pt-2.5 border-t border-primary/15 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-on-surface-variant font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-primary">
                              brush
                            </span>
                            <span>Phông chữ sân khấu:</span>
                            <span className="font-bold text-primary">{activeFont.name}</span>
                          </span>
                          <span className="text-[11px] text-on-surface-variant/80 italic hidden sm:inline">
                            (Màn preview sạch 100% không hiển thị thanh công cụ)
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {WEDDING_FONTS.map((font) => (
                            <button
                              key={font.id}
                              type="button"
                              onClick={() => setSelectedFont(font.id)}
                              className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1 ${
                                selectedFont === font.id
                                  ? "bg-primary text-on-primary font-bold shadow-xs scale-102"
                                  : "bg-surface-container-lowest hover:bg-surface-container border border-surface-container-high/70 text-on-surface"
                              }`}
                            >
                              <span
                                className="text-sm"
                                style={{ fontFamily: font.fontFamily }}
                              >
                                Mai &amp; Hà Phương
                              </span>
                              {selectedFont === font.id && (
                                <span className="material-symbols-outlined text-[13px]">
                                  check
                                </span>
                              )}
                            </button>
                          ))}
                        </div>

                        {/* Phông chữ Ngày Cưới (Date Typography Selector) */}
                        <div className="pt-2 border-t border-primary/10 flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-on-surface-variant font-medium flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px] text-primary">
                                calendar_month
                              </span>
                              <span>Phông chữ ngày cưới:</span>
                              <span className="font-bold text-primary">{activeDateFont.name}</span>
                            </span>
                            <span className="text-[11px] text-on-surface-variant/70 hidden sm:inline">
                              {activeDateFont.subtitle}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5">
                            {WEDDING_DATE_FONTS.map((font) => (
                              <button
                                key={font.id}
                                type="button"
                                onClick={() => setSelectedDateFont(font.id)}
                                className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                                  selectedDateFont === font.id
                                    ? "bg-primary text-on-primary font-bold shadow-xs scale-102"
                                    : "bg-surface-container-lowest hover:bg-surface-container border border-surface-container-high/70 text-on-surface"
                                }`}
                              >
                                <span
                                  className="text-xs tracking-wider"
                                  style={{
                                    fontFamily: font.dateFontFamily,
                                    fontWeight: font.dateWeight,
                                  }}
                                >
                                  28.10.2026
                                </span>
                                <span className="text-[10px] opacity-80">
                                  ({font.name})
                                </span>
                                {selectedDateFont === font.id && (
                                  <span className="material-symbols-outlined text-[13px]">
                                    check
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* KHU VỰC TRÌNH PHÁT NHẠC CHÍNH (NOW PLAYING CONTROLLER) */}
                <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-6 lg:p-10 shadow-[0_12px_40px_rgba(212,163,89,0.12)] relative overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    {/* Đĩa Than Hoa Cỏ Lãng Mạn */}
                    <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
                      <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full bg-surface-container-low shadow-[0_10px_35px_rgba(156,62,84,0.15)] flex items-center justify-center p-2.5 sm:p-3">
                        {/* Vòng hào quang đĩa xoay */}
                        <div
                          id="vinyl-disc"
                          className="w-full h-full rounded-full bg-gradient-to-tr from-[#fbf8f5] via-[#f7e6e9] to-[#faf0e6] p-1.5 sm:p-2 flex items-center justify-center shadow-inner animate-spin-slow"
                          style={{
                            animationPlayState: isPlaying ? "running" : "paused",
                          }}
                        >
                          <div className="w-full h-full rounded-full bg-surface-container-lowest flex items-center justify-center p-2 sm:p-2.5 shadow-sm relative overflow-hidden">
                            <Image
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs90MSzget3KZTIKZfoFFosqoo5OVi4aYAH_Zavl6OLWoB6b9C0FQRBhXOxYVIP7aasS4_mMch7QyKjxlMKLetzjrTCWNP-ZvD-Wd5sePGy4K5bhihb6Wt8zECtKss4KABwk1B_LThFGdezZCDHZm7CSFFJMk5lfiWRE-d4ETiFjdMCMZ9TaAedx0qZNXiRmVsjHGGDPGg2xntwIVKA-HhXdtlUXC6-YFPRmVT_TwnTDIneX2e3MRa"
                              alt="Chic romantic vinyl album artwork with soft blush pink watercolor roses, ivory peonies, gold champagne dust, and elegant calligraphy for Ha Phuong and Mai Phuong wedding"
                              width={256}
                              height={256}
                              className="w-full h-full rounded-full object-cover"
                              unoptimized
                            />
                            {/* Tâm đĩa kim loại champagne */}
                            <div className="absolute w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-secondary-fixed flex items-center justify-center shadow-md">
                              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-surface-container-lowest"></div>
                            </div>
                          </div>
                        </div>

                        {/* Kim đĩa nhạc tượng trưng */}
                        <div className="absolute -top-2 sm:-top-3 right-4 sm:right-6 w-6 sm:w-8 h-12 sm:h-16 pointer-events-none flex flex-col items-center">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-secondary shadow-md"></div>
                          <div className="w-1 sm:w-1.5 h-9 sm:h-12 bg-secondary/80 rounded-full"></div>
                        </div>
                      </div>

                      <div className="mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-secondary-fixed/40 text-on-secondary-container font-label-md text-xs sm:text-label-md">
                        <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-secondary">
                          album
                        </span>
                        <span>Chất lượng phòng thu Master • Hi-Res</span>
                      </div>
                    </div>

                    {/* Bảng điều khiển nhạc bài đang phát */}
                    <div className="lg:col-span-8 flex flex-col justify-center space-y-4 sm:space-y-6">
                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-md text-[11px] sm:text-label-md font-semibold">
                            <span className="material-symbols-outlined text-[14px] sm:text-[15px]">
                              volume_up
                            </span>
                            ĐANG PHÁT TRÊN LOA CHÍNH
                          </span>
                          <span className="font-label-md text-xs sm:text-label-md text-on-surface-variant font-semibold">
                            BÀI {currentTrackIndex + 1} / {MASTER_PLAYLIST.length}
                          </span>
                        </div>
                        <h2
                          id="current-song-title"
                          className="font-headline-md text-xl sm:text-2xl lg:text-headline-md text-on-surface font-semibold tracking-tight leading-tight"
                        >
                          {currentSong.title}
                        </h2>
                        <p
                          id="current-artist"
                          className="font-title-md text-xs sm:text-sm lg:text-title-md text-on-surface-variant font-normal"
                        >
                          {currentSong.artist} • Giai đoạn {currentSong.phaseNumber}: {currentSong.phaseTitle}
                        </p>
                      </div>

                      {/* Thanh tiến trình bài hát */}
                      <div className="space-y-1.5 sm:space-y-2">
                        <div
                          id="progress-container"
                          className="w-full h-3 sm:h-3.5 bg-surface-container-high rounded-full cursor-pointer relative overflow-hidden group"
                          onClick={handleProgressBarClick}
                          title="Tua đến đoạn này"
                        >
                          <div
                            id="progress-bar"
                            className="h-full bg-gradient-to-r from-primary-container via-primary to-secondary rounded-full transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between font-label-md text-xs sm:text-label-md text-on-surface-variant">
                          <span id="time-current">{formatTime(currentSeconds)}</span>
                          <span className="flex items-center gap-1 text-primary font-semibold text-[11px] sm:text-xs">
                            <span className="material-symbols-outlined text-[13px] sm:text-[14px]">
                              graphic_eq
                            </span>
                            <span>
                              Âm lượng: {isMuted ? "0% (Tắt tiếng)" : `${volume}%`}
                            </span>
                          </span>
                          <span id="time-total">{currentSong.duration}</span>
                        </div>
                      </div>

                      {/* Bộ điều khiển phát nhạc TO BẢN - CHỐNG BẤM NHẦM */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-1 sm:pt-2">
                        <div className="flex items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto">
                          {/* Nút Bài Trước */}
                          <button
                            id="btn-prev"
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
                            title="Bài trước đó"
                            type="button"
                            onClick={handlePrevSong}
                          >
                            <span className="material-symbols-outlined text-[28px] sm:text-[32px]">
                              skip_previous
                            </span>
                          </button>

                          {/* Nút PLAY/PAUSE SIÊU TO NỔI BẬT */}
                          <button
                            id="btn-play-pause"
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary hover:bg-[#863346] text-on-primary flex items-center justify-center transition-all shadow-lg sm:shadow-xl active:scale-95 group cursor-pointer"
                            title={isPlaying ? "Tạm dừng" : "Phát nhạc"}
                            type="button"
                            onClick={togglePlayPause}
                          >
                            <span
                              id="play-icon"
                              className="material-symbols-outlined text-[36px] sm:text-[42px] leading-none"
                            >
                              {isPlaying ? "pause" : "play_arrow"}
                            </span>
                          </button>

                          {/* Nút Bài Tiếp Theo */}
                          <button
                            id="btn-next"
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
                            title="Bài kế tiếp"
                            type="button"
                            onClick={handleNextSong}
                          >
                            <span className="material-symbols-outlined text-[28px] sm:text-[32px]">
                              skip_next
                            </span>
                          </button>
                        </div>

                        {/* Nút Hạ Nhạc Mượt (Fade-out 3s) */}
                        <button
                          id="btn-fadeout"
                          className={`w-full sm:w-auto justify-center h-12 sm:h-14 px-4 sm:px-6 rounded-2xl font-label-lg text-xs sm:text-label-lg font-bold flex items-center gap-2.5 transition-all shadow-sm active:scale-95 cursor-pointer ${
                            isFadingOut
                              ? "bg-secondary-fixed text-secondary scale-95"
                              : "bg-surface-container-low hover:bg-secondary-fixed/50 text-secondary"
                          }`}
                          type="button"
                          onClick={handleFadeOut}
                          disabled={isFadingOut}
                        >
                          {isFadingOut ? (
                            <>
                              <span className="material-symbols-outlined text-[20px] sm:text-[24px] animate-spin">
                                autorenew
                              </span>
                              <span>Đang hạ âm lượng 3s...</span>
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
                                graphic_eq
                              </span>
                              <span>Chuyển mượt (Fade-out 3s)</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* CỤM NÚT KÍCH HOẠT NHANH KHOẢNH KHẮC VÀNG TRONG LỄ ĐÍNH HÔN */}
                      <div className="pt-3 sm:pt-4 border-t-0 bg-surface-container-low/60 rounded-2xl p-3 sm:p-5">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <span className="material-symbols-outlined text-secondary text-[18px] sm:text-[20px]">
                            stars
                          </span>
                          <span className="font-label-lg text-xs sm:text-label-lg font-bold text-on-surface uppercase tracking-wider">
                            Kích hoạt nhanh khoảnh khắc cao trào
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                          {/* Khoảnh khắc 1 */}
                          <button
                            className="p-3 sm:p-3.5 rounded-xl bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-left transition-all duration-200 shadow-sm group flex flex-col justify-between gap-1.5 sm:gap-2 cursor-pointer"
                            onClick={() =>
                              handleTriggerMoment(
                                "Until I Found You (Violin Ver)"
                              )
                            }
                            type="button"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-fixed text-primary group-hover:bg-surface-container-lowest group-hover:text-primary flex items-center justify-center font-bold text-xs transition-colors">
                                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                                  woman
                                </span>
                              </span>
                              <span className="font-label-sm text-[10px] sm:text-label-sm text-on-surface-variant group-hover:text-on-primary/80 font-medium">
                                BẤM KHI RA MẮT
                              </span>
                            </div>
                            <div>
                              <p className="font-title-md text-xs sm:text-body-md font-bold text-on-surface group-hover:text-on-primary leading-tight">
                                Cô dâu ra mắt hai họ
                              </p>
                              <p className="font-body-sm text-[11px] sm:text-body-sm text-on-surface-variant group-hover:text-on-primary/80 truncate">
                                Until I Found You Climax
                              </p>
                            </div>
                          </button>

                          {/* Khoảnh khắc 2 */}
                          <button
                            className="p-3 sm:p-3.5 rounded-xl bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-left transition-all duration-200 shadow-sm group flex flex-col justify-between gap-1.5 sm:gap-2 cursor-pointer"
                            onClick={() =>
                              handleTriggerMoment(
                                "A Thousand Years (Orchestral)"
                              )
                            }
                            type="button"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-secondary-fixed text-secondary group-hover:bg-surface-container-lowest group-hover:text-primary flex items-center justify-center font-bold text-xs transition-colors">
                                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                                  favorite
                                </span>
                              </span>
                              <span className="font-label-sm text-[10px] sm:text-label-sm text-on-surface-variant group-hover:text-on-primary/80 font-medium">
                                BẤM KHI TRAO NHẪN
                              </span>
                            </div>
                            <div>
                              <p className="font-title-md text-xs sm:text-body-md font-bold text-on-surface group-hover:text-on-primary leading-tight">
                                Trao nhẫn đính hôn
                              </p>
                              <p className="font-body-sm text-[11px] sm:text-body-sm text-on-surface-variant group-hover:text-on-primary/80 truncate">
                                A Thousand Years Climax
                              </p>
                            </div>
                          </button>

                          {/* Khoảnh khắc 3 */}
                          <button
                            className="p-3 sm:p-3.5 rounded-xl bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-left transition-all duration-200 shadow-sm group flex flex-col justify-between gap-1.5 sm:gap-2 cursor-pointer sm:col-span-2 lg:col-span-1"
                            onClick={() =>
                              handleTriggerMoment(
                                "Marry You"
                              )
                            }
                            type="button"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-tertiary-fixed text-tertiary group-hover:bg-surface-container-lowest group-hover:text-primary flex items-center justify-center font-bold text-xs transition-colors">
                                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                                  celebration
                                </span>
                              </span>
                              <span className="font-label-sm text-[10px] sm:text-label-sm text-on-surface-variant group-hover:text-on-primary/80 font-medium">
                                BẤM KHI DÂNG TRÀ
                              </span>
                            </div>
                            <div>
                              <p className="font-title-md text-xs sm:text-body-md font-bold text-on-surface group-hover:text-on-primary leading-tight">
                                Nghi thức dâng trà &amp; Rót rượu
                              </p>
                              <p className="font-body-sm text-[11px] sm:text-body-sm text-on-surface-variant group-hover:text-on-primary/80 truncate">
                                Marry You Celebration
                              </p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DANH SÁCH CÁC GIAI ĐOẠN LỄ ĐÍNH HÔN THEO TIẾN TRÌNH */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2">
                    <div>
                      <span className="font-label-lg text-xs sm:text-label-lg text-primary font-bold tracking-widest uppercase">
                        Danh Sách Theo Tiến Trình
                      </span>
                      <h2 className="font-headline-md text-xl sm:text-2xl lg:text-headline-md text-on-surface font-semibold">
                        3 Giai Đoạn Âm Nhạc Lễ Đính Hôn
                      </h2>
                    </div>
                    <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant">
                      Bấm{" "}
                      <strong className="text-on-surface">
                        &quot;Bật Giai Đoạn Này Ngay&quot;
                      </strong>{" "}
                      để tự động chuyển list nhạc tương ứng.
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-4" id="timeline-accordion">
                    {PHASES_DATA.map((phase) => {
                      const isActive = activePhaseId === phase.id;

                      return (
                        <div
                          key={phase.id}
                          className={`phase-card bg-surface-container-lowest rounded-2xl p-4 sm:p-6 transition-all duration-200 ${
                            isActive
                              ? "shadow-md ring-2 ring-primary/40 relative overflow-hidden"
                              : "shadow-sm hover:shadow-md"
                          }`}
                          data-phase={phase.id}
                        >
                          {isActive && (
                            <div className="absolute top-0 right-0 px-3 sm:px-4 py-0.5 sm:py-1 bg-primary text-on-primary font-label-sm text-[10px] sm:text-label-sm rounded-bl-xl font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest animate-ping"></span>
                              Giai đoạn đang kích hoạt
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <span
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl font-headline-sm text-base sm:text-headline-sm flex items-center justify-center shrink-0 ${
                                  isActive
                                    ? "bg-primary text-on-primary shadow-md"
                                    : "bg-surface-container-high text-on-surface"
                                }`}
                              >
                                {phase.number}
                              </span>
                              <div>
                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                <h3
                                  className={`font-title-lg text-base sm:text-title-lg font-bold ${
                                    isActive ? "text-primary" : "text-on-surface"
                                  }`}
                                >
                                  {phase.title}
                                </h3>
                                <span
                                  className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] sm:text-label-sm ${
                                    isActive
                                      ? "bg-secondary-fixed text-on-secondary-container font-semibold"
                                      : "bg-surface-container-high text-on-surface-variant"
                                  }`}
                                >
                                  {phase.duration}
                                </span>
                              </div>
                              <p
                                className={`font-body-md text-xs sm:text-body-md ${
                                  isActive
                                    ? "text-on-surface font-medium"
                                    : "text-on-surface-variant"
                                }`}
                              >
                                {phase.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                            {isActive ? (
                              <span className="w-full sm:w-auto justify-center px-4 py-2 sm:py-2.5 rounded-xl bg-primary-fixed text-on-primary-fixed-variant font-label-md text-xs sm:text-label-md font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                                  equalizer
                                </span>
                                <span>Đang phát giai đoạn này</span>
                              </span>
                            ) : (
                              <button
                                className="btn-activate-phase w-full sm:w-auto justify-center px-4 sm:px-5 py-2 sm:py-3 rounded-xl bg-surface-container-low hover:bg-secondary-fixed text-on-surface font-label-lg text-xs sm:text-label-lg font-bold flex items-center gap-2 transition-all cursor-pointer"
                                type="button"
                                onClick={() => handleActivatePhase(phase.id)}
                              >
                                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                                  play_arrow
                                </span>
                                <span>Bật Giai Đoạn Này Ngay</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Song list for this phase (Responsive: 1 col on mobile, 2 col on tablet, 3 col on desktop) */}
                        <div
                          className={`mt-3 sm:mt-4 pt-3 sm:pt-4 rounded-xl p-2.5 sm:p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 ${
                            isActive
                              ? "bg-primary-fixed/20"
                              : "bg-surface-container-low/50"
                          }`}
                        >
                          {phase.songs.map((song) => {
                            const isCurrentSong = currentSong.title === song.title;

                            return (
                              <div
                                key={song.id}
                                className={`song-item flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest transition-all cursor-pointer ${
                                  isCurrentSong
                                    ? "shadow-sm border-0 ring-1 ring-primary/30"
                                    : isActive
                                    ? "hover:bg-primary-fixed/40"
                                    : "hover:bg-secondary-fixed/30"
                                }`}
                                onClick={() => handleSelectSong(song.title, phase.id)}
                              >
                                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 pr-2">
                                  {isCurrentSong ? (
                                    <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                                      <span className="material-symbols-outlined text-[13px] sm:text-[14px]">
                                        volume_up
                                      </span>
                                    </span>
                                  ) : (
                                    <span className="material-symbols-outlined text-primary text-[18px] sm:text-[20px] shrink-0">
                                      music_note
                                    </span>
                                  )}
                                  <div className="truncate min-w-0">
                                    <p
                                      className={`font-body-md text-xs sm:text-body-md truncate ${
                                        isCurrentSong
                                          ? "font-bold text-primary"
                                          : "font-semibold text-on-surface"
                                      }`}
                                    >
                                      {song.title}
                                    </p>
                                    <p
                                      className={`font-body-sm text-[11px] sm:text-body-sm truncate ${
                                        isCurrentSong
                                          ? "text-primary/80 font-medium"
                                          : "text-on-surface-variant"
                                      }`}
                                    >
                                      {isCurrentSong
                                        ? `${song.subtitle || song.artist} • Đang phát`
                                        : song.subtitle || `${song.artist} • ${song.duration}`}
                                    </p>
                                  </div>
                                </div>

                                {isCurrentSong ? (
                                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                                      equalizer
                                    </span>
                                  </span>
                                ) : (
                                  <button
                                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                                    type="button"
                                    aria-label={`Phát bài ${song.title}`}
                                  >
                                    <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                                      play_arrow
                                    </span>
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* KHUNG LƯU Ý CHO ĐIỀU PHỐI VIÊN ÂM THANH */}
              <div className="rounded-2xl bg-surface-container-low p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0 mt-0.5 sm:mt-0">
                    <span className="material-symbols-outlined text-[20px] sm:text-[22px]">
                      tips_and_updates
                    </span>
                  </div>
                  <div>
                    <p className="font-title-md text-sm sm:text-title-md text-on-surface font-bold">
                      Mẹo vận hành âm thanh lễ đính hôn
                    </p>
                    <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant">
                      Khi đại diện hai họ bắt đầu phát biểu và trao sính lễ,
                      hãy ấn nút{" "}
                      <strong className="text-secondary font-bold">
                        &quot;Chuyển mượt (Fade-out 3s)&quot;
                      </strong>{" "}
                      để âm lượng hạ từ từ êm dịu, không ngắt đột ngột gây gián
                      đoạn không khí trang trọng.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-xs sm:text-label-md shrink-0">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                  <span>Hệ Thống Trực Tuyến: Sẵn Sàng 100%</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="w-full bg-surface-container-low py-4 sm:py-space-lg mt-auto">
          <div className="w-full px-3 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-center md:text-left max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">
                volunteer_activism
              </span>
              <span className="font-headline-sm text-xs sm:text-body-md text-on-surface">
                Hà Phương &amp; Mai Phương • Lễ Đính Hôn Trọn Vẹn Yêu Thương
              </span>
            </div>
            <p className="font-body-sm text-[11px] sm:text-body-sm text-on-surface-variant italic">
              &quot;Chúc đôi uyên ương trăm năm hạnh phúc, vẹn tròn sắc son đính
              ước bên nhau.&quot;
            </p>
            <div className="flex items-center gap-2.5 sm:gap-3 font-label-sm text-[10px] sm:text-label-sm text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-tertiary text-[14px]">
                  graphic_eq
                </span>
                <span>48kHz • Lossless Audio</span>
              </span>
              <span>•</span>
              <span>Grand Ballroom</span>
            </div>
          </div>
        </footer>
      </>
      )}
    </div>
  );
}

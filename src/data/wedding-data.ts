export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationSec: number;
  subtitle?: string;
  audioUrl: string;
}

export interface Phase {
  id: number;
  number: string;
  title: string;
  duration: string;
  description: string;
  songs: Song[];
}

export const PHASES_DATA: Phase[] = [
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
export const MASTER_PLAYLIST = PHASES_DATA.flatMap((phase) =>
  phase.songs.map((song) => ({
    ...song,
    phaseNumber: phase.number,
    phaseTitle: phase.title,
  }))
);

// Format seconds into MM:SS
export function formatTime(seconds: number): string {
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

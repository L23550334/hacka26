export type SectionKey = "talento" | "tradiciones" | "nuevas";

export interface Song {
  id: string;
  title: string;
  duration: string;
  plays: string;
}

export interface Package {
  id: string;
  label: string;
  hours: number;
  perks: string[];
  popular?: boolean;
}

export interface Band {
  id: string;
  name: string;
  genre: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  successfulEvents: number;
  yearsActive: number;
  bio: string;
  cover: string;
  avatar: string;
  sections: SectionKey[];
  availability: string[];
  packages: Package[];
  songs: Song[];
}

export interface Booking {
  id: string;
  bandId: string;
  bandName: string;
  bandAvatar: string;
  dateLabel: string;
  time: string;
  hours: number;
  address: string;
  total: number;
  artistAmount: number;
  coopFee: number;
}

export type TabKey = "inicio" | "reservas" | "perfil";

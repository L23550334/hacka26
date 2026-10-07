"use client";

import { useState } from "react";
import bandsData from "@/data/bands.json";
import type { Band, Booking, TabKey } from "@/lib/types";

import OnboardingScreen from "@/components/OnboardingScreen";
import HomeScreen from "@/components/HomeScreen";
import ReservasScreen from "@/components/ReservasScreen";
import PerfilScreen from "@/components/PerfilScreen";
import BandProfileScreen from "@/components/BandProfileScreen";
import BookingBottomSheet from "@/components/BookingBottomSheet";
import BottomTabBar from "@/components/BottomTabBar";
import DesktopNav from "@/components/DesktopNav";

const bands = bandsData as Band[];

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const [tab, setTab] = useState<TabKey>("inicio");
  const [selectedBand, setSelectedBand] = useState<Band | null>(null);
  const [bookingBand, setBookingBand] = useState<Band | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [purchasedSongs, setPurchasedSongs] = useState<Set<string>>(new Set());
  const [buyingSongId, setBuyingSongId] = useState<string | null>(null);

  if (user === null) return <OnboardingScreen onLogin={setUser} />;

  const logout = () => setUser(null);

  const buySong = (songId: string) => {
    if (buyingSongId) return;
    setBuyingSongId(songId);
    setTimeout(() => {
      setPurchasedSongs((prev) => new Set(prev).add(songId));
      setBuyingSongId(null);
    }, 1200);
  };

  return (
    <>
      <DesktopNav
        tab={tab}
        onChange={setTab}
        userName={user}
        bookingsCount={bookings.length}
        onLogout={logout}
      />

      {tab === "inicio" && (
        <HomeScreen userName={user} bands={bands} onSelectBand={setSelectedBand} />
      )}
      {tab === "reservas" && (
        <ReservasScreen
          bookings={bookings}
          onExplore={() => setTab("inicio")}
          onCancel={(id) => setBookings((prev) => prev.filter((b) => b.id !== id))}
        />
      )}
      {tab === "perfil" && <PerfilScreen userName={user} onLogout={logout} />}

      {selectedBand && (
        <BandProfileScreen
          band={selectedBand}
          onBack={() => setSelectedBand(null)}
          onBook={() => setBookingBand(selectedBand)}
          purchased={purchasedSongs}
          buyingSongId={buyingSongId}
          onBuySong={buySong}
        />
      )}

      {bookingBand && (
        <BookingBottomSheet
          band={bookingBand}
          onClose={() => setBookingBand(null)}
          onConfirm={(booking) => setBookings((prev) => [booking, ...prev])}
          onViewReservas={() => {
            setBookingBand(null);
            setSelectedBand(null);
            setTab("reservas");
          }}
        />
      )}

      <BottomTabBar tab={tab} onChange={setTab} bookingsCount={bookings.length} />
    </>
  );
}

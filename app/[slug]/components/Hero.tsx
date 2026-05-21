'use client'

import { useEffect, useState } from 'react'

type HeroProps = {
  brideName: string
  groomName: string
  introDescription?: string | null
  weddingDate?: string | null
  weddingTime?: string | null
  backgroundImage?: string | null
  backgroundPosition?: string | null
  mobileBackgroundPosition?: string | null
  guestName?: string | null
}

const formatDate = (date?: string | null) => {
  if (!date) return ''
  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(date))
}

const formatTime = (time?: string | null) => {
  if (!time) return ''
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(`1970-01-01T${time}+07:00`))
}

export default function Hero({
  brideName,
  groomName,
  introDescription,
  weddingDate,
  weddingTime,
  backgroundImage,
  backgroundPosition,
  mobileBackgroundPosition,
  guestName,
}: HeroProps) {
  const [showTitles, setShowTitles] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitles(true), 120)
    const t2 = setTimeout(() => setShowSubtitle(true), 620)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const updateMobileView = () => setIsMobileView(mediaQuery.matches)

    updateMobileView()
    mediaQuery.addEventListener('change', updateMobileView)

    return () => mediaQuery.removeEventListener('change', updateMobileView)
  }, [])

  const date = formatDate(weddingDate)
  const time = formatTime(weddingTime)
  const desktopHeroPosition = backgroundPosition?.trim() || 'center 19%'
  const mobileHeroPosition = mobileBackgroundPosition?.trim() || desktopHeroPosition
  const heroBackgroundPosition = isMobileView ? mobileHeroPosition : desktopHeroPosition

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden flex items-center justify-center text-center px-5 py-12 md:min-h-screen md:px-6 md:py-16">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: backgroundImage
              ? `linear-gradient(180deg, rgba(0,0,0,0.42), rgba(0,0,0,0.58)), url(${backgroundImage})`
              : 'radial-gradient(circle at 20% 20%, rgba(255, 214, 170, 0.25), transparent 32%), radial-gradient(circle at 80% 0%, rgba(255, 182, 193, 0.2), transparent 35%), radial-gradient(circle at 50% 80%, rgba(255, 214, 170, 0.28), transparent 30%)',
            backgroundSize: 'cover',
            backgroundPosition: heroBackgroundPosition,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/40 to-black/60" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[92vw] flex-col items-center space-y-4 text-white md:max-w-3xl md:space-y-6">
        <p className={`text-[10px] uppercase tracking-[0.32em] text-white/75 transition-all duration-700 md:text-xs md:tracking-[0.35em] ${showTitles ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          Trân trọng kính mời
        </p>
        {guestName && (
          <p className={`text-sm font-medium text-white/90 transition-all duration-700 delay-100 ${showTitles ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            {guestName}
          </p>
        )}
        <h1
          className={`font-display max-w-[360px] text-[40px] leading-[0.98] drop-shadow-2xl transition-all duration-700 ease-out min-[390px]:text-[44px] md:max-w-none md:text-6xl md:leading-none lg:text-7xl ${
            showTitles ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.97] translate-y-4'
          }`}
        >
          {brideName} <span className="text-[#e6c18f]">&</span> {groomName}
        </h1>
        {introDescription && (
          <p
            className={`max-w-[350px] text-[14px] leading-[1.72] text-white/82 drop-shadow-md transition-all duration-700 ease-out min-[390px]:text-[14.5px] md:max-w-3xl md:text-lg md:leading-relaxed ${
              showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            {introDescription}
          </p>
        )}

        <div className="flex flex-col items-center justify-center gap-3 pt-1 text-sm sm:flex-row sm:gap-6 md:text-base">
          {(date || time) && (
            <div className="rounded-[18px] border border-white/18 bg-white/10 px-5 py-3.5 shadow-lg backdrop-blur md:rounded-2xl md:px-6 md:py-4">
              <p className="text-[14px] font-semibold md:text-base">{date}</p>
              {time && <p className="mt-1 text-[13px] text-white/75 md:text-sm">{time}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import Gallery from '../components/Gallery'
import Hero from '../components/Hero'
import LocationSection from '../components/LocationSection'
import RsvpSection from '../components/RsvpSection'
import Countdown from '../components/Countdown'
import WishSection from '../components/WishSection'
import PetalEffect from '../components/PetalEffect'
import Footer from '../components/Footer'
import AudioPlayer from '../components/AudioPlayer'
import GiftSection from '../components/GiftSection'
import { TemplateProps } from './types'

export default function ClassicTemplate({
    couple,
    gallery,
    wishes,
    weddingGift,
    locations,
}: TemplateProps) {
    const manualHeroBackground = '/wedding/hero.jpg'

const manualGallery = [
  { id: 'manual-01', image_url: '/wedding/1.jpg', caption: 'Khoảnh khắc của chúng mình' },
  { id: 'manual-02', image_url: '/wedding/2.jpg', caption: 'Cùng nhau đi qua những ngày đẹp nhất' },
  { id: 'manual-03', image_url: '/wedding/3.jpg', caption: 'Ngày hạnh phúc' },
  { id: 'manual-04', image_url: '/wedding/4.jpg', caption: 'Yêu thương và bình yên' },
  { id: 'manual-05', image_url: '/wedding/5.jpg', caption: 'Mãi bên nhau' },
  { id: 'manual-06', image_url: '/wedding/6.jpg', caption: 'Kỷ niệm của chúng mình' },
  { id: 'manual-07', image_url: '/wedding/7.jpg', caption: 'Một hành trình mới' },
  { id: 'manual-08', image_url: '/wedding/8.jpg', caption: 'The beginning of forever' },
  { id: 'manual-09', image_url: '/wedding/9.jpg', caption: 'The beginning of forever' },
  { id: 'manual-10', image_url: '/wedding/10.jpg', caption: 'The beginning of forever' },
]

const displayGallery = manualGallery

const heroBackground = manualHeroBackground

    const themeClass =
        couple.theme && couple.theme !== 'classic' ? `theme-${couple.theme}` : 'theme-classic'

    return (
        <div className={`bg-white text-primary overflow-hidden ${themeClass}`}>
            <PetalEffect />

            <Hero
                brideName={couple.bride_name}
                groomName={couple.groom_name}
                introDescription={couple.intro_description}
                weddingDate={couple.wedding_date}
                weddingTime={couple.wedding_time}
                backgroundImage={heroBackground}
            />

            <div className="bg-white">
            {(() => {
                return (
                    <LocationSection
                        weddingDate={couple.wedding_date}
                        weddingTime={couple.wedding_time}
                        brideInfo={{
                            title: locations?.bride_event_title,
                            location: locations?.bride_location,
                            address: locations?.bride_address,
                            mapEmbedUrl: locations?.bride_google_map_embed,
                        }}
                        groomInfo={{
                            title: locations?.groom_event_title,
                            location: locations?.groom_location,
                            address: locations?.groom_address,
                            mapEmbedUrl: locations?.groom_google_map_embed,
                        }}
                    />
                )
            })()}

            <Countdown
                weddingDate={couple.wedding_date}
                weddingTime={couple.wedding_time}
            />

            <Gallery images={displayGallery} />

            <GiftSection couple={couple} weddingGift={weddingGift} />

            <RsvpSection
                coupleId={couple.id}
                brideAvatar={gallery?.[1]?.image_url || couple.bride_avatar}
                groomAvatar={gallery?.[0]?.image_url || couple.groom_avatar}
            />

            <WishSection coupleId={couple.id} initialWishes={wishes || []} />

            <Footer
                bride={couple.bride_name}
                groom={couple.groom_name}
                date={couple.wedding_date}
            />
            </div>

            <AudioPlayer
                musicUrl={couple.music_url}
                delay={couple.music_delay}
                volume={couple.music_volume}
                autoplay={couple.music_autoplay}
            />
        </div>
    )
}

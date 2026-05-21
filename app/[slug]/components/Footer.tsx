export default function Footer({ bride, groom, date }: { bride: string; groom: string; date?: string | null }) {
  return (
    <footer className="py-10 px-6 bg-[#f8f4ef] text-center text-[#5b3a29]">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.28em] text-[#c08a4b]">Thank you</p>
        <h4 className="font-display text-2xl">{bride} &amp; {groom}</h4>
        {date && <p className="text-sm text-[#7b5e4b]">{date}</p>}
      </div>

      <div className="mt-8 pt-5 border-t border-[#eadfd5]">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#9b7a64]">
          © 2026 Designed &amp; Developed by Nhựt Hoàng
        </p>
      </div>
    </footer>
  )
}

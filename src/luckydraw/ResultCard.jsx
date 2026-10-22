import { motion } from 'framer-motion'


export default function ResultCard({ prize, code, alreadyPlayed, email, onAgain }) {
  const isForum = String(prize.type).startsWith('forum') // forum50, forum30, forumfree… đều do BTC gửi mã qua email
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 160, damping: 14 }}
      className="relative z-30 mx-auto w-full max-w-md rounded-3xl border border-[#FEB12E]/60 bg-white/10 p-6 text-center backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#FEB12E]">
        {alreadyPlayed ? 'Email này đã quay — kết quả của bạn' : 'Chúc mừng bạn đã trúng'}
      </p>
      <h2 className="mt-3 text-2xl font-bold leading-snug text-white">{prize.name}</h2>
      {code && (
        <div className="mx-auto mt-4 w-fit rounded-2xl border-2 border-dashed border-[#FEB12E] bg-[#2B081F]/60 px-6 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">Mã lượt chơi</p>
          <p className="mt-1 font-mono text-3xl font-bold tracking-[0.2em] text-[#FEB12E]">{code}</p>
        </div>
      )}
      {isForum ? (
        <p className="mt-4 text-sm leading-relaxed text-white/80">
          Mã ưu đãi sẽ được HAWEE gửi qua email <b className="text-white">{email}</b> sau chương trình. Bạn chỉ cần kiểm tra
          hộp thư (cả mục Spam). Hãy lưu lại mã lượt chơi phía trên để đối chiếu khi cần.
        </p>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-white/80">
          Nhận quà tại <b className="text-white">{prize.place || 'gian hàng tại HAWEE Pavilion'}</b>. Hãy chụp màn hình này
          (kèm mã lượt chơi) và đưa cho nhân viên gian hàng để nhận quà.
        </p>
      )}
      {isForum && (
        <a
          href="https://leadersforum.hawee.vn/"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm font-semibold text-[#FEB12E] underline"
        >
          Xem thông tin HAWEE Leaders Forum 2026
        </a>
      )}
      <button
        onClick={onAgain}
        className="mt-6 w-full rounded-full border border-white/40 py-3 text-sm font-semibold text-white transition active:scale-95"
      >
        Quay tiếp bằng email khác
      </button>
    </motion.div>
  )
}

const FORUM_TYPES = ['forum50', 'forumfree']

export default function ResultCard({ prize, alreadyPlayed, email, onAgain }) {
  const isForum = FORUM_TYPES.includes(prize.type)
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-[#FEB12E]/60 bg-white/10 p-6 text-center backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#FEB12E]">
        {alreadyPlayed ? 'Email này đã quay — kết quả của bạn' : 'Chúc mừng bạn đã trúng'}
      </p>
      <h2 className="mt-3 text-2xl font-bold leading-snug text-white">{prize.name}</h2>
      {isForum ? (
        <p className="mt-4 text-sm leading-relaxed text-white/80">
          Mã ưu đãi sẽ được HAWEE gửi qua email <b className="text-white">{email}</b> sau chương trình. Bạn chỉ cần kiểm tra
          hộp thư (cả mục Spam).
        </p>
      ) : (
        <p className="mt-4 text-sm leading-relaxed text-white/80">
          Nhận quà tại <b className="text-white">{prize.place || 'gian hàng tại HAWEE Pavilion'}</b>. Hãy chụp màn hình này
          và đưa cho nhân viên gian hàng.
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
    </div>
  )
}

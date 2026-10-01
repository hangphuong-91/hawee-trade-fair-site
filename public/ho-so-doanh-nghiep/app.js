(function () {
  "use strict";

  function initBook() {
    var wrap = document.getElementById("book-wrap");
    if (!window.St || !window.St.PageFlip) {
      wrap.innerHTML =
        '<p style="text-align:center;font-size:.85rem;color:#7B5B6E;padding:40px 16px;">Không tải được thư viện lật trang. Vui lòng tải lại trang.</p>';
      wrap.classList.add("ready");
      return;
    }

    var bookEl = document.getElementById("book");
    var pageFlip = new St.PageFlip(bookEl, {
      width: 420,
      height: 594,
      size: "stretch",
      minWidth: 260,
      maxWidth: 480,
      minHeight: 368,
      maxHeight: 680,
      maxShadowOpacity: 0.5,
      showCover: true,
      usePortrait: true,
      mobileScrollSupport: false,
      flippingTime: 650,
      drawShadow: true,
    });

    pageFlip.loadFromHTML(document.querySelectorAll("#book .page"));

    var total = pageFlip.getPageCount();
    var indicator = document.getElementById("pageIndicator");
    var prevBtn = document.getElementById("prevBtn");
    var nextBtn = document.getElementById("nextBtn");

    function refreshUI() {
      var idx = pageFlip.getCurrentPageIndex();
      indicator.textContent = idx + 1 + " / " + total;
      prevBtn.disabled = idx <= 0;
      nextBtn.disabled = idx >= total - 1;
    }

    pageFlip.on("flip", refreshUI);

    prevBtn.addEventListener("click", function () {
      pageFlip.flipPrev();
    });
    nextBtn.addEventListener("click", function () {
      pageFlip.flipNext();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") pageFlip.flipNext();
      if (e.key === "ArrowLeft") pageFlip.flipPrev();
    });

    document.getElementById("jumpRow").addEventListener("click", function (e) {
      var btn = e.target.closest(".jump-btn");
      if (!btn) return;
      pageFlip.flip(parseInt(btn.getAttribute("data-page"), 10));
    });

    refreshUI();
    wrap.classList.add("ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBook);
  } else {
    initBook();
  }
})();

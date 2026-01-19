document.addEventListener("DOMContentLoaded", function () {
  let observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let $this = $(entry.target);
          $this.prop("Counter", 0).animate(
            {
              Counter: $this.text(),
            },
            {
              duration: 4000,
              easing: "swing",
              step: function (now) {
                $(this).text(Math.ceil(now));
              },
            }
          );
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".counter").forEach((counter) => {
    observer.observe(counter);
  });
});

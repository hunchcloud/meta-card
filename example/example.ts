const $input = document.querySelector("input");

$input?.addEventListener("blur", e => {
  document.querySelector("meta-card").setAttribute("href", e.target.value);
});

$input?.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    document.querySelector("meta-card").setAttribute("href", e.target.value);
  }
});

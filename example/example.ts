const $input = document.querySelector("input");

$input?.addEventListener("blur", e => {
  const el = e.target as HTMLInputElement;
  document.querySelector("meta-card")?.setAttribute("href", el.value);
});

$input?.addEventListener("keydown", e => {
  const el = e.target as HTMLInputElement;
  if (e.key === "Enter") {
    document.querySelector("meta-card")?.setAttribute("href", el.value);
  }
});

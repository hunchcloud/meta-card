const $input = document.querySelector("input");
const $metaCard = document.querySelector("meta-card");

if ($input && $metaCard) {
  $input.addEventListener("focus", () => $input.select());

  $input.addEventListener("blur", () => {
    $metaCard.setAttribute("href", $input.value);
  });

  $input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      $metaCard.setAttribute("href", $input.value);
    }
  });
}

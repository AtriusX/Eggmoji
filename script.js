const SEED_LENGTH   = 40;
const CANVAS_SIZE   = 512;
const CANVAS_CENTER = CANVAS_SIZE / 2;
const TEMPLATE_META = meta.templates;
const IMG_DATA      = [];
// Populate data
TEMPLATE_META.forEach(img => {
  IMG_DATA.push(img.src.toImage());
});
// Non-random components
const IMG_BASE   = meta.base.toImage();
const IMG_MASK   = meta.mask.toImage();
const IMG_SHADOW = meta.shadow.toImage();

function process() {
  let [canvas, ctx] = getCanvas("egg");
  // Reset canvas state
  canvas.clear();
  // Generate seed
  let name = document.getElementById("name").value;
  Math.seedrandom(name);

  ctx.drawImg(IMG_BASE.color(), 0, 1);
  IMG_DATA.forEach(img => {
    if (Math.random() > Math.random())
      ctx.drawImg(img.color(), Math.random() * 180, Math.random());
  });
  ctx.drawImg(IMG_SHADOW, 0, 0.18);
  ctx.drawImg(IMG_MASK.color("#F5F5F5"), 0, 1);
}

function download() {
  let [canvas] = getCanvas("egg");
  // let name  = document.getElementById('name');
  var download = document.getElementById("download");
  var image = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);
}

function toggleAutoUpdate() {
    let update  = document.getElementById('update');
    let confirm = document.getElementById('confirm');
    let name    = document.getElementById('name');
    // Toggle properties
    if (confirm.hasAttribute('disabled')) {
        confirm.removeAttribute('disabled');
        update.style.backgroundColor = '#fbe4ff';
        name.removeAttribute('oninput');
    } else {
        confirm.setAttribute('disabled', '');
        update.style.backgroundColor = '#bcffe5';
        name.setAttribute('oninput', 'process()');
    }
}

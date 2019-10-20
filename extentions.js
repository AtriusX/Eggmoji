/**
 * Draws an image onto a canvas with a specified angle and opacity.
 * 
 * @param {Image}  img     The image object to draw.
 * @param {Number} angle   The angle of rotation.
 * @param {Number} opacity The image's opacity.
 */
CanvasRenderingContext2D.prototype.drawImg = function(img, angle, opacity) {
  this.save();
  this.translate(CANVAS_CENTER, CANVAS_CENTER);
  this.rotate((angle * Math.PI) / 180);
  this.globalAlpha = opacity;
  this.drawImage(img, -CANVAS_CENTER, -CANVAS_CENTER);
  this.restore();
};

/**
 * Generates a numeric seed from a string input.
 *
 * @param {String} input The seed source.
 */
String.prototype.seed = function(len) {
  // Map each character to it's corresponding charcode
  let seed = this.split("")
    .map(c => parseInt(c.charCodeAt(0), 10))
    .join("");
  // Prevent an infinite loop
  if (!seed) {
    return "0";
  }
  // Normalize seed length to set value
  while (seed.length < len) {
    seed += seed
      .split("")
      .reverse()
      .join("");
  }
  // Remove characters until the seed matches the expected length
  let dist = Math.floor(len / (seed.length - len));
  for (let i = dist; seed.length > len; i += dist) {
    seed = seed.substring(0, i) + seed.substring(i + 1);
  }
  return seed;
};

Image.prototype.color = function(c) {
  let [canvas, ctx] = getCanvas();
  ctx.drawImage(this, 0, 0);
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = c ? c : `hsl(${Math.random() * 360}, 100%, 75%)`;
  // '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.globalCompositeOperation = "source-over";
  return canvas;
};

HTMLCanvasElement.prototype.clear = function() {
  this.getContext("2d").clearRect(0, 0, this.width, this.height);
};

function createImage(url) {
  let img = new Image();
  img.src = url;
  return img;
}

function getCanvas(id) {
  let canvas;
  if (id) {
    canvas = document.getElementById(id);
  } else {
    canvas = document.createElement("canvas");
    canvas.height = CANVAS_SIZE;
    canvas.width = CANVAS_SIZE;
  }
  return [canvas, canvas.getContext("2d")];
}

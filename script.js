const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let fileName = "";

const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");
const FilterSetting = document.querySelectorAll(".FilterSetting");
const filterBtn = document.querySelectorAll(".filter-btn");

// Filter & Effect Handlers
let effectActive;
filterBtn.forEach((e) => {
  e.addEventListener("click", (e) => {
    FilterSetting.forEach((e) => {
      e.firstElementChild.value = 0;
      e.lastElementChild.innerText = 0;
    });
    Caman("#canvas", img, function () {
      this.revert();
      this[e.target.dataset.effect]().render();
    });
    filterBtn.forEach((e) => {
      e.classList.remove("btn-warning");
      e.classList.add("btn-dark");
    });
    e.target.classList.remove("btn-dark");
    e.target.classList.add("btn-warning");
  });
});

// Revert Filters
revertBtn.addEventListener("click", (e) => {
  filterBtn.forEach((e) => {
    e.classList.add("btn-dark");
    e.classList.remove("btn-warning");
  });
  Caman("#canvas", img, function () {
    FilterSetting.forEach((e) => {
      e.firstElementChild.value = 0;
      e.lastElementChild.innerText = 0;
    });
    this.revert();
  });
});

// Upload File
uploadFile.addEventListener("change", () => {
  // Get File
  const file = document.getElementById("upload-file").files[0];
  // Init FileReader API
  const reader = new FileReader();

  // Check for file
  if (file) {
    // Set file name
    fileName = file.name;
    // Read data as URL
    reader.readAsDataURL(file);
  }

  // Add image to canvas
  reader.addEventListener(
    "load",
    () => {
      // Create image
      img = new Image();
      // Set image src
      img.src = reader.result;
      // On image load add to canvas
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.removeAttribute("data-caman-id");
      };
    },
    false
  );
});

// Download Event
downloadBtn.addEventListener("click", () => {
  // Get ext
  const fileExtension = fileName.slice(-4);

  // Init new filename
  let newFilename;

  // Check image type
  if (fileExtension === ".jpg" || fileExtension === ".png") {
    // new filename
    newFilename = fileName.substring(0, fileName.length - 4) + "-edited.jpg";
  }

  // Call download
  download(canvas, newFilename);
});

// Download
function download(canvas, filename) {
  // Init event
  let e;
  // Create link
  const link = document.createElement("a");

  // Set props
  link.download = filename;
  link.href = canvas.toDataURL("image/jpeg", 0.8);
  // New mouse event
  e = new MouseEvent("click");
  // Dispatch event
  link.dispatchEvent(e);
}

FilterSetting.forEach((e) => {
  let prevValue = 0;
  e.addEventListener("change", (e) => {
    let inc = e.target.value - prevValue;
    prevValue = parseInt(e.target.value);
    if (
      e.target.dataset.filter == "red" ||
      e.target.dataset.filter == "green" ||
      e.target.dataset.filter == "blue"
    ) {
      Caman("#canvas", img, function () {
        this.channels({
          [e.target.dataset.filter]: inc,
        }).render();
      });
    } else if (e.target.dataset.filter) {
      Caman("#canvas", img, function () {
        this[e.target.dataset.filter](inc).render();
      });
    }
    e.target.nextElementSibling.innerText = e.target.value;
  });
});

const width = document.getElementById("width");
const height = document.getElementById("height");
const resize = document.getElementById("resize");

resize.addEventListener("click", (e) => {
  if (
    parseInt(width.value) > 0 &&
    parseInt(width.value) < 100 &&
    parseInt(height.value) > 0 &&
    parseInt(height.value) < 100
  ) {
    Caman("#canvas", img, function () {
      this.resize({
        width: (canvas.scrollWidth * width.value) / 100,
        height: (canvas.scrollHeight * height.value) / 100,
      }).render();
    });
  } else {
    let str = `<div class="my-3 alert alert-warning alert-dismissible fade show" role="alert">
    Input Width or Height Invalid
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
    uploadFile.insertAdjacentHTML("afterend", str);
  }
});

const colorize = document.getElementById("colorize");
const color = document.getElementById("color");
const opacity = document.getElementById("opacity");

colorize.addEventListener("click", (e) => {
  opacity.nextElementSibling.innerText = 0;
  Caman("#canvas", img, function () {
    this.colorize(color.value, parseInt(opacity.value)).render();
  });
  // opacity.value = 0;
});

const crop = document.getElementById("crop");
crop.addEventListener("click", (e) => {
  let pos = [];
  let str = `<div class="my-3 alert alert-warning alert-dismissible fade show" role="alert">
    Click the border from top right bottom left
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
  uploadFile.insertAdjacentHTML("afterend", str);
  canvas.addEventListener("click", (e) => {
    pos.push({ x: getMousePos(canvas, e).x, y: getMousePos(canvas, e).y });
    if (pos.length == 4) {
      Caman("#canvas", img, function () {
        this.crop(
          pos[1].x - pos[3].x,
          pos[2].y - pos[0].y,
          pos[3].x,
          pos[0].y
        ).render();
      });
    }
  });
});

function getMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
    y: ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
  };
}

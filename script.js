const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let fileName = "";

const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");
const FilterSetting = document.querySelectorAll(".FilterSetting");

// Filter & Effect Handlers
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("vintage-add")) {
    Caman("#canvas", img, function () {
      this.vintage().render();
    });
  } else if (e.target.classList.contains("lomo-add")) {
    Caman("#canvas", img, function () {
      this.lomo().render();
    });
  } else if (e.target.classList.contains("clarity-add")) {
    Caman("#canvas", img, function () {
      this.clarity().render();
    });
  } else if (e.target.classList.contains("sincity-add")) {
    Caman("#canvas", img, function () {
      this.sinCity().render();
    });
  } else if (e.target.classList.contains("sunrise-add")) {
    Caman("#canvas", img, function () {
      this.sunrise().render();
    });
  } else if (e.target.classList.contains("crossprocess-add")) {
    Caman("#canvas", img, function () {
      this.crossProcess().render();
    });
  } else if (e.target.classList.contains("orangepeel-add")) {
    Caman("#canvas", img, function () {
      this.orangePeel().render();
    });
  } else if (e.target.classList.contains("love-add")) {
    Caman("#canvas", img, function () {
      this.love().render();
    });
  } else if (e.target.classList.contains("grungy-add")) {
    Caman("#canvas", img, function () {
      this.grungy().render();
    });
  } else if (e.target.classList.contains("hermajesty-add")) {
    Caman("#canvas", img, function () {
      this.herMajesty().render();
    });
  } else if (e.target.classList.contains("hermajesty-add")) {
    Caman("#canvas", img, function () {
      this.herMajesty().render();
    });
  } else if (e.target.classList.contains("hermajesty-add")) {
    Caman("#canvas", img, function () {
      this.herMajesty().render();
    });
  } else if (e.target.classList.contains("hermajesty-add")) {
    Caman("#canvas", img, function () {
      this.herMajesty().render();
    });
  } else if (e.target.classList.contains("hermajesty-add")) {
    Caman("#canvas", img, function () {
      this.herMajesty().render();
    });
  } else if (e.target.classList.contains("hermajesty-add")) {
    Caman("#canvas", img, function () {
      this.herMajesty().render();
    });
  } else if (e.target.classList.contains("hermajesty-add")) {
    Caman("#canvas", img, function () {
      this.herMajesty().render();
    });
  } else if (e.target.classList.contains("hermajesty-add")) {
    Caman("#canvas", img, function () {
      this.herMajesty().render();
    });
  } else if (e.target.classList.contains("hermajesty-add")) {
    Caman("#canvas", img, function () {
      this.herMajesty().render();
    });
  }
});

// Revert Filters
revertBtn.addEventListener("click", (e) => {
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
    console.log(inc);
    e.target.nextElementSibling.innerText = e.target.value;
    console.log(e.target.dataset.filter);
    if (e.target.dataset.filter == "brightness") {
      Caman("#canvas", img, function () {
        this.brightness(inc).render();
      });
    } else if (e.target.dataset.filter == "contrast") {
      Caman("#canvas", img, function () {
        this.contrast(inc).render();
      });
    } else if (e.target.dataset.filter == "saturation") {
      Caman("#canvas", img, function () {
        this.saturation(inc).render();
      });
    } else if (e.target.dataset.filter == "vibrance") {
      Caman("#canvas", img, function () {
        this.vibrance(inc).render();
      });
    } else if (e.target.dataset.filter == "exposure") {
      Caman("#canvas", img, function () {
        this.exposure(inc).render();
      });
    } else if (e.target.dataset.filter == "hue") {
      Caman("#canvas", img, function () {
        this.hue(inc).render();
      });
    } else if (e.target.dataset.filter == "sepia") {
      Caman("#canvas", img, function () {
        this.sepia(inc).render();
      });
    } else if (e.target.dataset.filter == "gamma") {
      Caman("#canvas", img, function () {
        this.gamma(inc).render();
      });
    } else if (e.target.dataset.filter == "noise") {
      Caman("#canvas", img, function () {
        this.noise(inc).render();
      });
    } else if (e.target.dataset.filter == "clip") {
      Caman("#canvas", img, function () {
        this.clip(inc).render();
      });
    } else if (e.target.dataset.filter == "sharpen") {
      Caman("#canvas", img, function () {
        this.sharpen(inc).render();
      });
    } else if (e.target.dataset.filter == "stackBlur") {
      Caman("#canvas", img, function () {
        this.stackBlur(inc).render();
      });
    }
  });
});

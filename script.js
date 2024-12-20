const arButton = document.getElementById("ar-button");
const modelViewer = document.getElementById("model-viewer");
const cameraBox = document.getElementById("cameraBox");
const batteryBox = document.getElementById("batteryBox");
const backpanel = document.getElementById("backpanel");
const first = document.getElementById("first");
const container = document.querySelector(".container");

const threeSixty = document.querySelector('.threeSixty');

arButton.addEventListener("click", () => {
  if (modelViewer.canActivateAR) {
    modelViewer.src = "./modal/vivo50_base.glb";
    backpanel.classList.remove("active");
    modelViewer.activateAR();
  } else {
    alert("AR is not supported on your device.");
  }
});

window.addEventListener("DOMContentLoaded", ()=>{
    setTimeout(() => {
        threeSixty.style.display = "none";
    }, 4000);
});


// 360° view for Camera
cameraBox.addEventListener("click", () => {
  modelViewer.src = "./modal/vivo50_cam_lens.glb";
  backpanel.classList.remove("active");
  first.style.display = "block";
  modelViewer.setAttribute("camera-orbit", "-50deg 75deg 2.86m"); // Initial angle
  modelViewer.setAttribute("min-camera-orbit", "auto auto auto"); // Unrestricted rotation
  modelViewer.setAttribute("max-camera-orbit", "auto auto auto");

  modelViewer.autoRotateEnabled = true; // Enable auto-rotate

  container.style.display = "block";

  const cameraData = [
    {
      title: "ZEISS 1-inch Main Camera",
      descriptions: [
        "50 MP",
        '1/0.98"',
        "f/1.75 Aperture",
        "IMX989 Sensor",
        "1 Glass + 7 Plastic Lenses",
        "OIS",
      ],
    },
    {
      title: "Super Wide-Angle Camera",
      descriptions: ["50 MP", '1/2.76"', "f/2.0 Aperture"],
    },
    {
      title: "ZEISS APO Floating Telephoto Camera",
      descriptions: [
        "50 MP",
        "1/2<sup>3</sup>",
        "f/2.5 Aperture",
        "Floating Elements Design",
        "OIS",
      ],
    },
  ];

  cameraData.forEach((camera, index) => {
    const box = document.createElement("div");
    box.classList.add("camera-box");
  
    const title = document.createElement("h5");
    title.classList.add("sub-title");
    title.innerHTML = camera.title;
  
    box.appendChild(title);
  
    camera.descriptions.forEach((desc) => {
      const descDiv = document.createElement("div");
      descDiv.classList.add("description");
      descDiv.innerHTML = desc;
      box.appendChild(descDiv);
    });
  
    // Add the box to the container with a delay
    setTimeout(() => {
      // Hide the previous box, if any
      const existingBox = document.querySelector(".camera-box.visible");
      if (existingBox) {
        existingBox.classList.remove("visible");
        setTimeout(() => existingBox.remove(), 500); // Remove after fade-out animation
      }
  
      // Append and show the current box
      container.appendChild(box);
      setTimeout(() => {
        box.classList.add("visible");
      }, 100); // Small delay to trigger CSS transition
    }, index * 3000); // 2.5 seconds delay between boxes
  });
  

  modelViewer.play();
});

// 360° view for Battery
batteryBox.addEventListener("click", () => {
  modelViewer.src = "./modal/vivo50_battery.glb"; 
  modelViewer.setAttribute("camera-orbit", "-50deg 75deg 2.86m"); 
  modelViewer.setAttribute("min-camera-orbit", "auto auto auto"); 
  modelViewer.setAttribute("max-camera-orbit", "auto auto auto");
  modelViewer.autoRotateEnabled = false; 

  if (!backpanel.classList.contains("active")) {
    backpanel.classList.add("active");
  } else {
    backpanel.classList.remove("active");
    backpanel.style.display = "none"; 
  }

  first.style.display = "none";
  container.style.display = "none";

  modelViewer.play();
});

// CAMERA SCRIPTS

const carrosseis = document.querySelectorAll(".carrossel");

for (const carrossel of carrosseis) {
  const controle = carrossel.querySelector(".control");
  const modal = carrossel.querySelector(".modal");
  const prev = carrossel.querySelector(".prev");
  const next = carrossel.querySelector(".next");
  const slider = carrossel.querySelector(".slider");
  const indicator = carrossel.querySelector(".indicator ");
  const indicatorRoll = carrossel.querySelector(".indicator .roll");
  let index = 0;

  slider.addEventListener("click", function () {
    controle.classList.add("active");
  });

  modal.addEventListener("click", function () {
    controle.classList.remove("active");
  });

  prev.addEventListener("click", function () {
    prevSlide();
    updateCircleIndicator();
    scrollIndicator();
    resetTimer();
  });

  next.addEventListener("click", function () {
    nextSlide();
    updateCircleIndicator();
    scrollIndicator();
    resetTimer();
  });

  function prevSlide() {
    if (index == 0) {
      index = slider.children.length - 1;
    } else {
      index--;
    }
    changeSlide();
  }

  function nextSlide() {
    if (index == slider.children.length - 1) {
      index = 0;
    } else {
      index++;
    }
    changeSlide();
  }

  /* Criando um array das imagens de cada slider */
  let imagens = [];
  for (const i of slider.querySelectorAll("img")) {
    imagens.push({src: i.src, alt: i.alt, title: i.title});
  }

  // create circle indicators
  function circleIndicator() {
    for (let i = 0; i < slider.children.length; i++) {
      const div = document.createElement("div");
      div.innerHTML = `<img id="${i}"  src="${imagens[i].src}"  alt="${imagens[i].alt}" tittle="${imagens[i].title}" />`;
      div.addEventListener("click", function () {
        indicateSlide(this);
        scrollIndicator();
      });
      div.id = i;
      if (i == 0) {
        div.className = "active";
      }
      indicatorRoll.appendChild(div);
    }
  }
  circleIndicator();

  function updateCircleIndicator() {
    for (const i of indicatorRoll.children) {
      i.classList.remove("active");
    }
    indicatorRoll.children[index].classList.add("active");
  }

  function changeSlide() {
    for (const i of slider.children) {
      i.classList.remove("active");
    }
    slider.children[index].classList.add("active");
  }

  function indicateSlide(element) {
    index = element.id;
    changeSlide();
    updateCircleIndicator();
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoPlay, 4000);
  }

  function scrollIndicator() {
    var imageIndicator = carrossel.querySelector(".indicator .roll div")
      .offsetWidth;
    indicator.scrollLeft =
      indicatorRoll.children[index].id * imageIndicator - imageIndicator / 2;
  }

  function autoPlay() {
    nextSlide();
    updateCircleIndicator();
    scrollIndicator();
  }

  let timer = setInterval(autoPlay, 4000);
}

const imgPlantas = document.querySelectorAll(".imagemLocal");

for (const imgPlanta of imgPlantas) {
  const imagemPlanta = imgPlanta.querySelector(".imagem");
  const modalPlanta = imgPlanta.querySelector(".modalPlanta");

  imagemPlanta.addEventListener("click", function () {
    imgPlanta.classList.add("active");
  });

  modalPlanta.addEventListener("click", function () {
    imgPlanta.classList.remove("active");
    console.log(imgPlanta.classList);
  });
}

const ano = new Date().getFullYear();
document.getElementById("ano").innerHTML = ano;

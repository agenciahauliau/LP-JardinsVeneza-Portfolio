'use strict';
const carrosseis = document.querySelectorAll('.carrossel');

for (const carrossel of carrosseis) {
	const controle = carrossel.querySelector('.control');
	const modal = carrossel.querySelector('.modal');
	const prev = carrossel.querySelector('.prev');
	const next = carrossel.querySelector('.next');
	const slider = carrossel.querySelector('.slider');
	const indicator = carrossel.querySelector('.indicator ');
	const indicatorRoll = carrossel.querySelector('.indicator .roll');
	let index = 0;

	slider.addEventListener('click', function () {
		controle.classList.add('active');
	});

	modal.addEventListener('click', function () {
		controle.classList.remove('active');
	});

	prev.addEventListener('click', function () {
		prevSlide();
		updateCircleIndicator();
		scrollIndicator();
		resetTimer();
	});

	next.addEventListener('click', function () {
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
	for (const i of slider.querySelectorAll('img')) {
		imagens.push({ width: i.width, height: i.height, src: i.src, alt: i.alt, title: i.title });
	}

	// create circle indicators
	function circleIndicator() {
		for (let i = 0; i < slider.children.length; i++) {
			const div = document.createElement('div');
			div.innerHTML = `<img id="${i}" width="${imagens[i].width}" height="${imagens[i].height}"  src="${imagens[i].src}"  alt="${imagens[i].alt}" tittle="${imagens[i].title}" />`;
			div.addEventListener('click', function () {
				indicateSlide(this);
				scrollIndicator();
			});
			div.id = i;
			if (i == 0) {
				div.className = 'active';
			}
			indicatorRoll.appendChild(div);
		}
	}
	circleIndicator();

	function updateCircleIndicator() {
		for (const i of indicatorRoll.children) {
			i.classList.remove('active');
		}
		indicatorRoll.children[index].classList.add('active');
	}

	function changeSlide() {
		for (const i of slider.children) {
			i.classList.remove('active');
		}
		slider.children[index].classList.add('active');
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
		var imageIndicator = carrossel.querySelector('.indicator .roll div').offsetWidth;
		indicator.scrollLeft = indicatorRoll.children[index].id * imageIndicator - imageIndicator / 2;
	}

	function autoPlay() {
		nextSlide();
		updateCircleIndicator();
		scrollIndicator();
	}

	let timer = setInterval(autoPlay, 4000);
}

//modal plantas

const imgPlantas = document.querySelectorAll('.imagemLocal');

for (const imgPlanta of imgPlantas) {
	const imagemPlanta = imgPlanta.querySelector('.imagem');
	const modalPlanta = imgPlanta.querySelector('.modalPlanta');

	imagemPlanta.addEventListener('click', function () {
		imgPlanta.classList.add('active');
	});

	modalPlanta.addEventListener('click', function () {
		imgPlanta.classList.remove('active');
		console.log(imgPlanta.classList);
	});
}

//adiciona ano

const ano = new Date().getFullYear();
document.getElementById('ano').innerHTML = ano;

// Envia email

async function enviar() {
	const url = window.location.hostname.replace(/^[^/]*\/\/\w+.|(www.)/g, '');
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	let contatoPor = async () => {
		let resp = [];
		if (document.querySelector('#formCheck-1').checked) resp.push('WhatsApp');
		if (document.querySelector('#formCheck-2').checked) resp.push('Ligação');
		if (document.querySelector('#formCheck-3').checked) resp.push('Email');
		return await `${resp.filter((el) => el != null)}`;
	};

	let raw = JSON.stringify({
		de: `site@${url}`,
		para: ['cristiane@portfolioimoveis.com.br','mkt@hi4u.me'],
		assunto: `Solciitação de contato pelo formulário do site ${url}`,
		mensagem: `Novo contato do site ${url}\n\nNome: ${document.querySelector('input[type="name"]').value}\n\nEmail: ${
			document.querySelector('input[type="email"]').value
		}\n\nTelefone: ${
			document.querySelector('input[type="tel"]').value
		}\n\nPreferência de contato por: ${await contatoPor()}`,
	});

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
	};

	return await fetch('https://services.rangell.com.br/v1/enviar', requestOptions)
		.then((response) => response.text())
		.then((result) => {
			console.log(result);
			window.alert('Dados enviados. Obrigado, em breve entraremos em contato');
			document.querySelector('input[type="name"]').value = '';
			document.querySelector('input[type="email"]').value = '';
			document.querySelector('input[type="tel"]').value = '';
		})
		.catch((error) => {
			console.log('error', error);
			window.alert(
				'Algum dado está faltando ou um erro inesperado aconteceu, revise os dados ou recarregue a página e tente novamente.'
			);
		});
}

async function executaEnvio() {
	document.querySelector('#botao').disabled = true;
	await enviar();
	document.querySelector('#botao').disabled = false;
}

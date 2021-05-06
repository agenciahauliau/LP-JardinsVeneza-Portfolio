var CACHE_VERSION = 1,
	CURRENT_CACHES = { font: 'font-cache-v' + CACHE_VERSION };
self.addEventListener('activate', function (e) {
	var t = Object.keys(CURRENT_CACHES).map(function (e) {
		return CURRENT_CACHES[e];
	});
	e.waitUntil(
		caches.keys().then(function (e) {
			return Promise.all(
				e.map(function (e) {
					if (-1 == t.indexOf(e)) return console.log('Deletando cache expirado:', e), caches.delete(e);
				})
			);
		})
	);
}),
	self.addEventListener('fetch', function (e) {
		console.log('Obtendo evento fetch para', e.request.url),
			e.respondWith(
				caches.open(CURRENT_CACHES.font).then(function (t) {
					return t
						.match(e.request)
						.then(function (e) {
							if (e) return console.log(' Encontrou resposta em cache:', e), e;
						})
						.catch(function (e) {
							throw (console.error('  Erro na handler:', e), e);
						});
				})
			);
	}),
	window.addEventListener('scroll', (e) => {
		this.scrollY < 60
			? document.querySelector('header').classList.remove('topoPequeno')
			: document.querySelector('header').classList.add('topoPequeno');
	});
let currentSlide = 0;
const slides = document.querySelectorAll('.slider div'),
	dots = document.querySelectorAll('.dot'),
	init = (e) => {
		slides.forEach((e, t) => {
			(e.style.display = 'none'),
				dots.forEach((e, t) => {
					e.classList.remove('active');
				});
		}),
			(slides[e].style.display = 'block'),
			dots[e].classList.add('active');
	};
document.addEventListener('DOMContentLoaded', init(currentSlide));
const next = () => {
		currentSlide >= slides.length - 1 ? (currentSlide = 0) : currentSlide++, init(currentSlide);
	},
	prev = () => {
		currentSlide <= 0 ? (currentSlide = slides.length - 1) : currentSlide--, init(currentSlide);
	};
async function enviar() {
	const e = window.location.hostname.replace(/^[^\/]*\/\/\w+.|(www.)/g, ''),
		t = new Headers();
	t.append('Content-Type', 'application/json');
	const n = {
		method: 'POST',
		headers: t,
		body: JSON.stringify({
			de: `site@${e}`,
			para: ['contato@defesasdemultas.com.br', 'mkt@hi4u.me'],
			assunto: `Solcilitação de contato pelo formulário do site ${e}`,
			mensagem: `Novo contato do site\n\nNome: ${document.getElementById('nome').value}\n\nEmail: ${
				document.getElementById('email').value
			}\n\nTelefone: ${document.getElementById('telefone').value}\n\nInfração: ${
				document.getElementById('infracao').value
			}\n\nCaso: ${document.getElementById('descricao').value}`,
		}),
	};
	return await fetch('https://services.rangell.com.br/v1/enviar', n)
		.then((e) => e.text())
		.then((e) => {
			console.log(e),
				window.alert('Dados enviados. Obrigado, em breve entraremos em contato'),
				(document.getElementById('nome').value = ''),
				(document.getElementById('email').value = ''),
				(document.getElementById('telefone').value = ''),
				(document.getElementById('infracao').value = ''),
				(document.getElementById('descricao').value = '');
		})
		.catch((e) => {
			console.log('error', e),
				window.alert(
					'Algum dado está faltando ou um erro inesperado aconteceu, revise os dados ou recarregue a página e tente novamente.'
				);
		});
}
async function executaEnvio() {
	(document.querySelector('#botao').disabled = !0), await enviar(), (document.querySelector('#botao').disabled = !1);
}
document.querySelector('.next').addEventListener('click', next),
	document.querySelector('.prev').addEventListener('click', prev),
	setInterval(() => {
		next();
	}, 7500),
	dots.forEach((e, t) => {
		e.addEventListener('click', () => {
			console.log(currentSlide), init(t), (currentSlide = t);
		});
	});

// window.addEventListener("scroll", (event) => { let scroll = this.scrollY; if (scroll < 60) { document.querySelector("header").classList.remove("topoPequeno"); } else { document.querySelector("header").classList.add("topoPequeno"); } }); let currentSlide = 0; const slides = document.querySelectorAll(".slider div"); const dots = document.querySelectorAll(".dot"); const init = (n) => { slides.forEach((slide, index) => { slide.style.display = "none"; dots.forEach((dot, index) => { dot.classList.remove("active"); }); }); slides[n].style.display = "block"; dots[n].classList.add("active"); }; document.addEventListener("DOMContentLoaded", init(currentSlide)); const next = () => { currentSlide >= slides.length - 1 ? (currentSlide = 0) : currentSlide++; init(currentSlide); }; const prev = () => { currentSlide <= 0 ? (currentSlide = slides.length - 1) : currentSlide--; init(currentSlide); }; document.querySelector(".next").addEventListener("click", next); document.querySelector(".prev").addEventListener("click", prev); setInterval(() => { next(); }, 7500); dots.forEach((dot, i) => { dot.addEventListener("click", () => { console.log(currentSlide); init(i); currentSlide = i; }); }); async function enviar() { const url = window.location.hostname.replace(/^[^/]*\/\/\w+.|(www.)/g, ""); const myHeaders = new Headers(); myHeaders.append("Content-Type", "application/json"); let raw = JSON.stringify({ de: `site@${url}`, para: ["contato@defesasdemultas.com.br", "mkt@hi4u.me"], assunto: `Solcilitação de contato pelo formulário do site ${url}`, mensagem: `Novo contato do site\n\nNome: ${document.getElementById("nome").value}\n\nEmail: ${document.getElementById("email").value}\n\nTelefone: ${document.getElementById("telefone").value}\n\nInfração: ${document.getElementById("infracao").value}\n\nCaso: ${document.getElementById("descricao").value}`, }); const requestOptions = { method: "POST", headers: myHeaders, body: raw }; return await fetch("https://services.rangell.com.br/v1/enviar", requestOptions).then((response) => response.text()).then((result) => { console.log(result); window.alert("Dados enviados. Obrigado, em breve entraremos em contato"); document.getElementById("nome").value = ""; document.getElementById("email").value = ""; document.getElementById("telefone").value = ""; document.getElementById("infracao").value = ""; document.getElementById("descricao").value = ""; }).catch((error) => { console.log("error", error); window.alert("Algum dado está faltando ou um erro inesperado aconteceu, revise os dados ou recarregue a página e tente novamente."); }); } async function executaEnvio() { document.querySelector("#botao").disabled = true; await enviar(); document.querySelector("#botao").disabled = false; }

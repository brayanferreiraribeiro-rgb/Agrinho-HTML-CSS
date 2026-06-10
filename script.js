        function voltarParaInicio() {
            document.getElementById('tela-detalhes').classList.remove('tela-ativa');
            document.getElementById('tela-principal').classList.add('tela-ativa');
        }

        const conselhostecnicos = [
            "Mantenha o arco de desinfecção de veículos sempre ativo na entrada da granja.",
            "Troque a água dos niples regularmente para evitar a formação de biofilme.",
            "Controle rigorosamente a umidade e compactação da cama do galpão.",
            "A vacinação em dia previne quebras severas e protege o plantel regional."
        ];

        document.getElementById('btn-conselho').addEventListener('click', function() {
            const indiceAleatorio = Math.floor(Math.random() * conselhostecnicos.length);
            alert("🚨 ALERTA TÉCNICO: " + conselhostecnicos[indiceAleatorio]);
        });

        const configToggle = document.getElementById('configToggle');
        const configPanel = document.getElementById('configPanel');
        const btnFonte = document.getElementById('btnFonte');
        const fontControls = document.getElementById('fontControls');
        const btnAumentarTexto = document.getElementById('btnAumentarTexto');
        const btnDiminuirTexto = document.getElementById('btnDiminuirTexto');
        const btnLerPagina = document.getElementById('btnLerPagina');

        let textoTamanhoAtual = 16;

        configToggle.addEventListener('click', function(event) {
            event.preventDefault();
            configPanel.classList.toggle('visible');
            if (!configPanel.classList.contains('visible')) {
                fontControls.style.display = 'none';
            }
        });

        btnFonte.addEventListener('click', function(event) {
            event.preventDefault();
            fontControls.style.display = (fontControls.style.display === 'block') ? 'none' : 'block';
        });

        btnAumentarTexto.addEventListener('click', function() {
            textoTamanhoAtual = Math.min(28, textoTamanhoAtual + 2);
            document.body.style.fontSize = textoTamanhoAtual + 'px';
        });

        btnDiminuirTexto.addEventListener('click', function() {
            textoTamanhoAtual = Math.max(12, textoTamanhoAtual - 2);
            document.body.style.fontSize = textoTamanhoAtual + 'px';
        });

        let isSpeaking = false;
        let isPaused = false;
        let utterance = null;

        btnLerPagina.addEventListener('click', function() {
            const textoCompleto = document.body.innerText.replace(/\s+/g, ' ').trim();
            if (!textoCompleto) {
                alert('Não há texto disponível para leitura.');
                return;
            }
            if (!('speechSynthesis' in window)) {
                alert('Seu navegador não suporta leitura em voz alta.');
                return;
            }

            if (!isSpeaking) {
                // iniciar leitura
                window.speechSynthesis.cancel();
                utterance = new SpeechSynthesisUtterance(textoCompleto);
                utterance.lang = 'pt-BR';
                utterance.rate = 1;
                utterance.pitch = 1;
                utterance.onend = function() {
                    isSpeaking = false;
                    isPaused = false;
                    utterance = null;
                    btnLerPagina.innerText = 'Ler Página';
                };
                window.speechSynthesis.speak(utterance);
                isSpeaking = true;
                isPaused = false;
                btnLerPagina.innerText = 'Pausar';
            } else if (isSpeaking && !isPaused) {
                // pausar
                window.speechSynthesis.pause();
                isPaused = true;
                btnLerPagina.innerText = 'Continuar';
            } else if (isSpeaking && isPaused) {
                // continuar
                window.speechSynthesis.resume();
                isPaused = false;
                btnLerPagina.innerText = 'Pausar';
            }
            });
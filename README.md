# Brilho & Splash!

> Gabriel Bisso e Maria Virginia Souza
> Uma coleção de minigames educativos e interativos para ensinar hábitos de higiene e organização para crianças de forma divertida.


## Sobre o Projeto

**Brilho & Splash!** é uma aplicação web desenvolvida para auxiliar no aprendizado de crianças com deficiências cognitivas leves a moderadas sobre rotinas diárias, hábitos de higiene e atividades domésticas. Através de uma interface lúdica, colorida e animada, as crianças realizam tarefas como escovar os dentes, tomar banho, lavar as mãos e organizar o quarto. O projeto foi construído focado em simplicidade de execução, sem instalação complexa.

## Minigames Disponíveis

O projeto conta com 6 minigames distintos:

1.  **🚿 Hora de Nadar:** Use a esponja para remover a sujeira do personagem até atingir 100% de limpeza.
2.  **🛏️ Ache o Erro:** Clique nos travesseiros e lençóis bagunçados para deixar a cama perfeitamente organizada.
3.  **🧸 Faz de Conta:** Salve a sala da bagunça clicando nos brinquedos espalhados para guardá-los na caixa antes que a barra do vilão se encha.
4.  **🧺 Conversa com a Meia-Falante:** Um jogo de agilidade para separar roupas limpasdas roupas sujas.
5.  **🦷 Corrida Contra o Tempo:** Use o mouse como escova para limpar os dentes e clique nos germes para eliminá-los antes que o tempo acabe.
6.  **👐 Laboratório das Mãos:** Um passo a passo interativo ensinando a sequência correta de lavar as mãos (água, sabão, esfregar, enxaguar e secar).

## Tecnologias Utilizadas

* **HTML5:** Estrutura semântica do projeto.
* **CSS3 (Tailwind CSS):** Estilização rápida, responsiva e moderna via CDN.
* **JavaScript (Vanilla):** Lógica de todos os minigames, manipulação do DOM e animações.
* **Google Fonts:** Tipografias *Fredoka* e *Poppins* para um visual infantil e amigável.

## Estrutura de Arquivos

Para que o jogo funcione perfeitamente, a estrutura de pastas deve ser a seguinte:

```text
/
├── index.html        # Arquivo principal com HTML e CSS
├── script.js         # Lógica do jogo
├── icons/            # Pasta contendo as imagens (Necessário adicionar)
│   ├── fundo_brilho_splash.png
│   ├── dr.sol_e_lupinha.png
│   ├── banho.png
│   ├── cama.png
│   ├── ... (outros ícones referenciados no código)
└── README.md

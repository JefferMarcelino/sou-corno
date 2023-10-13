const form = document.getElementById('multistep-form');
const message = document.getElementById('message');

let currentStep = 0;

const steps = document.querySelectorAll('.step');
const nextButtons = document.querySelectorAll('[id^="next"]');
const submitButton = document.getElementById('submit');
const resultImage = document.getElementById('resultImage');

const names = `
<div id="names">
  <p>Hummm... começaste mal, até és o primeiro na lista 😭</p>
  <h3>Lista dos cornos</h3>
  <ul>
    user_name
    <li>José</li>
    <li>João</li>
    <li>Manuel</li>
    <li>Edmílson</li>
    <li>Shelton</li>
  </ul>
</div>
`;

const messages = [
  names,
  "<p><strong>Ok, né, achas que são bests? Tá bem... continua a responder</strong></p>",
  "<p><strong>Sério, bro? Acho que já sabes a resposta, mas ok, continua a responder.</p></strong>",
  "<p><strong>Espera, isso é uma relação de quantas pessoas? Mais de 3?</p></strong>",
  "<p><strong>Os cornos sempre são os últimos a saber...</p></strong>",
];

let userName = "";

nextButtons.forEach((button, index) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    let messageToShow = messages[currentStep];

    steps[currentStep].style.display = 'none';

    currentStep++;

    if (steps[currentStep]) {
      steps[currentStep].style.display = 'block';
    };

    if (currentStep === steps.length) {
      const canvas = document.createElement('canvas');

      const imageAspectRatio = 685 / 913;
      canvas.width = 400;
      canvas.height = canvas.width / imageAspectRatio;
      
      const context = canvas.getContext('2d');

      const image = new Image();
      image.src = 'images/image.webp';
      image.onload = function () {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        context.font = '48px Arial';
        context.fillStyle = 'black';

        const textWidth = context.measureText(userName).width;

        const xCoordinate = (canvas.width / 2) - (textWidth / 2);

        context.fillText(userName, xCoordinate, 60);

        resultImage.src = canvas.toDataURL('image/png');
      };

      resultImage.style.display = 'block';
    };

    const currentStepElement = steps[currentStep - 1];
    const inputElement = currentStepElement.querySelector("input");
    const selectElement = currentStepElement.querySelector("select");

    const value = inputElement ? inputElement.value : selectElement ? selectElement.value : "";

    switch (index) {
      case 0: {
        userName = value;
  
        messageToShow = messageToShow.replace(
          "user_name",
          `<li style="font-weight: bold;">${userName}</li>`
        );

        break;
      }

      case index > 0: {
        if (value !== "sim") {
          messageToShow = "";
        };

        break;
      }

      default: {
        break;;
      }
    };

    message.innerHTML = messageToShow;
  });
});

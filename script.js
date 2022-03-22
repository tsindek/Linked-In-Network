/*todo
- helper function for mutual connections
--> when just 1 then logo
--> when more -> two rings symbol + n + "mutual connections"

-helper function for background image
--> when no bg image -> default image
--> when image -> use image
*/

/*for (let i = 0; i <= 7; i++) {
  getPersonData();
}*/

const cardList = document.querySelector(".card-list");

let personData = [];
let personCount = 8;

getPersonData(personCount);

function getPersonData(personCount) {
  fetch(
    "https://dummy-apis.netlify.app/api/contact-suggestions?count=" +
      personCount
  )
    .then((res) => res.json())
    .then((data) => (personData = data))
    .then(() => personData.forEach((element) => createPersonCard(element)));
}

function setAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function createPersonCard(personData) {
  const personCard = document.createElement("li");
  personCard.setAttribute("class", "person-card");

  const personPicture = getPersonPicture(personData);
  const personName = getPersonName(personData);
  const personTitle = getPersonTitle(personData);
  const mutualConnections = getMutualConnections(personData);
  const connectButton = addConnectButton();
  const removeButton = addRemoveButton();

  personCard.style.backgroundImage = `url("${personData.backgroundImage}"), url("./images/profile_bg_image_default.png")`;

  personCard.append(
    personPicture,
    personName,
    personTitle,
    mutualConnections,
    connectButton,
    removeButton
  );

  cardList.appendChild(personCard);
}

function getPersonPicture(personData) {
  const personPicture = document.createElement("img");
  setAttributes(personPicture, {
    src: personData.picture,
    class: "person__picture",
    alt: "profile picture",
  });
  return personPicture;
}

function getPersonName(personData) {
  const personName = document.createElement("h3");
  personName.innerText = personData.name.first + "  " + personData.name.last;
  personName.setAttribute("class", "person__name");
  return personName;
}

function getPersonTitle(personData) {
  const personTitle = document.createElement("h4");
  personTitle.innerText = personData.title;
  personTitle.setAttribute("class", "person__title");
  return personTitle;
}

function getMutualConnections(personData) {
  const mutualConnections = document.createElement("p");
  mutualConnections.innerText =
    personData.mutualConnections + " mutual connections";
  return mutualConnections;
}

function addConnectButton() {
  const connectButton = document.createElement("button");
  connectButton.setAttribute("class", "connect-button");
  connectButton.innerText = "Connect";
  return connectButton;
}

function addRemoveButton() {
  const removeButton = document.createElement("button");
  removeButton.setAttribute("class", "remove-button");
  removeButton.innerText = "X";
  removeButton.addEventListener("click", function (event) {
    //warum kann ich nicht einfach ("click", removeCard(event)) schreiben?
    removeCard(event);
  });
  return removeButton;
}

function removeCard(event) {
  cardList.removeChild(event.target.parentElement);
  getPersonData(1);
}

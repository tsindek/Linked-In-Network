/*todo
- helper function for mutual connections
--> when more -> two rings symbol + n + "mutual connections"

-helper function for background image
--> when no bg image -> default image
--> when image -> use image
*/

const cardList = document.querySelector(".card-list");

let personData = [];
let numberOfInvitations = 0;

getStoredNumberOfInvitations();
function getStoredNumberOfInvitations() {
  const inivitationsNumber = JSON.parse(
    localStorage.getItem("numberOfInvitations")
  );
  numberOfInvitations = inivitationsNumber;
}
getPersonData(8);
renderPendingInvitations(numberOfInvitations);

function renderPendingInvitations(numberOfInvitations) {
  const pendingInvitationsText = document.querySelector(
    "#pending-invitations__text"
  );
  if (numberOfInvitations === 0) {
    pendingInvitationsText.innerText = "No pending invitations";
  } else if (numberOfInvitations > 0) {
    pendingInvitationsText.innerText = `${numberOfInvitations} pending Invitations`;
  }
  storeNumberOfInvitations(numberOfInvitations);
}

function getPersonData(personCount) {
  fetch(
    "https://dummy-apis.netlify.app/api/contact-suggestions?count=" +
      personCount
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
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
  connectButton.addEventListener("click", connectWithPerson);
  return connectButton;
}

function addRemoveButton() {
  const removeButton = document.createElement("button");
  removeButton.setAttribute("class", "remove-button");
  removeButton.innerText = "X";
  removeButton.addEventListener("click", removeCard);
  return removeButton;
}

function removeCard(event) {
  cardList.removeChild(event.target.parentElement);
  getPersonData(1);
}

function connectWithPerson(event) {
  const button = event.target;
  if (button.innerText === "Connect") {
    button.innerText = "Pending";
    numberOfInvitations++;
    renderPendingInvitations(numberOfInvitations);
  } else if (button.innerText === "Pending") {
    button.innerText = "Connect";
    numberOfInvitations--;
    renderPendingInvitations(numberOfInvitations);
  }
  renderPendingInvitations(numberOfInvitations);
}

function storeNumberOfInvitations(numberOfInvitations) {
  localStorage.setItem(
    "numberOfInvitations",
    JSON.stringify(numberOfInvitations)
  );
}

let userData = [];

const dateParser = (date) => {
  const newDateParse = new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return newDateParse;
};

const dayCalculs = (date) => {
  let today = new Date();
  let todayTimestamp = Date.parse(today);
  let timestamp = Date.parse(date);

  return Math.ceil((todayTimestamp - timestamp) / 8.64e7);
};

const fetchData = async () => {
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((data) => (userData = data.results));
};

const userDisplay = async () => {
  await fetchData();

  document.body.innerHTML = userData
    .map(
      (user) =>
        `
          <div class="card">
            <img src=${user.picture.large}>
            <h3>${user.name.first} ${user.name.last}</h3>
            <p>${user.location.city}, ${dateParser(user.dob.date)}</p>
            <em>Membre depuis : ${dayCalculs(user.registered.date)} jours</em>
          </div>
        `
    )
    .join("");
};

userDisplay();

const API_KEY = "$2b$10$CZt7ltqtf7n5YtsT097M4.AGaB58sIoKEafkw22vKIcNxTystSMmu"; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";
const url = "https://api.jsonbin.io/v3/b/601860c25415b40ac220fd6f";

// Gets data from persistent storage by the given key and returns it
function getPersistent() {
  const init = {
    method: "GET",
  };

  const request = new Request(url + "/latest", init);
  const loader = document.querySelector(".loader");
  loader.style.visibility = "visible";
  loader.hidden = false;
  return fetch(request)
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      loader.style.visibility = "hidden";

      return body.record["my-todo"];
    });
}

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
function setPersistent(key, data) {
  const sendObject = {};
  sendObject[key] = data;

  const dataString = JSON.stringify(sendObject);
  const init = {
    method: "PUT",
    body: dataString,
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
      "X-Bin-Versioning": false,
    },
  };
  const request = new Request(url, init);
  const loader = document.querySelector(".loader");
  loader.style.visibility = "visible";

  return fetch(request).then((response) => {
    loader.style.visibility = "hidden";
    return response.ok;
  });
}

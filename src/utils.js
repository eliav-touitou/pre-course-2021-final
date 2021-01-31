const API_KEY = ""; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";
const url = "https://api.jsonbin.io/v3/b/6016dc73abdf9c5567957a5f";

// Gets data from persistent storage by the given key and returns it
async function getPersistent() {
  const init = {
    method: "GET",
  };

  const request = new Request(url + "/latest", init);
  const response = await fetch(request);
  const body = await response.json();
  return body.record["my-todo"];
}

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
async function setPersistent(data) {
  const dataObject = {
    "my-todo": data,
  };
  const init = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObject),
  };
  const request = new Request(url, init);
  const response = await fetch(request);
  return response.ok;
}

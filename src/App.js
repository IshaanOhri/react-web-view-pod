import logo from "./logo.svg";
import "./App.css";
import {
  login,
  handleIncomingRedirect,
  fetch,
  getDefaultSession,
  onLogin,
} from "@inrupt/solid-client-authn-browser";

function App() {
  // Function to handle incoming redirects
  // Catches the data sent from the Inrupt client and stores it in local storage
  handleIncomingRedirect({
    url: window.location.href,
    restorePreviousSession: true,
  });

  // Function which is called after the login process of inrupt is completed
  // Stores `webId` into session storage
  // Sets `podStatus` to `true` in the session storage
  onLogin(() => {
    const profileDocumentUrl = new URL(getDefaultSession().info.webId);
    const webId = profileDocumentUrl.origin;

    sessionStorage.setItem("webId", webId);
    sessionStorage.setItem("podStatus", true);
    document.getElementById("webID").innerHTML = webId;
    window.location.href = "/";
  });

  // Function definition for signing into POD
  // Initiates the Inrupt login process with the POD provider
  const signInPOD = () => {
    login({
      redirectUrl: window.location.href,
      oidcIssuer: "https://inrupt.net",
      clientName: "Google Fit POD",
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button
          onClick={() => {
            signInPOD();
          }}
        >
          Login
        </button>
        <p id="webID">{sessionStorage.getItem('webId')}</p>
      </header>
    </div>
  );
}

export default App;

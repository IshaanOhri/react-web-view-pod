import logo from "./logo.svg";
import "./App.css";
import {
  login,
  handleIncomingRedirect,
  fetch,
  getDefaultSession,
  onLogin,
} from "@inrupt/solid-client-authn-browser";
import GoogleLogin from "react-google-login";

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

  const responseGoogle = (googleUser) => {
    console.log(googleUser);
    sessionStorage.setItem("googleUserDetails", JSON.stringify(googleUser));
    // window.location.href = "/dashboard";
  };

  return (
    <div className="App">
      <header className="App-header">
        <GoogleLogin
          className="check"
          clientId="950311351563-ehj50jsqhnacs05u8m45lrlravs56982.apps.googleusercontent.com"
          buttonText="Sign In"
          onSuccess={responseGoogle}
          onFailure={() => {
            console.log("Google error");
          }}
          cookiePolicy={"single_host_origin"}
          theme="dark"
          scope="https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.body_temperature.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read https://www.googleapis.com/auth/fitness.reproductive_health.read https://www.googleapis.com/auth/fitness.sleep.read"
        />

        <button
          onClick={() => {
            signInPOD();
          }}
        >
          Login
        </button>
        <p id="webID">{sessionStorage.getItem("webId")}</p>
        <p id="googleUser">{sessionStorage.getItem("googleUserDetails")}</p>
      </header>
    </div>
  );
}

export default App;

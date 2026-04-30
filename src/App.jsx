import { useState } from "react";
import Login from "./modules/auth/pages/Login.jsx";
import ChoosePlan from "./modules/auth/pages/ChoosePlan.jsx";
import RegisterForm from "./modules/auth/pages/RegisterFrom.jsx";
import BankSetup from "./modules/auth/pages/BankSetup.jsx";

function App() {
  const [screen, setScreen] = useState("login"); 
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);

  if (screen === "choose-plan") {
    return (
      <ChoosePlan
        onContinue={(planData) => {
          setSelectedPlan(planData);
          setScreen("register"); 
        }}
        onSignIn={() => setScreen("login")}
      />
    );
  }

  if (screen === "register") return (
    <RegisterForm 
      planData={selectedPlan} 
      onBack={() => setScreen("choose-plan")}
      onSubmit={(formData) => {
        console.log("Registration submitted:", formData);
        setRegistrationData(formData);
        setScreen("bank-setup");
      }}
    />
  );

  if (screen === "bank-setup") {
    return (
      <BankSetup
        registrationData={registrationData}
        onBack={() => setScreen("register")}
        onComplete={(bankData) => {
          console.log("Bank setup completed:", bankData);
          // Continue to next screen after bank setup
        }}
      />
    );
  }

  return <Login onSignUp={() => setScreen("choose-plan")} />;
}

export default App;
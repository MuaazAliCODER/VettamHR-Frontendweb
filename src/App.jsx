import { useState } from "react";
import Login from "./modules/auth/pages/Login.jsx";
import ChoosePlan from "./modules/auth/pages/ChoosePlan.jsx";
import RegisterForm from "./modules/auth/pages/RegisterFrom.jsx";

function App() {
  const [screen, setScreen] = useState("login"); 
  const [selectedPlan, setSelectedPlan] = useState(null);

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
      }}
    />
  );

  return <Login onSignUp={() => setScreen("choose-plan")} />;
}

export default App;
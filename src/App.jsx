import { useState } from "react";
import Login from "./modules/auth/pages/Login.jsx";
import ChoosePlan from "./modules/auth/pages/ChoosePlan.jsx";
import RegisterForm from "./modules/auth/pages/RegisterFrom.jsx";
import RegistrationSuccess from "./modules/auth/pages/RegistrationSuccess.jsx";
import BankSetup from "./modules/auth/pages/BankSetup.jsx";
import DashboardLayout from "./modules/Dashboard/DashboardLayout.jsx";

function App() {
  const [screen, setScreen] = useState("login"); 
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleLoginSuccess = (user) => {
    setUserData(user);
    setScreen("dashboard");
  };

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
          setScreen("registration-success");
        }}
      />
    );
  }

  if (screen === "registration-success") {
    return (
      <RegistrationSuccess
        registrationData={registrationData}
        onContinue={() => {
          // Combine registration and bank data
          const completeUserData = {
            ...registrationData,
            companyName: registrationData.companyName,
            email: registrationData.email,
            plan: registrationData.planData?.plan || "Professional",
            billingCycle: registrationData.planData?.billingCycle || "Monthly"
          };
          setUserData(completeUserData);
          setScreen("dashboard");
        }}
      />
    );
  }

  if (screen === "dashboard") {
    console.log("Rendering dashboard with userData:", userData);
    return (
      <DashboardLayout
        user={userData}
        onSignOut={() => {
          setScreen("login");
          setUserData(null);
          setRegistrationData(null);
          setSelectedPlan(null);
        }}
      />
    );
  }

  return (
    <Login 
      onSignUp={() => setScreen("choose-plan")}
      onLoginSuccess={handleLoginSuccess}
    />
  );
}

export default App;
// Dummy credentials for demo
const DEMO_CREDENTIALS = {
  email: "crymzee@test.com",
  password: "Crymzee@12"
};

export const loginUser = async (data) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Validate dummy credentials
  if (data.email === DEMO_CREDENTIALS.email && data.password === DEMO_CREDENTIALS.password) {
    return {
      success: true,
      user: {
        email: data.email,
        companyName: "Crymzee Solutions",
        plan: "Professional",
        billingCycle: "Monthly"
      }
    };
  }

  throw new Error("Invalid email or password");
};
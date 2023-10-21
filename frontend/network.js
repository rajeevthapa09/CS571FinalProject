export default {};

export async function mysignup(name, phone, email, password, address) {
  try {
    const uri = "http://127.0.0.1:5001/signup";
    const requestBody = {
      name,
      phone,
      email,
      password,
      address,
    };
    const result = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const data = await result.json();
    console.log(data);
    if (data.success && data) {
      console.log("User registered successfully");
      return data;
    } else {
      console.error("Error registering user:");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
export async function myLogin(email, password) {
  try {
    const uri = "http://127.0.0.1:5001/SignIn";
    const result = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await result.json();
    console.log(data);
    return data;
  } catch (error) {
    return null;
  }
}

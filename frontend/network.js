export default {};

export async function signup(name, phone, email, password, address) {
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
      headers: "Content-Type': 'application/json",
      body: JSON.stringify(requestBody),
    });
    const data = await result.json();
    if (data.success) {
      console.log("User registered successfully");
    } else {
      console.error("Error registering user:", data.message);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

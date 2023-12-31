//Wengel Code

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

export async function getProfile(token) {
  try {
    const uri = "http://127.0.0.1:5001/profileData/user";

    const result = await fetch(uri, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await result.json();
    console.log(data.data);
    return data;
  } catch (error) {
    return null;
  }
}

export async function updateProfiles(token, myfile) {
  try {
    console.log(token, "token");
    console.log("myfile", myfile);
    const result = await fetch("http://127.0.0.1:5001/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(myfile),
    });
    console.log(result);
    if (result.status === 200) {
      const data = await result.json();
      console.log(data);
      return data;
    } else {
      console.error("not found on server");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

//Rajeev Code
export async function getNotes(emailID, token) {
  try {
    const response = await fetch(`http://localhost:5001/notes/${emailID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function addNotes(emailID, data, token) {
  try {
    const response = await fetch(`http://localhost:5001/notes/${emailID}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function editNotes(emailID, noteID, data, token) {
  console.log("emailId", emailID);
  console.log("noteId", noteID);
  console.log("data", data);
  console.log("token", token);
  try {
    const response = await fetch(
      `http://localhost:5001/notes/${emailID}/note/${noteID}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

//Rahel's code

function formatDateToMMDDYYYY(date) {
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}



export async function getFoodList(token) {
  try {
    const response = await fetch("http://127.0.0.1:5001/restaurants/foods", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    );
  }
}


export async function editFoodItem(emailID, data, token) {
  console.log("here i am");
  try {
    const response = await fetch(
      `http://localhost:5001/users/${emailID}/foods`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`Failed to update food: ${errorResponse.message}`);
    }
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function addFood(food, token) {
  try {
    const response = await fetch("http://localhost:5001/restaurants/foods", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(food),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}


//delete foods
export async function deleteFood(emailID, foodID, token) {

  const response = await fetch(`http://localhost:5001/users/${emailID}/foods/${foodID}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}
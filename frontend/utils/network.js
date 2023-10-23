
//Wengel Code
import { useState } from "react";

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
    const uri = "http://127.0.0.1:5001/users/me";

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
    // const uri = ;
    console.log(token, "token");
    console.log("myfile", myfile);
    const result = await fetch("http://127.0.0.1:5001/test", {
      method: "POST",
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
      console.error(`Server returned status: ${result.status}`);
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}


//Rajeev Code
export async function getNotes(emailID) {
    try {
        const response = await fetch(`http://localhost:5001/notes/${emailID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
}

export async function addNotes(emailID, data) {
    try {
        const response = await fetch(`http://localhost:5001/notes/${emailID}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
}

export async function editNotes(emailID, noteID, data) {
    try {
        const response = await fetch(`http://localhost:5001/notes/${emailID}/note/${noteID}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return null;
    }
}

//Rahel's code


function getCurrentDate() {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Current month
  const dd = String(today.getDate()).padStart(2, '0'); // Current day
  const yyyy = today.getFullYear(); // Current year
  return `${mm}-${dd}-${yyyy}`;
}


export async function getFoodList(userEmail) {
  try {
    const response = await fetch(`http://localhost:5001/users/${userEmail}/foods`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const foods = await response.json();
    return { success: true, data: foods };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


export async function deleteFood(userEmail, foodId) {
  try {
    const response = await fetch(`http://localhost:5001/users/${userEmail}/foods/${foodId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`Failed to delete food: ${errorResponse.error}`);
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}


export async function editFood(userEmail, updatedFoodData) {
  try {
    const response = await fetch(`http://localhost:5001/users/${userEmail}/foods`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedFoodData)
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`Failed to update food: ${errorResponse.error}`);
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function addFood(userEmail, food) {
  try {
    const response = await fetch(`http://localhost:5001/users/${userEmail}/foods`, {
      method: "POST", // Change the method to POST for creating a new food item
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(food) // Send the 'food' object in the request body
    });

    const json = await response.json();
    return  json;
  } catch (error) {
    return { success: false, error: error.message };
  }
}



 

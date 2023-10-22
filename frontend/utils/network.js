


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

function formatDateToMMDDYYYY(date) {
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
}

let foods = [
    { name: 'Noodle', origin: 'Vietnam', price: 8.99, quantity: 2, date: formatDateToMMDDYYYY(new Date()), image: 'https://picsum.photos/200' },
    { name: 'LoMein', origin: 'Nepal', price: 6.99,quantity: 4, date: formatDateToMMDDYYYY(new Date()), image: 'https://picsum.photos/200' },
    { name: 'Paneer', origin: 'USA', price: 4.99, quantity: 4,date: formatDateToMMDDYYYY(new Date()), image: 'https://picsum.photos/200' },
    { name: 'Tikka', origin: 'Mongolia', price: 3.99, quantity: 4,date: formatDateToMMDDYYYY(new Date()), image: 'https://picsum.photos/200' },
    { name: 'Injera', origin: 'Ethiopia', price: 4.99,quantity: 4, date: formatDateToMMDDYYYY(new Date()), image: 'https://picsum.photos/200' }
]

export async function getFoodList() {
    try {
      const response = await fetch("http://localhost:5001/restaurants/restaurantId/foods", {
        method: "GET",
        headers: {
          "content-type": "application/json"
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

  export async function deleteFood(foodId) {
    try {
      const response = await fetch(`http://localhost:5001/restaurants/restaurantId/foods/${foodId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to delete food: ${errorResponse.message}`);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  export async function editFood(foodId, updatedFoodData) {
    try {
      const response = await fetch(`http://localhost:5001/restaurants/restaurantId/foods/${foodId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFoodData)
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to update food: ${errorResponse.message}`);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }


  export async function addFood(food, restaurantId) {
    try {
      const response = await fetch(`http://localhost:5001/restaurants/${restaurantId}/foods`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(food) // Send the 'food' object in the request body
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to add food: ${errorResponse.message}`);
      }

      // Assuming 'foods' is an array you want to push to, it should be updated after a successful response.
      // Note that you should probably use a more centralized state management method, such as Redux, in a real application.
      foods.push(food);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
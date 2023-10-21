


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
        console.log(error);
    }

}

export async function addNotes(emailID, data) {

    const response = await fetch(`http://localhost:5001/notes/${emailID}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    console.log("res network", result);
    return result;
}

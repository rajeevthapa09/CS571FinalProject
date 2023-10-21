useEffect(() => {
    // Function to fetch food data from your API or database
    const fetchFoodData = async () => {
      try {
        // Replace 'your-api-endpoint-for-food-data' with your actual API endpoint
        const response = await fetch('your-api-endpoint-for-food-data');
        if (response.ok) {
          const data = await response.json();
          setFoodData(data); // Update the state with fetched data
        } else {
          console.error('Failed to fetch food data');
        }
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };

    fetchFoodData(); // Call the fetchFoodData function when the component mounts
  }, []);
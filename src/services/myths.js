export async function fetchMythById(id) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/myths/${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Myth not found');
    }

    const data = await response.json(); // Await the promise

    return data;
  } catch (error) {
    console.error('Error fetching myths:', error);
    throw error;
  }
}

export async function fetchAllMyths() {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/myths`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch myths');
    }

    const data = await response.json(); // Await the promise

    return data;
  } catch (error) {
    console.error('Error fetching myths:', error);
    throw error;
  }
}
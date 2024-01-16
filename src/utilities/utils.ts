export const shuffleArray = (array: any) => {
  // Iterate through the array backwards
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // Store the value at index i in a temporary variable
    let temp = array[i];
    // Swap the value at index i with the value at the random index
    array[i] = array[randomIndex];
    // Set the value at the random index to the temporary variable
    array[randomIndex] = temp;
  }
};

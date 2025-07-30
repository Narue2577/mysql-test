"use server";

export const saveFormDatasToDatabase = async (_, formData) => {
  const rawData = {
    email: formData.get("email"),
    fullName: formData.get("fullName"),
    password: formData.get("password"),
  };
  if (
    !rawData.email ||
    !rawData.password ||
    !rawData.fullName 
  ) {
    return { message: "Please fill all the areas.", inputs: rawData };
  }
  // check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(rawData.email)) {
    return {
      message: "Please enter a valid email address.",
      inputs: rawData,
    };
  }
  if (rawData.fullName.length < 2 || rawData.fullName.length > 50) {
    return {
      message: "Name must be between 2 and 50 characters.",
      inputs: rawData,
    };
  }
};
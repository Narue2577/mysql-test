"use server";

export const saveFormDatasToDatabases = async (_, formData) => {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
 
    return {
      success: false,
      message: "First name can't be less than 10 characters.",
      inputs: inputsWithoutFirstName,
    };
  
};
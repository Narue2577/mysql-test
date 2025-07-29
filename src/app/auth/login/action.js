"use server";

export const saveFormDatasToDatabase = async (_, formData) => {
  const rawData = {
    email: formData.get("email"),
    firstName: formData.get("fName"),
    password: formData.get("password"),
  };
  if (rawData.firstName.length < 10) {
    const { firstName, ...inputsWithoutFirstName } = rawData;
    return {
      success: false,
      message: "First name can't be less than 10 characters.",
      inputs: inputsWithoutFirstName,
    };
  }
};
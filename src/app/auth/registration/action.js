"use server";

export const saveFormDatasToDatabase = async (_, formData) => {
  const rawData = {
    email: formData.get("email"),
    fullName: formData.get("fullName"),
    password: formData.get("password"),
  };
  if (rawData.fullName.length < 10) {
    const { fullName, ...inputsWithoutFullName } = rawData;
    return {
      success: false,
      message: "Full name can't be less than 10 characters.",
      inputs: inputsWithoutFullName,
    };
  }
};
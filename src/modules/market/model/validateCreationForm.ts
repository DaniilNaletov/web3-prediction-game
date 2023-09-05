const getCreationFormError = (formData: FormData) => {
  const description = String(formData.get("description"));
  const cutoffDate = String(formData.get("cutoffDate"));
  const decisionDate = String(formData.get("decisionDate"));
  const decisionProvider = String(formData.get("decisionProvider"));

  if (!description || !description.length) {
    return "Description can not be empty";
  }

  if (!cutoffDate) {
    return "Cutoff date can not be empty";
  }

  if (new Date(cutoffDate).getTime() <= Date.now()) {
    return "Cutoff date should be a future";
  }

  if (!decisionDate) {
    return "Decision date can not be empty";
  }

  if (new Date(decisionDate).getTime() <= new Date(cutoffDate).getTime()) {
    return "Decision date should be after cutoff date";
  }

  if (!decisionProvider || !decisionProvider.length) {
    return "Decision provider can not be empty";
  }

  return null;
};

export default getCreationFormError;

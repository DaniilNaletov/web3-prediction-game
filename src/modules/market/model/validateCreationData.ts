import { MarketCreationData } from "../interfaces/marketInterfaces";

const validateCreationData = (creationData: MarketCreationData) => {
  const { description, cutoffDate, decisionDate, decisionProvider } =
    creationData;

  if (!description || !description.length) {
    return "Description can not be empty";
  }

  if (!cutoffDate) {
    return "Cutoff date can not be empty";
  }

  if (cutoffDate <= Date.now()) {
    return "Cutoff date should be a future";
  }

  if (!decisionDate) {
    return "Decision date can not be empty";
  }

  if (decisionDate <= cutoffDate) {
    return "Decision date should be after cutoff date";
  }

  if (!decisionProvider || !decisionProvider.length) {
    return "Decision provider can not be empty";
  }

  return null;
};

export default validateCreationData;

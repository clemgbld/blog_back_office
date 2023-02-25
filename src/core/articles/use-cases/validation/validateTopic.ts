export const validateTopic = (topic: string) =>
  topic.toLowerCase().trim() !== "all articles";

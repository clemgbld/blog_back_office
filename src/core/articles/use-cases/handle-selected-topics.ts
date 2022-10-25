import { curry } from "ramda";

export const handleSelectedTopics = curry((topic: string, topics: string[]) => {
  if (topics.at(0) === "all articles") return [topic];
  if (topic === "all articles") return ["all articles"];
  if (!topics.includes(topic)) return [...topics, topic];
  const filteredTopics = topics.filter((t) => t !== topic);
  return filteredTopics.length === 0 ? ["all articles"] : filteredTopics;
});

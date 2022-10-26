import { Article } from "../../../core/articles/entities/article";

export const fakeArticle1: any = {
  id: "1",
  summary:
    "Redundant re-renders are a common issue in React. If not taken seriously, this issue can quickly worsen the performance of your application.",
  topic: "React",
  title: "React Performance: How to avoid redundant re-renders",
  date: 1666072894896,
  lightMode: true,
  timeToRead: "7 min read",
  content: [
    {
      type: "h1",
      id: 1,
      children: [
        {
          color: "#000",
          text: "Redundant re-renders are a common issue in React. If not taken seriously, this issue can quickly worsen the performance of your application.",
        },
      ],
    },
    {
      type: "img",
      // caption: ["caption 1"],
      width: 424,
      id: 2,
      url: "https://isamatov.com/images/react-avoid-redundant-renders/React%20Performance-%20How%20to%20avoid%20redundant%20re-renders.png",
      children: [{ text: "" }],
    },
    {
      type: "p",
      id: 55,
      children: [{ text: "" }],
    },
    {
      type: "p",
      id: 3,
      children: [
        {
          color: "#000",
          text: "Redundant re-renders are a common issue in React. If not taken seriously, this issue can quickly worsen the performance of your application.",
        },
      ],
    },
    {
      type: "p",
      id: 54,
      children: [{ text: "" }],
    },
  ],
};

export const fakeArticle2: Article = {
  id: "2",
  topic: "Craftmanship",
  date: 1665986494896,
  summary:
    "What happens when you blindly follow the best practice without understanding why? You end up with software that is not optimized for your needs or environment.",
  title:
    "Reclaiming Responsibility From Best Practices in Software Development",
  lightMode: false,
  timeToRead: "5 min read",

  hide: false,
  content: [
    {
      type: "h1",
      id: 1,
      children: [
        {
          color: "#08fdd8",
          text: "Reclaiming Responsibility From Best Practices in Software Development",
        },
      ],
    },
    {
      type: "img",
      width: 424,
      id: 2,
      url: "https://isamatov.com/images/challenging-software-development-best-practices/challenging%20software%20development%20best%20practices.png",
      children: [{ text: "" }],
    },
    {
      type: "p",
      id: 55,
      children: [{ text: "" }],
    },
    {
      type: "p",
      id: 3,
      children: [
        {
          text: "What happens when you blindly follow the best practice without understanding why? You end up with software that is not optimized for your needs or environment.",
          color: "#c5f6fa",
        },
      ],
    },
    {
      type: "p",
      id: 54,
      children: [{ text: "" }],
    },
    {
      type: "p",
      id: 7,
      align: "right",
      children: [
        {
          text: "fake text",
          color: "#c5f6fa",
        },
      ],
    },
  ],
};

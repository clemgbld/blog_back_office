import moment from "moment";

export const formatDateDDMMYYYY = (date: Date) =>
  moment(date).format("DD/MM/YYYY");

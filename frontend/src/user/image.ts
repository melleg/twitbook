export default interface Image {
  id: number;
  filename: string;
  mimeType: string;
  data: string;
}

export const emptyImage: Image = {
  id: 0,
  filename: "",
  mimeType: "",
  data: "",
}
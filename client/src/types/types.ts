// type link
export type LinkType = {
  name: string;
  icon: string;
  path: string;
};

export type Genre =
  | "Animation"
  | "Comedy"
  | "Drama"
  | "Fantasy"
  | "Horror"
  | "Romance"
  | "Thriller"
  | "Action"
  | "All";

// bonus
export type BonusType = "PS1" | "PS2" | "PS3" | "M1" | "M2";

// type Reviews
export type ReviewsType = {
  rating: 1 | 2 | 3 | 4 | 5;
  comments: string;
  author: string;
};

// type Theaters
// export type TheatersType = {
//     id: number;
//     thumbnail: string;
//     name: string;
//     city: string;
// }

// type time
export type TimeType = {
  id: number;
  status: "available" | "full";
  time: string;
  date: Date;
};

// type response form API
export type ResponseType<T> = {
  status: "success" | "failed";
  message: string;
  data: T;
};

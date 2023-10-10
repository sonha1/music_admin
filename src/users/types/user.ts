export interface User {
  id: string;
  avatar?: string;
  disabled: boolean;
  username: string;
  firstName: string;
  gender?: "F" | "M" | "NC";
  lastName: string;
  role: string;
  password?: string
  followerCount?: number
}

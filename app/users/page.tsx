
import { UsersContainer } from "./Container";

type User = {
  id: number;
  name: string;
  email: string;
};

// Page Component
export default function UsersPage() {
  return (
  <UsersContainer/>
  );
}

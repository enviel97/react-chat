interface Account {
  email: string;
  password: string;
}

interface User extends Account {
  firstName: string;
  lastName: string;
}

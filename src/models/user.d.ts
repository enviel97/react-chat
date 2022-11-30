interface Account {
  email: string;
  password: string;
}

interface User extends Identity, Account {
  firstName: string;
  lastName: string;
}

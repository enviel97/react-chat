interface Account {
  email: string;
  password: string;
  userName?: string;
}

interface User extends Identity, Account, TimeStamp {
  firstName: string;
  lastName: string;
}

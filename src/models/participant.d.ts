type Role = "Admin" | "Member";

type ParticipantRole = { [key: string]: Role };

interface IParticipant extends Identity, TimeStamp {
  members: string[];
  roles: ParticipantRole;
}

interface Participant extends Identity, TimeStamp {
  members: User[];
  roles: ParticipantRole;
}

interface ParticipantDetail extends Identity, TimeStamp, Participant {
  messages: Message[];
}

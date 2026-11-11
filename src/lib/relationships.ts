export type RelationshipKind =
  "biological" | "adoptive" | "marital" | "political" | "investigative";

export type RelationshipFilter =
  "all" | "family" | "political" | "investigative";

export type Relationship = {
  id: string;
  from: string;
  to: string;
  kind: RelationshipKind;
  labelForFrom: string;
  labelForTo: string;
  explanation: string;
};

export const relationshipKinds: { id: RelationshipKind; label: string }[] = [
  { id: "biological", label: "Biological" },
  { id: "adoptive", label: "Adoptive" },
  { id: "marital", label: "Marriage" },
  { id: "political", label: "Political / household" },
  { id: "investigative", label: "Investigative" },
];

export const relationshipFilters: { id: RelationshipFilter; label: string }[] =
  [
    { id: "all", label: "All connections" },
    { id: "family", label: "Family" },
    { id: "political", label: "Political" },
    { id: "investigative", label: "Investigation" },
  ];

// Separate edges retain relationships that coexist between the same people.
export const relationships: Relationship[] = [
  {
    id: "oedipus-jocasta-birth",
    from: "oedipus",
    to: "jocasta",
    kind: "biological",
    labelForFrom: "Biological mother",
    labelForTo: "Biological son",
    explanation:
      "The recognition joins the abandoned royal child to the king now married to Jocasta.",
  },
  {
    id: "oedipus-jocasta-marriage",
    from: "oedipus",
    to: "jocasta",
    kind: "marital",
    labelForFrom: "Wife",
    labelForTo: "Husband",
    explanation:
      "Their known marriage and previously unknown mother–son relationship exist at the same time.",
  },
  {
    id: "oedipus-laius-birth",
    from: "oedipus",
    to: "laius",
    kind: "biological",
    labelForFrom: "Biological father",
    labelForTo: "Biological son",
    explanation:
      "The crossroads killing becomes patricide when Oedipus recognizes who his father was.",
  },
  {
    id: "oedipus-polybus-adoption",
    from: "oedipus",
    to: "polybus",
    kind: "adoptive",
    labelForFrom: "Adoptive father",
    labelForTo: "Adopted son",
    explanation:
      "Oedipus mistakes the father who raised him for his biological father; the messenger corrects that belief.",
  },
  {
    id: "oedipus-merope-adoption",
    from: "oedipus",
    to: "merope",
    kind: "adoptive",
    labelForFrom: "Adoptive mother",
    labelForTo: "Adopted son",
    explanation:
      "His fear of marrying Merope helps explain why he stays away from Corinth.",
  },
  {
    id: "oedipus-creon-birth",
    from: "oedipus",
    to: "creon",
    kind: "biological",
    labelForFrom: "Maternal uncle",
    labelForTo: "Nephew",
    explanation:
      "Creon's relationship to Jocasta also makes him part of Oedipus's newly recognized birth family.",
  },
  {
    id: "oedipus-creon-marriage",
    from: "oedipus",
    to: "creon",
    kind: "marital",
    labelForFrom: "Brother-in-law",
    labelForTo: "Brother-in-law",
    explanation:
      "Before the discovery of his birth, Oedipus knows Creon as his wife's brother.",
  },
  {
    id: "oedipus-creon-authority",
    from: "oedipus",
    to: "creon",
    kind: "political",
    labelForFrom: "Accused political rival",
    labelForTo: "Ruler who accuses him",
    explanation:
      "Oedipus treats Creon as a conspirator; Creon's defense asks for evidence rather than suspicion.",
  },
  {
    id: "jocasta-laius-marriage",
    from: "jocasta",
    to: "laius",
    kind: "marital",
    labelForFrom: "Former husband",
    labelForTo: "Wife",
    explanation:
      "Jocasta's recollection of her former husband's death gives Oedipus the crossroads clue.",
  },
  {
    id: "jocasta-creon-birth",
    from: "jocasta",
    to: "creon",
    kind: "biological",
    labelForFrom: "Brother",
    labelForTo: "Sister",
    explanation:
      "Jocasta's family tie places her between the ruler and the relative he accuses.",
  },
  {
    id: "polybus-merope-marriage",
    from: "polybus",
    to: "merope",
    kind: "marital",
    labelForFrom: "Wife",
    labelForTo: "Husband",
    explanation:
      "The Corinthian household is the family Oedipus believes he must avoid to escape the oracle.",
  },
  {
    id: "tiresias-oedipus-testimony",
    from: "tiresias",
    to: "oedipus",
    kind: "investigative",
    labelForFrom: "Ruler he accuses",
    labelForTo: "Prophetic accuser and unwilling witness",
    explanation:
      "The prophet's accusation names the investigator as the person he seeks, before Oedipus accepts the evidence.",
  },
  {
    id: "tiresias-creon-consultation",
    from: "tiresias",
    to: "creon",
    kind: "investigative",
    labelForFrom: "Recommends consulting Tiresias",
    labelForTo: "Prophet he recommends consulting",
    explanation:
      "Consulting Tiresias becomes part of Oedipus's suspicion of Creon, rather than proof that a conspiracy exists.",
  },
  {
    id: "laius-shepherd-household",
    from: "laius",
    to: "shepherd",
    kind: "political",
    labelForFrom: "Household servant",
    labelForTo: "Former master",
    explanation:
      "The household servant's knowledge eventually connects the royal infant with the adult investigator.",
  },
  {
    id: "messenger-polybus-transfer",
    from: "messenger",
    to: "polybus",
    kind: "investigative",
    labelForFrom: "Received the infant from him",
    labelForTo: "Brought him the infant",
    explanation:
      "The messenger's role in delivering the child explains his knowledge that Polybus was not the biological father.",
  },
  {
    id: "messenger-shepherd-transfer",
    from: "messenger",
    to: "shepherd",
    kind: "investigative",
    labelForFrom: "Gave him the infant",
    labelForTo: "Received the infant from him",
    explanation:
      "The two witnesses' accounts join the child's Theban origin to his Corinthian upbringing.",
  },
  {
    id: "messenger-oedipus-rescue",
    from: "messenger",
    to: "oedipus",
    kind: "investigative",
    labelForFrom: "Child he rescued",
    labelForTo: "Rescued him as an infant",
    explanation:
      "An intended reassurance about Polybus becomes a disclosure about Oedipus's adoption.",
  },
  {
    id: "shepherd-jocasta-transfer",
    from: "shepherd",
    to: "jocasta",
    kind: "investigative",
    labelForFrom: "Entrusted him with the infant",
    labelForTo: "Received the infant from her",
    explanation:
      "The shepherd's testimony identifies the child's royal origin and Jocasta's place in it.",
  },
  {
    id: "shepherd-oedipus-survival",
    from: "shepherd",
    to: "oedipus",
    kind: "investigative",
    labelForFrom: "Child he preserved; later questions him",
    labelForTo: "Preserved him and testifies to his birth",
    explanation:
      "The reluctant witness supplies the final connection between the abandoned child and the king.",
  },
  {
    id: "chorus-oedipus-city",
    from: "chorus",
    to: "oedipus",
    kind: "political",
    labelForFrom: "Ruler they support and later pity",
    labelForTo: "The city's elders",
    explanation:
      "The Chorus's changing response makes the king's personal discovery a matter of public judgment.",
  },
  {
    id: "chorus-creon-defense",
    from: "chorus",
    to: "creon",
    kind: "political",
    labelForFrom: "Hear his defense and intervention",
    labelForTo: "The elders who hear his defense",
    explanation:
      "The city's elders listen as Creon contests the accusation and later intervenes in the aftermath.",
  },
];

export const networkPositions: { id: string; x: number; y: number }[] = [
  { id: "laius", x: 16, y: 12 },
  { id: "jocasta", x: 50, y: 12 },
  { id: "creon", x: 84, y: 12 },
  { id: "polybus", x: 13, y: 40 },
  { id: "oedipus", x: 50, y: 43 },
  { id: "tiresias", x: 87, y: 40 },
  { id: "merope", x: 13, y: 70 },
  { id: "chorus", x: 50, y: 70 },
  { id: "shepherd", x: 87, y: 70 },
  { id: "messenger", x: 50, y: 92 },
];

export function includesRelationshipKind(
  kind: RelationshipKind,
  filter: RelationshipFilter,
) {
  if (filter === "all") return true;
  if (filter === "family")
    return kind === "biological" || kind === "adoptive" || kind === "marital";
  return kind === filter;
}

export function getConnections(
  characterId: string,
  filter: RelationshipFilter,
) {
  return relationships.filter(
    (relationship) =>
      (relationship.from === characterId || relationship.to === characterId) &&
      includesRelationshipKind(relationship.kind, filter),
  );
}

export function otherCharacterId(
  relationship: Relationship,
  selectedId: string,
) {
  return relationship.from === selectedId ? relationship.to : relationship.from;
}

export function relationshipLabel(
  relationship: Relationship,
  selectedId: string,
) {
  return relationship.from === selectedId
    ? relationship.labelForFrom
    : relationship.labelForTo;
}

export interface ReferencedUser {
  id?: string;
  name: string;
  email: string;
  products: FirebaseFirestore.DocumentReference[];
}
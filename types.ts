
export interface Objective {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface Achievement {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  category: 'water' | 'humanitarian' | 'finance';
}

export interface ContactInfo {
  address: string;
  phones: string[];
  email: string;
}

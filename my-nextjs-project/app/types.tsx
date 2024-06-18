export interface LogoAttributes {
  url: string | null;
}

export interface LogoData {
  id: string;
  attributs: LogoAttributes;
}

export interface Logo {
  data: LogoData[]; // Notez le tableau ici
}

export interface HomepageAttributes {
  Titre: string | null;
  Description: string | null;
  Logo: Logo | null;
}

export interface HomepageData {
  id: string;
  attributes: HomepageAttributes | null;
}

export interface HomepageResponse {
  homepage: {
    data: HomepageData | null;
  };
}

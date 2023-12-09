interface SpacecraftStatus {
  id: number;
  name: string;
}

interface SpacecraftType {
  id: number;
  name: string;
}

interface SpacecraftAgency {
  id: number;
  url: string;
  name: string;
  type: string;
}

interface SpacecraftConfig {
  id: number;
  url: string;
  name: string;
  type: SpacecraftType;
  agency: SpacecraftAgency;
  in_use: boolean;
  image_url: string;
}

export default interface Spacecraft {
  id: number;
  url: string;
  name: string;
  serial_number: string | null;
  status: SpacecraftStatus;
  description: string;
  spacecraft_config: SpacecraftConfig;
}

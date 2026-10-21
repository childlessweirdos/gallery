import type { StaticImageData } from "next/image";

export type Availability =
  | "available"
  | "inquiry"
  | "unavailable"
  | "not-for-sale";

export type PrintOption = {
  size: string;
  edition?: string;
  price?: string;
};

export type PictureRecord = {
  note: string;
  calibration?: {
    measures: string;
    meanBefore: number;
    meanAfter: number;
  };
  swatch?: StaticImageData;
};

export type Artwork = {
  id: string;
  slug: string;
  title: string;
  year: number;
  image: StaticImageData;
  imageWidth: number;
  imageHeight: number;
  altText: string;
  displayOrder: number;
  description?: string;
  artistNote?: string;
  medium?: string;
  dimensions?: string;
  picture?: PictureRecord;
  detailImages?: StaticImageData[];
  thumbnail?: StaticImageData;
  collections?: string[];
  featured?: boolean;
  originalAvailability?: Availability;
  printAvailability?: Availability;
  printOptions?: PrintOption[];
};

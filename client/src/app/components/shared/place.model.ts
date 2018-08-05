export class Place {
  _id: string;
  description:string;
  country:string;
  rating:Number;
  imageUrl:string;
  location: {
    longitude:Number;
    latitude:Number;
  }
}

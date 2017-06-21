/**
 * LatLong Object (with optional accuracy)
 * 
 * @export
 * @interface ILatLong
 */
export interface ILatLong {
    lat:number;
    long:number;
    accuracy? : number;
}
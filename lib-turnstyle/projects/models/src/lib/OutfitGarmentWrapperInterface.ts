import { OutfitInterface } from './OutfitInterface';
import { GarmentColorStyleWrapperInterface } from './GarmentColorStyleWrapperInterface';

export interface OutfitGarmentWrapperInterface {
    outfit: OutfitInterface;
    garments: GarmentColorStyleWrapperInterface[]
}
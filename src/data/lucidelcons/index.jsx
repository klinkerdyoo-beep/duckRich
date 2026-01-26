import { Utensils, Home, Car, ShoppingCart, Film } from "lucide-react";
import foodLucideIcons from "./food";
import homeLucideIcons from "./home";
import TransportationLucidIcons from "./transportation";
import shoppingLucideIcons from "./shopping";
import entertainmentLucideIcons from "./Entertainment";

const iconGroupd = {
    "food" : {mainIcon: Utensils, icons: foodLucideIcons},
    "home" : {mainIcon: Home, icons: homeLucideIcons},
    "transportation" : {mainIcon: Car, icons: TransportationLucidIcons},
    "shopping" : {mainIcon: ShoppingCart, icons: shoppingLucideIcons},
    "entertainment" : {mainIcon: Film, icons: entertainmentLucideIcons}
}

export default iconGroupd;
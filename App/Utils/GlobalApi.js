
import axios from 'axios'
const BASE_URL="https://places.googleapis.com/v1/places:searchNearby";
const API_KEY="AIzaSyC4XJ0tCtzqAQEO_A0Hy3vIujCOBcVb9ks";
const CLERK_API_KEY='pk_test_Y2FyZWZ1bC1zcGFycm93LTI4LmNsZXJrLmFjY291bnRzLmRldiQ';
const FIREBASE_API="AIzaSyAbM2DiFVMu78SJ2TzrJBoSHT49CAyAGKg";

const config={
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key':API_KEY,
        'X-Goog-FieldMask':[
    'places.displayName',
    'places.formattedAddress',
    'places.location',
    'places.evChargeOptions',
    'places.shortFormattedAddress',
    'places.photos','places.id']
    }
}

const NewNearByPlace=(data)=>axios.post(BASE_URL,data,config);

export default{
    NewNearByPlace,
    API_KEY,
    CLERK_API_KEY,
    FIREBASE_API
}

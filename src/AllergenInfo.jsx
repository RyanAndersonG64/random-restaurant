import { Link } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react"
import SelectedMenu from "./SelectedMenu"
import Menu from './Menu'

function allergenInfo() {
    print('Inset Allergen Info')
}

// dropdown to select an allergen
// filters items that do not have that allergen

export default allergenInfo
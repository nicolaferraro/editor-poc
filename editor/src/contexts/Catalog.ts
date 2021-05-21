import React from "react";
import { KameletCatalog } from "../models/kamelet"

const Catalog = React.createContext<KameletCatalog>({items: []})
export default Catalog;

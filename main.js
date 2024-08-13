// @@Start(imports)
import "./style.css";
// @@Start(map-component-imports)
import "@arcgis/map-components/dist/components/arcgis-layer-list";
import "@arcgis/map-components/dist/components/arcgis-map";
// @@End(map-component-imports) @@Start(calcite-component-imports)
import "@esri/calcite-components/dist/components/calcite-navigation";
import "@esri/calcite-components/dist/components/calcite-navigation-logo";
import "@esri/calcite-components/dist/components/calcite-shell";
// @@Start(setAssetPath)
// Import the setAssetPath function from calcite-components
// This function allows you to set the path to the calcite components assets
import { setAssetPath } from "@esri/calcite-components/dist/components";
// CDN hosted calcite components assets
setAssetPath("https://jsdev.arcgis.com/calcite-components/2.11.0/assets");
// @@End(setAssetPath) @@End(calcite-component-imports)  @@End(imports) @@Start(arcgis-layer-list)
// Get a reference to the arcgis-layer-list element
const arcgisLayerList = document.querySelector("arcgis-layer-list");
// @@Start(listItemCreatedFunction)
// Set the listItemCreatedFunction to add a legend to each list item
arcgisLayerList.listItemCreatedFunction = (event) => {
  const { item } = event;
  if (item.layer.type !== "group") {
    item.panel = {
      content: "legend",
    };
  }
};
// @@End(listItemCreatedFunction) @@End(arcgis-layer-list) @@Start(arcgis-map)
// Get a reference to the arcgis-map element
const arcgisMap = document.querySelector("arcgis-map");
// @@Start(arcgisViewReadyChange)
// Since we are using property values from the map component,
// we use the arcgisViewReadyChange event to determine when the map is ready.
arcgisMap.addEventListener("arcgisViewReadyChange", () => {
  // @@Start(portal-item)
  const { portalItem } = arcgisMap.map;
  // @@End(portal-item) @@Start(navigation-logo)
  const navigationLogo = document.querySelector("calcite-navigation-logo");
  navigationLogo.heading = portalItem.title;
  navigationLogo.description = portalItem.snippet;
  navigationLogo.thumbnail = portalItem.thumbnailUrl;
  // @@End(navigation-logo) @@Start(popup) @@Start(layer)
  const layer = arcgisMap.map.layers.find(
    (layer) => layer.id === "Accidental_Deaths_8938"
  );
  // @@End(layer) @@Start(popup-title)
  layer.popupTemplate.title = "Accidental Deaths";
  // @@End(popup-title) @@End(popup)
});
// @@End(arcgisViewReadyChange) @@End(arcgis-map)

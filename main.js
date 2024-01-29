import "./style.css";

import { defineCustomElements as defineMapElements } from "@arcgis/map-components/dist/loader";
import { defineCustomElements as defineCalciteElements } from "@esri/calcite-components/dist/loader";

defineCalciteElements(window, {
  resourcesUrl: "https://js.arcgis.com/calcite-components/2.3.0/assets",
});

defineMapElements();

document
  .querySelector("arcgis-layer-list")
  .addEventListener("arcgisLayerListReady", (event) => {
    const arcgisLayerList = event.target;
    arcgisLayerList.listItemCreatedFunction = (event) => {
      const { item } = event;
      if (item.layer.type !== "group") {
        item.panel = {
          content: "legend",
        };
      }
    };
  });

document
  .querySelector("arcgis-map")
  .addEventListener("arcgisViewReadyChange", (event) => {
    const { portalItem } = event.target.map;
    const navigationLogo = document.querySelector("calcite-navigation-logo");
    navigationLogo.heading = portalItem.title;
    navigationLogo.description = portalItem.snippet;
    navigationLogo.thumbnail = portalItem.thumbnailUrl;

    const layer = event.target.map.layers.find(
      (layer) => layer.id === "Accidental_Deaths_8938"
    );
    layer.popupTemplate.title = "Accidental Deaths";
  });

const renderPopulationLevels = async () => {
      const { data } = await getPopulationLevelsData();
      return data.norway;
    };

features.map(async (feat) => {
        const countryName = feat.properties?.name_en.toLowerCase();
        console.log("countryName", countryName)
        const renderPopulationLevels = async () => {
          const { data } = await getPopulationLevelsData();
          console.log("renderPopulationLevels", data.countryName)
          return data.countryName;
        };

        map.addSource(feat.properties.name_en.toUpperCase(), {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [polyShapeNorway], // These coordinates outline Norway.
                },
                properties: {
                  description: ABOUT_MESSAGE,
                  data: await renderPopulationLevels();
                },
              },
            ],
          },
        });

        // Add a new layer to visualize the polygon.
        map.addLayer({
          id: feat.id,
          type: 'fill',
          source: feat.source, // reference the data source
          layout: {},
          paint: {
            'fill-color': '#2a9d8f', // color for fill
            'fill-opacity': 0.3,
          },
        });

        // Add an outline around the polygon.
        map.addLayer({
          id: 'outline',
          type: 'line',
          source: feat.source,
          layout: {},
          paint: {
            'line-color': '#F66990',
            'line-width': 3,
          },
        });

      });

      const renderCountryDescription = (props) => {
        infoBox.innerHTML = `
          <h1 class="is-size-3 has-text-semibold">
            ${props ? props.layer.source : '' }
          </h1>
          <p class="is-size-6">
            ${props ? props.properties.description : ''}
          </p>`;
      }

      const [selectedCountry,] = features;
      
      renderCountryDescription(selectedCountry);
 

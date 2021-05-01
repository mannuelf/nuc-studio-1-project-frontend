export default function createLegend(): void {
  const legend = document.querySelector('#legend') as HTMLElement;

  /*
   * define layer names
   */
  const layers = [
    '0-1000',
    '1000-2000',
    '2000-5000',
    '5000-10000',
    '10000-20000',
  ];

  const colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A'];

  /*
   * creates HTML the legend, bottom right
   * */
  for (let i = 0; i < layers.length; i += 1) {
    const layer = layers[i];
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    const value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }
}

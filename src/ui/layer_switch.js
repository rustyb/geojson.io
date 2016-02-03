module.exports = function(context) {

    return function(selection) {
        var layers;

        if (!(/a\.tiles\.mapbox.com/).test(L.mapbox.config.HTTP_URL)) {
            layers = [{
                title: 'Mapbox',
                layer: L.mapbox.tileLayer('mapbox.osm-bright')
            }, {
                title: 'Mapbox Outdoors',
                layer: L.mapbox.tileLayer('mapbox.mapbox-outdoors')
            }, {
                title: 'Satellite',
                layer: L.mapbox.tileLayer('mapbox.satellite-full')
            }, {
                title: 'EE',
                layer: L.tileLayer('https://{s}.tiles.mapbox.com/v4/rusty.cm0b8gzp/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicnVzdHkiLCJhIjoib0FjUkJybyJ9.V9QoXck_1Z18MhpwyIE2Og')
            }];

        } else {
            layers = [{
                title: 'Entso-E Grid',
                layer: L.mapbox.tileLayer('rusty.e6d60062')
                //layer: L.tileLayer('https://{s}.tiles.mapbox.com/v4/rusty.e6d60062/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicnVzdHkiLCJhIjoib0FjUkJybyJ9.V9QoXck_1Z18MhpwyIE2Og')
                //layer: L.tileLayer('https://{s}.tiles.mapbox.com/v4/rusty.cm0b8gzp/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicnVzdHkiLCJhIjoib0FjUkJybyJ9.V9QoXck_1Z18MhpwyIE2Og')
            }, {
                title: 'Mapbox',
                layer: L.mapbox.tileLayer('mapbox.streets')
            }, {
                title: 'Satellite',
                layer: L.mapbox.tileLayer('mapbox.satellite')
            }, {
                title: 'OCM',
                layer: L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
                   attribution: 'Maps &copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })
            }, {
                title: 'OSM',
                layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })
            }];
        }

        var layerSwap = function(d) {
            var clicked = this instanceof d3.selection ? this.node() : this;
            layerButtons.classed('active', function() {
                return clicked === this;
            });
            layers.forEach(swap);
            function swap(l) {
                var datum = d instanceof d3.selection ? d.datum() : d;
                if (l.layer == datum.layer) context.map.addLayer(datum.layer);
                else if (context.map.hasLayer(l.layer)) context.map.removeLayer(l.layer);
            }
        };

        var layerButtons = selection.append('div')
            .attr('class', 'layer-switch')
            .selectAll('button')
            .data(layers)
            .enter()
            .append('button')
            .attr('class', 'pad0x')
            .on('click', layerSwap)
            .text(function(d) { return d.title; });

        layerButtons.filter(function(d, i) { return i === 0; }).call(layerSwap);

    };
};

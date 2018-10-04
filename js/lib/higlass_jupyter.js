var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');
var hglib_css = require('higlass/dist/styles/hglib.css');
var hglib = require('higlass/dist/scripts/hglib.js');

var minimalConfig = {
  "trackSourceServers": [
    "http://higlass.io/api/v1"
  ],
  "exportViewUrl": "http://higlass.io/api/v1/viewconfs",
  "editable": true,
  "zoomFixed": false,
  "views": [
    {
      "layout": {
        "w": 12,
        "h": 6,
        "x": 0,
        "y": 0
      },
      "initialXDomain": [
        0,
        3000000000
      ],
      "initialYDomain": [
        0,
        3000000000
      ],
      "tracks": {
        "left": [],
        "right": [],
        "top": [],
        "bottom": []
      } 
    }
  ]
};

var HiGlassDisplayModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(_.result(this, 'widgets.DOMWidgetModel.prototype.defaults'), {
        _model_name : 'HiGlassDisplayModel',
        _view_name : 'HiGlassDisplayView',
        _model_module : 'higlass_jupyter',
        _view_module : 'higlass_jupyter',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0'
    })
});

// Custom View. Renders the widget model.
var HiGlassDisplayView = widgets.DOMWidgetView.extend({
  
    render: function() {
        this.hgcontainer = document.createElement('div');
        // this.hgcontainer.style.margin = '1em';
        // this.hgcontainer.style.boxSizing = 'border-box';
        // this.hgcontainer.style.lineHeight = '48px';

        this.hgdisplay = document.createElement('div');
        this.hgdisplay.style.border = '1px solid black';
        this.hgdisplay.style.borderRadius = '1%';
        this.hgdisplay.style.borderColor = '#dddddd';

        this.hgcontainer.appendChild(this.hgdisplay);
        this.el.appendChild(this.hgcontainer);

        const minimalConfig = this.model.get('viewconf');
        const height = this.model.get('height');
        const hgOptions = this.model.get('hg_options');

        console.log('height:', height, 'hgOptions:', hgOptions);

        if (height) {
          console.log('setting div height');
          this.hgdisplay.style.height = height + 'px';
        }

        if (!hgOptions.bounded) {
          // user hasn't specified a preference so we try to
          // infer whether to bound the component
          if (!height) {
            console.log('no height, setting bounded to false');
            // if a height hasn't been passed in to the widget, make it unbounded
            hgOptions['bounded'] = false;

            console.log('after hgOptions', hgOptions);
          } else {
            console.log('height provided, setting bounded to true');

            hgOptions['bounded'] = true;
          }
        }
        
        
        console.log('minimalConfig:', minimalConfig);
        console.log('hgOptions:', hgOptions)

        hglib.createHgComponent(
            this.hgdisplay,
            minimalConfig,
            hgOptions,
            function (api) {
                window.hgApi = api;
            }
        );     
    }
});

module.exports = {
    HiGlassDisplayModel: HiGlassDisplayModel,
    HiGlassDisplayView: HiGlassDisplayView
};

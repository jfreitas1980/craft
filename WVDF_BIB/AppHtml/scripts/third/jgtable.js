/*
 * 
 * jQuery Google Charts - Table Plugin 0.9
 * 
 * $Date:2008-06-12 18:32:13 +0200 (gio, 12 giu 2008) $
 * $Rev:171 $
 * 
 * @requires
 * jGCharts Base
 * Metadata
 * 
 * Copyright (c) 2008 Massimiliano Balestrieri
 * Examples and docs at: http://maxb.net/blog/
 * Licensed GPL licenses:
 * http://www.gnu.org/licenses/gpl.html
 *
 */

if(!window.jGCharts)
    alert("Include jGCharts Base Plugin");
 
jGCharts.Table = {
    init : function(options){
            
                
        return this.each(function(nr, el){
            
            var that = this;
        
            var _options = jQuery.extend({}, options);
            
            if(!_options.target){
               var _target = jQuery('<div class="jgchart">');
               jQuery(that).before(_target);
            }else{
               var _target = jQuery(_options.target);
            }
            
            _options = jQuery.extend(jQuery.metadata.get(that), _options);

            if(!_options.data){
            	_options.data = [];
                for(var x= 0;x< jQuery(that).find("tbody > tr").size();x++){
                    _options.data.push(
                        jQuery.map( jQuery(that).find("tbody > tr:eq(" + x + ") > td"),
                            function(td,index){
                                        //if(index % 11 == 1 || index % 11 == 2){
                                            if(parseInt(jQuery(td).text()))
                                                return parseInt(jQuery(td).text());
                                            else
                                                return 0;
                                        //} 
                            }
                        )
                    );
                }  
            }
            //console.log(_options.data);
            if(!_options.axis_labels)
	            _options.axis_labels = jQuery.map( jQuery(that).find("tbody > tr > th.serie"),
	                               function(th) { return jQuery(th).text(); }
	            );
	        if(!_options.legend)    
	            _options.legend = jQuery.map( jQuery(that).find("thead > tr:last > th.serie"),
	                                 function(th) { return jQuery(th).text(); }
	            );
            
            var api = new jGCharts.Api();
            var url = api.make(_options);
            
            
            var ch = jQuery('<img>')
            .attr('src', url);
            
            _target
            .append(ch);
            
        });
    }  
};
jQuery.fn.jgtable = jGCharts.Table.init;
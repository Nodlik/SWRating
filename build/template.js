this["JST"] = this["JST"] || {};

this["JST"]["rating.svg.html.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "        <div data-value=\""
    + alias2(alias1(depth0, depth0))
    + "\" class=\"w-star w-star_type-svg w-rating__star "
    + ((stack1 = helpers['if'].call(depth0,(depths[1] != null ? depths[1].isLocked : depths[1]),{"name":"if","hash":{},"fn":this.program(2, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\"  "
    + ((stack1 = helpers['if'].call(depth0,(depths[1] != null ? depths[1].stretch : depths[1]),{"name":"if","hash":{},"fn":this.program(4, data, 0, blockParams, depths),"inverse":this.program(6, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + ">\n            <svg viewBox=\"0 0 198 198\" shape-rendering=\"geometricPrecision\">\n                <clipPath id=\"clip"
    + alias2(alias1(depth0, depth0))
    + "\">\n                    <rect class=\"w-star__clip-rect\" x=\"0\" y=\"0\" width=\"1%\" height=\"100%\" />\n                </clipPath>\n\n                <polygon fill=\"url(#UnActiveGradient)\" points=\"100,10 40,198 190,78 10,78 160,198\" />\n                <polygon fill=\"url(#ActiveGradient)\" clip-path=\"url(#clip"
    + alias2(alias1(depth0, depth0))
    + ")\" points=\"100,10 40,198 190,78 10,78 160,198\" />\n            </svg>\n        </div>\n";
},"2":function(depth0,helpers,partials,data) {
    return "w-star_locked";
},"4":function(depth0,helpers,partials,data) {
    return "";
},"6":function(depth0,helpers,partials,data,blockParams,depths) {
    return "style=\"width: "
    + this.escapeExpression(this.lambda((depths[2] != null ? depths[2].starSize : depths[2]), depth0))
    + "px\"";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<svg viewBox=\"0 0 198 198\" class=\"w-rating__svg-defs\">\n    <defs>\n        <linearGradient id=\"UnActiveGradient\" gradientUnits=\"userSpaceOnUse\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"100%\">\n            <stop offset=\"0\" style=\"stop-color: #FFFFFF\"/>\n            <stop offset=\"1\" style=\"stop-color: #000000\"/>\n        </linearGradient>\n\n        <linearGradient id=\"ActiveGradient\" gradientUnits=\"userSpaceOnUse\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"100%\">\n            <stop offset=\"0\" style=\"stop-color: #ffe900\"/>\n            <stop offset=\"1\" style=\"stop-color: #ff7100\"/>\n        </linearGradient>\n    </defs>\n</svg>\n\n<div class=\"w-rating__stars\">\n"
    + ((stack1 = (helpers.times || (depth0 && depth0.times) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.pointNumber : depth0),{"name":"times","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n\n<div class=\"w-rating__result\">\n    <div class=\"w-rating__mark\"></div>\n    <div class=\"w-rating__vote-count\"></div>\n</div>";
},"useData":true,"useDepths":true});
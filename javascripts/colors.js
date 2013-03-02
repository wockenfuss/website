var newRGB = function() {
    var rgb = [];
    for ( var i = 0; i < 3; i++ ) {
        rgb.push(Math.floor(Math.random() * 256));
    }
    return rgb;
};

var rgbToHsl = function(rgb) {
    var R = rgb[0];
    var G = rgb[1];
    var B = rgb[2];
    var var_R = ( R / 255 );
    var var_G = ( G / 255 );
    var var_B = ( B / 255 );

    var var_Min = Math.min( var_R, var_G, var_B );    //Min. value of RGB
    var var_Max = Math.max( var_R, var_G, var_B );    //Max. value of RGB
    var del_Max = var_Max - var_Min;

    var L = ( var_Max + var_Min ) / 2;
    var H, S;
    if ( del_Max === 0 ) {  //This is a gray, no chroma...
        H = 0;                                //HSL results from 0 to 1
        S = 0;
    } else {                                   //Chromatic data...
        if ( L < 0.5 ) {
            S = del_Max / ( var_Max + var_Min );
        } else {
            S = del_Max / ( 2 - var_Max - var_Min );
        }

        var del_R = ( ( ( var_Max - var_R ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
        var del_G = ( ( ( var_Max - var_G ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
        var del_B = ( ( ( var_Max - var_B ) / 6 ) + ( del_Max / 2 ) ) / del_Max;

        if ( var_R == var_Max ) {
            H = del_B - del_G;
        } else if ( var_G == var_Max ) {
            H = ( 1 / 3 ) + del_R - del_B;
        } else if ( var_B == var_Max ) {
            H = ( 2 / 3 ) + del_G - del_R;
        }
        if ( H < 0 ) {
            H += 1;
        }
        if ( H > 1 ) {
            H -= 1;
        }
        H = Math.round(H * 360);
        S = Math.round(S * 100) / 100;
        L = Math.round(L * 100) / 100;
    }
    return [H, S, L];
};

var hslToRgb = function(HSL) {
    var hue = HSL[0] / 360;
    var S = HSL[1];
    var L = HSL[2];
    var R, G, B, var_1, var_2;
    if ( S === 0 ) {
        R = L * 255;                      //RGB results from 0 to 255
        G = L * 255;
        B = L * 255;
    } else {                     //HSL from 0 to 1
        if ( L < 0.5 ) {
            var_2 = L * ( 1 + S );
        } else {
            var_2 = ( L + S ) - ( S * L );
        }
        var_1 = 2 * L - var_2;

        R = 255 * Hue_2_RGB( var_1, var_2, hue + ( 1 / 3 ) );
        G = 255 * Hue_2_RGB( var_1, var_2, hue );
        B = 255 * Hue_2_RGB( var_1, var_2, hue - ( 1 / 3 ) );
    }
    R = Math.round(R);
    G = Math.round(G);
    B = Math.round(B);
    return [R,G,B];
};

var Hue_2_RGB = function( v1, v2, vH ) {            //Function Hue_2_RGB
    if ( vH < 0 ) vH += 1;
    if ( vH > 1 ) vH -= 1;
    if ( ( 6 * vH ) < 1 ) {
        return ( v1 + ( v2 - v1 ) * 6 * vH );
    }
    if ( ( 2 * vH ) < 1 ) {
        return ( v2 );
    }
    if ( ( 3 * vH ) < 2 ) {
        return ( v1 + ( v2 - v1 ) * ( ( 2 / 3 ) - vH ) * 6 );
    }
    return ( v1 );
};

var compColor = function(rgb) {
    var hsl = rgbToHsl(rgb);
    // console.log(hsl);
    var comp = [(hsl[0] + 180) % 360, hsl[1], hsl[2]];
    // console.log(comp);
    return hslToRgb(comp);
};

var toRGB = function(rgb) {
    return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
};

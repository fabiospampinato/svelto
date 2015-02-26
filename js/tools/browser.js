
/* BROWSER */

var browser = {
    is_mobile: /iphone|ipad|android|ipod|opera mini|opera mobile|blackberry|iemobile|webos|windows phone|playbook|tablet|kindle/i.test ( navigator.userAgent.toLowerCase () ),
    is_tablet: /ipad|playbook|tablet|kindle/i.test ( navigator.userAgent.toLowerCase () )
};

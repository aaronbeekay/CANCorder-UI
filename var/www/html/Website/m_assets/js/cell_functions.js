/* cell_functions.js - functions operating on cell voltage data
 * Aaron Bonnell-Kangas, for Buckeye Current, 2016-06
 */
 
/* estimate_soc( ocv ): rough estimate of cell state-of-charge from terminal voltage
 *
 *		WARNING: SOC estimates from this function are only valid when
 *  		the voltage is a good approximation of the "true" open-circuit voltage
 *  		of the cell (i.e., zero load for infinite time). The SOC estimate will
 *  		be seriously compromised if there is any current passing through the
 *  		cell, or if the cell has recently experienced current. The function
 *  		makes no attempt to protect you from such errors. Your application MUST
 *  		deal with such error, or you will provide your user with wildly
 *  		inaccurate data. 
 * 
 *	'ocv' is a cell's open-circuit voltage, in millivolts.
 * 	'cell_type' is a string that will be added later.
 */
 function estimate_soc( ocv ){
 	var ocv_data = [2550, 2551, 2552, 2553, 2554, 2555, 2556, 2557, 2558, 2559, 2560, 2561, 2562, 2563, 2564, 2565, 2566, 2567, 2568, 2569, 2570, 2571, 2572, 2573, 2574, 2575, 2576, 2577, 2578, 2579, 2580, 2581, 2582, 2583, 2584, 2585, 2586, 2587, 2588, 2589, 2590, 2591, 2592, 2593, 2594, 2595, 2596, 2597, 2598, 2599, 2600, 2601, 2602, 2603, 2604, 2605, 2606, 2607, 2608, 2609, 2610, 2611, 2612, 2613, 2614, 2615, 2616, 2617, 2618, 2619, 2620, 2621, 2622, 2623, 2624, 2625, 2626, 2627, 2628, 2629, 2630, 2631, 2632, 2633, 2634, 2635, 2636, 2637, 2638, 2639, 2640, 2641, 2642, 2643, 2644, 2645, 2646, 2647, 2648, 2649, 2650, 2651, 2652, 2653, 2654, 2655, 2656, 2657, 2658, 2659, 2660, 2661, 2662, 2663, 2664, 2665, 2666, 2667, 2668, 2669, 2670, 2671, 2672, 2673, 2674, 2675, 2676, 2677, 2678, 2679, 2680, 2681, 2682, 2683, 2684, 2685, 2686, 2687, 2688, 2689, 2690, 2691, 2692, 2693, 2694, 2695, 2696, 2697, 2698, 2699, 2700, 2701, 2702, 2703, 2704, 2705, 2706, 2707, 2708, 2709, 2710, 2711, 2712, 2713, 2714, 2715, 2716, 2717, 2718, 2719, 2720, 2721, 2722, 2723, 2724, 2725, 2726, 2727, 2728, 2729, 2730, 2731, 2732, 2733, 2734, 2735, 2736, 2737, 2738, 2739, 2740, 2741, 2742, 2743, 2744, 2745, 2746, 2747, 2748, 2749, 2750, 2751, 2752, 2753, 2754, 2755, 2756, 2757, 2758, 2759, 2760, 2761, 2762, 2763, 2764, 2765, 2766, 2767, 2768, 2769, 2770, 2771, 2772, 2773, 2774, 2775, 2776, 2777, 2778, 2779, 2780, 2781, 2782, 2783, 2784, 2785, 2786, 2787, 2788, 2789, 2790, 2791, 2792, 2793, 2794, 2795, 2796, 2797, 2798, 2799, 2800, 2801, 2802, 2803, 2804, 2805, 2806, 2807, 2808, 2809, 2810, 2811, 2812, 2813, 2814, 2815, 2816, 2817, 2818, 2819, 2820, 2821, 2822, 2823, 2824, 2825, 2826, 2827, 2828, 2829, 2830, 2831, 2832, 2833, 2834, 2835, 2836, 2837, 2838, 2839, 2840, 2841, 2842, 2843, 2844, 2845, 2846, 2847, 2848, 2849, 2850, 2851, 2852, 2853, 2854, 2855, 2856, 2857, 2858, 2859, 2860, 2861, 2862, 2863, 2864, 2865, 2866, 2867, 2868, 2869, 2870, 2871, 2872, 2873, 2874, 2875, 2876, 2877, 2878, 2879, 2880, 2881, 2882, 2883, 2884, 2885, 2886, 2887, 2888, 2889, 2890, 2891, 2892, 2893, 2894, 2895, 2896, 2897, 2898, 2899, 2900, 2901, 2902, 2903, 2904, 2905, 2906, 2907, 2908, 2909, 2910, 2911, 2912, 2913, 2914, 2915, 2916, 2917, 2918, 2919, 2920, 2921, 2922, 2923, 2924, 2925, 2926, 2927, 2928, 2929, 2930, 2931, 2932, 2933, 2934, 2935, 2936, 2937, 2938, 2939, 2940, 2941, 2942, 2943, 2944, 2945, 2946, 2947, 2948, 2949, 2950, 2951, 2952, 2953, 2954, 2955, 2956, 2957, 2958, 2959, 2960, 2961, 2962, 2963, 2964, 2965, 2966, 2967, 2968, 2969, 2970, 2971, 2972, 2973, 2974, 2975, 2976, 2977, 2978, 2979, 2980, 2981, 2982, 2983, 2984, 2985, 2986, 2987, 2988, 2989, 2990, 2991, 2992, 2993, 2994, 2995, 2996, 2997, 2998, 2999, 3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010, 3011, 3012, 3013, 3014, 3015, 3016, 3017, 3018, 3019, 3020, 3021, 3022, 3023, 3024, 3025, 3026, 3027, 3028, 3029, 3030, 3031, 3032, 3033, 3034, 3035, 3036, 3037, 3038, 3039, 3040, 3041, 3042, 3043, 3044, 3045, 3046, 3047, 3048, 3049, 3050, 3051, 3052, 3053, 3054, 3055, 3056, 3057, 3058, 3059, 3060, 3061, 3062, 3063, 3064, 3065, 3066, 3067, 3068, 3069, 3070, 3071, 3072, 3073, 3074, 3075, 3076, 3077, 3078, 3079, 3080, 3081, 3082, 3083, 3084, 3085, 3086, 3087, 3088, 3089, 3090, 3091, 3092, 3093, 3094, 3095, 3096, 3097, 3098, 3099, 3100, 3101, 3102, 3103, 3104, 3105, 3106, 3107, 3108, 3109, 3110, 3111, 3112, 3113, 3114, 3115, 3116, 3117, 3118, 3119, 3120, 3121, 3122, 3123, 3124, 3125, 3126, 3127, 3128, 3129, 3130, 3131, 3132, 3133, 3134, 3135, 3136, 3137, 3138, 3139, 3140, 3141, 3142, 3143, 3144, 3145, 3146, 3147, 3148, 3149, 3150, 3151, 3152, 3153, 3154, 3155, 3156, 3157, 3158, 3159, 3160, 3161, 3162, 3163, 3164, 3165, 3166, 3167, 3168, 3169, 3170, 3171, 3172, 3173, 3174, 3175, 3176, 3177, 3178, 3179, 3180, 3181, 3182, 3183, 3184, 3185, 3186, 3187, 3188, 3189, 3190, 3191, 3192, 3193, 3194, 3195, 3196, 3197, 3198, 3199, 3200, 3201, 3202, 3203, 3204, 3205, 3206, 3207, 3208, 3209, 3210, 3211, 3212, 3213, 3214, 3215, 3216, 3217, 3218, 3219, 3220, 3221, 3222, 3223, 3224, 3225, 3226, 3227, 3228, 3229, 3230, 3231, 3232, 3233, 3234, 3235, 3236, 3237, 3238, 3239, 3240, 3241, 3242, 3243, 3244, 3245, 3246, 3247, 3248, 3249, 3250, 3251, 3252, 3253, 3254, 3255, 3256, 3257, 3258, 3259, 3260, 3261, 3262, 3263, 3264, 3265, 3266, 3267, 3268, 3269, 3270, 3271, 3272, 3273, 3274, 3275, 3276, 3277, 3278, 3279, 3280, 3281, 3282, 3283, 3284, 3285, 3286, 3287, 3288, 3289, 3290, 3291, 3292, 3293, 3294, 3295, 3296, 3297, 3298, 3299, 3300, 3301, 3302, 3303, 3304, 3305, 3306, 3307, 3308, 3309, 3310, 3311, 3312, 3313, 3314, 3315, 3316, 3317, 3318, 3319, 3320, 3321, 3322, 3323, 3324, 3325, 3326, 3327, 3328, 3329, 3330, 3331, 3332, 3333, 3334, 3335, 3336, 3337, 3338, 3339, 3340, 3341, 3342, 3343, 3344, 3345, 3346, 3347, 3348, 3349, 3350, 3351, 3352, 3353, 3354, 3355, 3356, 3357, 3358, 3359, 3360, 3361, 3362, 3363, 3364, 3365, 3366, 3367, 3368, 3369, 3370, 3371, 3372, 3373, 3374, 3375, 3376, 3377, 3378, 3379, 3380, 3381, 3382, 3383, 3384, 3385, 3386, 3387, 3388, 3389, 3390, 3391, 3392, 3393, 3394, 3395, 3396, 3397, 3398, 3399, 3400, 3401, 3402, 3403, 3404, 3405, 3406, 3407, 3408, 3409, 3410, 3411, 3412, 3413, 3414, 3415, 3416, 3417, 3418, 3419, 3420, 3421, 3422, 3423, 3424, 3425, 3426, 3427, 3428, 3429, 3430, 3431, 3432, 3433, 3434, 3435, 3436, 3437, 3438, 3439, 3440, 3441, 3442, 3443, 3444, 3445, 3446, 3447, 3448, 3449, 3450, 3451, 3452, 3453, 3454, 3455, 3456, 3457, 3458, 3459, 3460, 3461, 3462, 3463, 3464, 3465, 3466, 3467, 3468, 3469, 3470, 3471, 3472, 3473, 3474, 3475, 3476, 3477, 3478, 3479, 3480, 3481, 3482, 3483, 3484, 3485, 3486, 3487, 3488, 3489, 3490, 3491, 3492, 3493, 3494, 3495, 3496, 3497, 3498, 3499, 3500, 3501, 3502, 3503, 3504, 3505, 3506, 3507, 3508, 3509, 3510, 3511, 3512, 3513, 3514, 3515, 3516, 3517, 3518, 3519, 3520, 3521, 3522, 3523, 3524, 3525, 3526, 3527, 3528, 3529, 3530, 3531, 3532, 3533, 3534, 3535, 3536, 3537, 3538, 3539, 3540, 3541, 3542, 3543, 3544, 3545, 3546, 3547, 3548, 3549, 3550, 3551, 3552, 3553, 3554, 3555, 3556, 3557, 3558, 3559, 3560, 3561, 3562, 3563, 3564, 3565, 3566, 3567, 3568, 3569, 3570, 3571, 3572, 3573, 3574, 3575, 3576, 3577, 3578, 3579, 3580, 3581, 3582, 3583, 3584, 3585, 3586, 3587, 3588, 3589, 3590, 3591, 3592, 3593, 3594, 3595, 3596, 3597, 3598, 3599, 3600];
 	var soc_data = [ 0.00099194, 0.0010136, 0.0010353, 0.0010571, 0.0010789, 0.0011009, 0.001123, 0.0011451, 0.0011674, 0.0011897, 0.0012122, 0.0012347, 0.0012573, 0.00128, 0.0013028, 0.0013257, 0.0013487, 0.0013719, 0.0013951, 0.0014184, 0.0014418, 0.0014653, 0.0014889, 0.0015126, 0.0015364, 0.0015603, 0.0015843, 0.0016084, 0.0016327, 0.001657, 0.0016814, 0.001706, 0.0017307, 0.0017554, 0.0017803, 0.0018053, 0.0018304, 0.0018557, 0.001881, 0.0019064, 0.001932, 0.0019577, 0.0019835, 0.0020094, 0.0020355, 0.0020617, 0.002088, 0.0021144, 0.0021409, 0.0021676, 0.0021944, 0.0022213, 0.0022484, 0.0022755, 0.0023028, 0.0023303, 0.0023579, 0.0023856, 0.0024134, 0.0024414, 0.0024695, 0.0024978, 0.0025262, 0.0025547, 0.0025834, 0.0026122, 0.0026412, 0.0026703, 0.0026996, 0.002729, 0.0027585, 0.0027882, 0.0028181, 0.0028481, 0.0028783, 0.0029086, 0.0029391, 0.0029698, 0.0030006, 0.0030315, 0.0030627, 0.0030939, 0.0031254, 0.003157, 0.0031888, 0.0032208, 0.0032529, 0.0032852, 0.0033177, 0.0033504, 0.0033832, 0.0034163, 0.0034495, 0.0034828, 0.0035164, 0.0035502, 0.0035841, 0.0036182, 0.0036526, 0.0036871, 0.0037218, 0.0037567, 0.0037918, 0.0038271, 0.0038626, 0.0038983, 0.0039343, 0.0039704, 0.0040067, 0.0040433, 0.00408, 0.004117, 0.0041542, 0.0041916, 0.0042292, 0.0042671, 0.0043052, 0.0043435, 0.0043821, 0.0044208, 0.0044598, 0.0044991, 0.0045386, 0.0045783, 0.0046183, 0.0046585, 0.0046989, 0.0047397, 0.0047806, 0.0048218, 0.0048633, 0.0049051, 0.004947, 0.0049893, 0.0050318, 0.0050746, 0.0051177, 0.0051611, 0.0052047, 0.0052486, 0.0052928, 0.0053373, 0.005382, 0.0054271, 0.0054724, 0.005518, 0.005564, 0.0056102, 0.0056568, 0.0057036, 0.0057508, 0.0057983, 0.0058461, 0.0058942, 0.0059426, 0.0059914, 0.0060404, 0.0060899, 0.0061396, 0.0061897, 0.0062401, 0.0062909, 0.006342, 0.0063935, 0.0064453, 0.0064975, 0.0065501, 0.006603, 0.0066562, 0.0067099, 0.0067639, 0.0068183, 0.006873, 0.0069282, 0.0069837, 0.0070396, 0.007096, 0.0071527, 0.0072098, 0.0072673, 0.0073252, 0.0073835, 0.0074423, 0.0075015, 0.007561, 0.007621, 0.0076815, 0.0077423, 0.0078036, 0.0078654, 0.0079275, 0.0079902, 0.0080532, 0.0081167, 0.0081807, 0.0082451, 0.00831, 0.0083754, 0.0084412, 0.0085075, 0.0085743, 0.0086415, 0.0087093, 0.0087775, 0.0088462, 0.0089154, 0.0089851, 0.0090553, 0.009126, 0.0091972, 0.0092688, 0.0093411, 0.0094138, 0.009487, 0.0095608, 0.0096351, 0.0097099, 0.0097852, 0.0098611, 0.0099375, 0.010014, 0.010092, 0.01017, 0.010248, 0.010328, 0.010407, 0.010487, 0.010568, 0.010649, 0.010731, 0.010814, 0.010897, 0.01098, 0.011064, 0.011149, 0.011234, 0.01132, 0.011406, 0.011493, 0.011581, 0.011669, 0.011758, 0.011847, 0.011937, 0.012027, 0.012118, 0.012209, 0.012302, 0.012394, 0.012488, 0.012581, 0.012676, 0.012771, 0.012866, 0.012963, 0.013059, 0.013157, 0.013255, 0.013353, 0.013452, 0.013552, 0.013652, 0.013753, 0.013854, 0.013956, 0.014058, 0.014161, 0.014265, 0.014369, 0.014474, 0.014579, 0.014685, 0.014791, 0.014898, 0.015006, 0.015114, 0.015223, 0.015332, 0.015441, 0.015552, 0.015663, 0.015774, 0.015886, 0.015998, 0.016111, 0.016225, 0.016339, 0.016453, 0.016568, 0.016684, 0.0168, 0.016917, 0.017034, 0.017151, 0.017269, 0.017388, 0.017507, 0.017627, 0.017747, 0.017868, 0.017989, 0.018111, 0.018233, 0.018355, 0.018479, 0.018602, 0.018726, 0.018851, 0.018976, 0.019101, 0.019227, 0.019354, 0.019481, 0.019608, 0.019736, 0.019864, 0.019993, 0.020122, 0.020252, 0.020382, 0.020512, 0.020643, 0.020775, 0.020907, 0.021039, 0.021172, 0.021305, 0.021439, 0.021573, 0.021707, 0.021842, 0.021978, 0.022114, 0.02225, 0.022387, 0.022524, 0.022662, 0.0228, 0.022938, 0.023077, 0.023216, 0.023356, 0.023496, 0.023637, 0.023778, 0.023919, 0.024061, 0.024203, 0.024346, 0.024489, 0.024633, 0.024777, 0.024921, 0.025066, 0.025211, 0.025357, 0.025503, 0.02565, 0.025797, 0.025944, 0.026092, 0.02624, 0.026389, 0.026538, 0.026688, 0.026838, 0.026988, 0.027139, 0.027291, 0.027442, 0.027595, 0.027747, 0.0279, 0.028054, 0.028208, 0.028362, 0.028517, 0.028673, 0.028829, 0.028985, 0.029141, 0.029299, 0.029456, 0.029615, 0.029773, 0.029932, 0.030092, 0.030252, 0.030412, 0.030573, 0.030735, 0.030897, 0.031059, 0.031222, 0.031385, 0.031549, 0.031714, 0.031879, 0.032044, 0.03221, 0.032376, 0.032543, 0.032711, 0.032879, 0.033047, 0.033216, 0.033386, 0.033556, 0.033727, 0.033898, 0.03407, 0.034242, 0.034415, 0.034588, 0.034762, 0.034937, 0.035112, 0.035288, 0.035464, 0.035641, 0.035818, 0.035996, 0.036175, 0.036354, 0.036534, 0.036714, 0.036895, 0.037077, 0.037259, 0.037442, 0.037626, 0.03781, 0.037995, 0.038181, 0.038367, 0.038554, 0.038741, 0.03893, 0.039119, 0.039308, 0.039498, 0.039689, 0.039881, 0.040074, 0.040267, 0.040461, 0.040655, 0.04085, 0.041047, 0.041243, 0.041441, 0.041639, 0.041839, 0.042038, 0.042239, 0.042441, 0.042643, 0.042846, 0.04305, 0.043255, 0.04346, 0.043667, 0.043874, 0.044082, 0.044291, 0.044501, 0.044712, 0.044924, 0.045137, 0.04535, 0.045565, 0.04578, 0.045996, 0.046214, 0.046432, 0.046651, 0.046871, 0.047092, 0.047315, 0.047538, 0.047762, 0.047987, 0.048214, 0.048441, 0.04867, 0.048899, 0.04913, 0.049362, 0.049595, 0.049829, 0.050064, 0.0503, 0.050538, 0.050776, 0.051016, 0.051257, 0.0515, 0.051743, 0.051988, 0.052234, 0.052482, 0.05273, 0.05298, 0.053232, 0.053484, 0.053739, 0.053994, 0.054251, 0.054509, 0.054769, 0.05503, 0.055293, 0.055557, 0.055823, 0.05609, 0.056359, 0.056629, 0.056901, 0.057175, 0.05745, 0.057727, 0.058005, 0.058285, 0.058567, 0.058851, 0.059137, 0.059424, 0.059713, 0.060004, 0.060297, 0.060591, 0.060888, 0.061187, 0.061487, 0.06179, 0.062095, 0.062402, 0.06271, 0.063021, 0.063335, 0.06365, 0.063968, 0.064288, 0.06461, 0.064934, 0.065261, 0.065591, 0.065922, 0.066257, 0.066594, 0.066933, 0.067275, 0.06762, 0.067967, 0.068317, 0.06867, 0.069026, 0.069385, 0.069746, 0.070111, 0.070479, 0.07085, 0.071223, 0.071601, 0.071981, 0.072365, 0.072752, 0.073143, 0.073537, 0.073934, 0.074336, 0.074741, 0.07515, 0.075562, 0.075979, 0.0764, 0.076824, 0.077253, 0.077687, 0.078124, 0.078566, 0.079013, 0.079464, 0.07992, 0.08038, 0.080846, 0.081316, 0.081792, 0.082273, 0.082759, 0.083251, 0.083749, 0.084252, 0.084761, 0.085276, 0.085797, 0.086324, 0.086858, 0.087398, 0.087945, 0.088499, 0.08906, 0.089628, 0.090204, 0.090787, 0.091378, 0.091977, 0.092584, 0.093199, 0.093824, 0.094456, 0.095098, 0.095749, 0.09641, 0.097081, 0.097761, 0.098452, 0.099154, 0.099866, 0.10059, 0.10132, 0.10207, 0.10283, 0.1036, 0.10439, 0.10518, 0.10599, 0.10682, 0.10766, 0.10851, 0.10938, 0.11027, 0.11117, 0.11208, 0.11302, 0.11397, 0.11494, 0.11593, 0.11693, 0.11796, 0.11901, 0.12008, 0.12117, 0.12229, 0.12343, 0.1246, 0.12579, 0.12701, 0.12826, 0.12953, 0.13084, 0.13217, 0.13354, 0.13494, 0.13637, 0.13784, 0.13935, 0.14089, 0.14247, 0.1441, 0.14577, 0.14748, 0.14924, 0.15105, 0.1529, 0.1548, 0.15674, 0.15874, 0.16078, 0.16287, 0.16501, 0.16719, 0.16943, 0.17171, 0.17405, 0.17643, 0.17886, 0.18133, 0.18386, 0.18643, 0.18905, 0.19172, 0.19443, 0.1972, 0.20003, 0.20291, 0.20584, 0.20882, 0.21181, 0.21481, 0.21781, 0.22083, 0.22385, 0.22687, 0.2299, 0.23294, 0.23598, 0.23903, 0.24208, 0.24514, 0.24821, 0.25128, 0.25437, 0.25747, 0.26058, 0.26371, 0.26686, 0.27002, 0.27321, 0.27642, 0.27966, 0.28293, 0.28624, 0.28958, 0.29296, 0.29639, 0.29987, 0.3034, 0.30698, 0.31064, 0.31436, 0.31816, 0.32204, 0.32602, 0.33009, 0.33428, 0.33859, 0.34304, 0.34763, 0.35239, 0.35733, 0.36247, 0.36785, 0.37348, 0.3794, 0.38565, 0.39228, 0.39933, 0.40688, 0.41501, 0.42379, 0.43333, 0.44375, 0.45514, 0.46757, 0.48103, 0.49567, 0.51175, 0.52908, 0.54712, 0.56513, 0.58231, 0.59816, 0.6125, 0.62541, 0.63704, 0.64758, 0.65723, 0.66612, 0.67438, 0.68213, 0.68944, 0.69639, 0.70303, 0.70941, 0.71557, 0.72156, 0.7274, 0.73311, 0.73873, 0.74427, 0.74976, 0.7552, 0.76066, 0.76618, 0.7718, 0.77753, 0.78342, 0.7895, 0.79582, 0.80243, 0.80939, 0.8168, 0.82475, 0.83338, 0.84283, 0.85322, 0.86441, 0.87576, 0.88615, 0.89482, 0.90165, 0.90709, 0.91157, 0.91536, 0.91863, 0.92149, 0.92405, 0.92634, 0.92844, 0.93035, 0.93212, 0.93376, 0.93529, 0.93673, 0.93808, 0.93935, 0.94056, 0.94171, 0.9428, 0.94384, 0.94483, 0.94579, 0.94671, 0.94759, 0.94843, 0.94925, 0.95004, 0.9508, 0.95154, 0.95226, 0.95295, 0.95362, 0.95428, 0.95491, 0.95553, 0.95614, 0.95672, 0.9573, 0.95785, 0.9584, 0.95893, 0.95945, 0.95996, 0.96046, 0.96095, 0.96143, 0.96189, 0.96235, 0.9628, 0.96324, 0.96368, 0.9641, 0.96452, 0.96493, 0.96533, 0.96573, 0.96612, 0.9665, 0.96687, 0.96725, 0.96761, 0.96797, 0.96832, 0.96867, 0.96901, 0.96935, 0.96969, 0.97001, 0.97034, 0.97066, 0.97097, 0.97129, 0.97159, 0.9719, 0.97219, 0.97249, 0.97278, 0.97307, 0.97335, 0.97364, 0.97391, 0.97419, 0.97446, 0.97473, 0.97499, 0.97526, 0.97552, 0.97577, 0.97603, 0.97628, 0.97653, 0.97677, 0.97702, 0.97726, 0.9775, 0.97773, 0.97797, 0.9782, 0.97843, 0.97865, 0.97888, 0.9791, 0.97932, 0.97954, 0.97976, 0.97997, 0.98018, 0.9804, 0.9806, 0.98081, 0.98102, 0.98122, 0.98142, 0.98162, 0.98182, 0.98202, 0.98221, 0.98241, 0.9826, 0.98279, 0.98298, 0.98316, 0.98335, 0.98353, 0.98372, 0.9839, 0.98408, 0.98426, 0.98443, 0.98461, 0.98479, 0.98496, 0.98513, 0.9853, 0.98547, 0.98564, 0.98581, 0.98597, 0.98614, 0.9863, 0.98646, 0.98662, 0.98678, 0.98694, 0.9871, 0.98726, 0.98741, 0.98757, 0.98772, 0.98787, 0.98802, 0.98817, 0.98832, 0.98847, 0.98862, 0.98876, 0.98891, 0.98905, 0.98919, 0.98934, 0.98948, 0.98962, 0.98976, 0.98989, 0.99003, 0.99017, 0.9903, 0.99044, 0.99057, 0.9907, 0.99084, 0.99097, 0.9911, 0.99122, 0.99135, 0.99148, 0.99161, 0.99173, 0.99186, 0.99198, 0.9921, 0.99222, 0.99234, 0.99246, 0.99258, 0.9927, 0.99282, 0.99293, 0.99305, 0.99316, 0.99328, 0.99339, 0.9935, 0.99362, 0.99373, 0.99383, 0.99394, 0.99405, 0.99416, 0.99426, 0.99437, 0.99447, 0.99458, 0.99468, 0.99478, 0.99488, 0.99498, 0.99508, 0.99518, 0.99528, 0.99537, 0.99547, 0.99556, 0.99566, 0.99575, 0.99584, 0.99593, 0.99602, 0.99611, 0.9962, 0.99629, 0.99638, 0.99646, 0.99655, 0.99663, 0.99671, 0.9968, 0.99688, 0.99696, 0.99704, 0.99712, 0.99719, 0.99727, 0.99735, 0.99742, 0.99749, 0.99757, 0.99764, 0.99771, 0.99778, 0.99785, 0.99792, 0.99798, 0.99805, 0.99812, 0.99818, 0.99824, 0.99831, 0.99837, 0.99843, 0.99849, 0.99855, 0.9986, 0.99866, 0.99871, 0.99877, 0.99882, 0.99887, 0.99892, 0.99897 ];
 	
 	var soc = ocv_data.indexOf( ocv );
 	soc = soc_data[soc];
 	
 	return soc;
 }
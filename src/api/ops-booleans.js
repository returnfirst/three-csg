// boolean operations

// FIXME should this be lazy ? in which case, how do we deal with 2D/3D combined
// TODO we should have an option to set behaviour as first parameter
/** union/ combine the given shapes
 * @param {Object(s)|Array} objects - objects to combine : can be given
 * - one by one: union(a,b,c) or
 * - as an array: union([a,b,c])
 * @returns {CSG} new CSG object, the union of all input shapes
 *
 * @example
 * let unionOfSpherAndCube = union(sphere(), cube())
 */
function union() {
    let options = {};
    const defaults = {
        extrude2d: false,
    };
    let o;
    let i = 0;
    let a = arguments;
    if (a[0].length) a = a[0];
    if ('extrude2d' in a[0]) {
        // first parameter is options
        options = Object.assign({}, defaults, a[0]);
        o = a[i++];
    }

    o = a[i++];

    // TODO: add option to be able to set this?
    for (; i < a.length; i++) {
        o = o.union(a[i]);
    }
    return o;
}

/** difference/ subtraction of the given shapes ie:
 * cut out C From B From A ie : a - b - c etc
 * @param {Object(s)|Array} objects - objects to subtract
 * can be given
 * - one by one: difference(a,b,c) or
 * - as an array: difference([a,b,c])
 * @returns {CSG} new CSG object, the difference of all input shapes
 *
 * @example
 * let differenceOfSpherAndCube = difference(sphere(), cube())
 */
function difference() {
    let object;
    let i = 0;
    let a = arguments;
    if (a[0].length) a = a[0];
    for (object = a[i++]; i < a.length; i++) {
        object = object.subtract(a[i]); // -- color the cuts
    }
    return object;
}

/** intersection of the given shapes: ie keep only the common parts between the given shapes
 * @param {Object(s)|Array} objects - objects to intersect
 * can be given
 * - one by one: intersection(a,b,c) or
 * - as an array: intersection([a,b,c])
 * @returns {CSG} new CSG object, the intersection of all input shapes
 *
 * @example
 * let intersectionOfSpherAndCube = intersection(sphere(), cube())
 */
function intersection() {
    let object;
    let i = 0;
    let a = arguments;
    if (a[0].length) a = a[0];
    for (object = a[i++]; i < a.length; i++) {
        object = object.intersect(a[i]); // -- color the cuts
    }
    return object;
}

export { union, difference, intersection };

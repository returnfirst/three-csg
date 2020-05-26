import { CAG } from 'core';
import { CONSTANTS } from 'utils';

// project the 3D CSG onto a plane
// This returns a 2D CAG with the 'shadow' shape of the 3D solid when projected onto the
// plane represented by the orthonormal basis
const csgProjectToOrthoNormalBasis = function (csg, orthobasis) {
    let cags = [];
    csg.polygons
        .filter(function (p) {
            // only return polys in plane, others may disturb result
            return p.plane.normal.minus(orthobasis.plane.normal).lengthSquared() < CONSTANTS.EPS * CONSTANTS.EPS;
        })
        .map(function (polygon) {
            let cag = polygon.projectToOrthoNormalBasis(orthobasis);
            if (cag.sides.length > 0) {
                cags.push(cag);
            }
        });
    let result = new CAG().union(cags);
    return result;
};

export default csgProjectToOrthoNormalBasis;

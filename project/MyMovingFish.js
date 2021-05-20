import {CGFobject} from '../lib/CGF.js';
import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';

export class MyMovingFish extends CGFobject
{
    constructor(scene, slices, stacks, speedFactor)
    {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.v = 0.0;
        this.speedFactor = speedFactor;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.ang = 0;
        this.animCtrl = 1;
        this.fishBody = new MyFish(scene, slices, stacks);
        //this.initBuffers();
    }
    /*
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0,0.5,0);
            this.vertices.push(ca, -0.5, -sa);
            this.vertices.push(caa, -0.5, -saa);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    */
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    update(){
        this.x += this.v*this.speedFactor*Math.sin(this.ang);
        this.z += this.v*this.speedFactor*Math.cos(this.ang);
    }

    turn(val){
        this.ang += val;
    }

    accelerate(val){
        this.v += val;
    }

    reset(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.v = 0;
        this.ang = 0;
    }

    setY(val){
        this.y = val;
    }
    
    //---not in the specification:---
    friction(){
        if(this.v == 0)
            return;

        this.v = (this.v > 0) ? (this.v - this.scene.fric) : (this.v + this.scene.fric);
    }
    //-------------------------------

    animation()
    {
        if(this.anglBack >= Math.PI/9) //20 degrees
            this.directionBack = -1;

        if(this.anglBack <= -Math.PI/9)
            this.directionBack = 1;

        if(this.anglSideR > Math.PI/12) //15 degrees
            this.directionSideR = (-1);
        
        else if(this.anglSideR <= -Math.PI/12)
            this.directionSideR = 1;
        
        if(this.anglSideL > Math.PI/12) //15 degrees
            this.directionSideL = -1;
        
        else if(this.anglSideL <= -Math.PI/12)
            this.directionSideL = 1;

        this.anglBack += this.directionBack*3*(Math.PI/180);
        this.anglSideR += this.directionSideR*2*(Math.PI/180);
        this.anglSideL += this.directionSideL*2*(Math.PI/180); //one side does the opposite of the other
    }

    display()
    {
        this.fishBody.display();
    }
}